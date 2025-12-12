/**
 * @file src/components/ImageUpload/ImageUpload.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useCallback } from 'react';
import { message, Button, Progress, Space } from '@derbysoft/neat-design';
import {
  InboxOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import TaskExecutor from './TaskExecutor';
import { uploadImage } from './api';
import { useUpdateEffect } from 'ahooks';
import './ImageUpload.scss';

/**
 * Uploaded image info
 */
export interface UploadedImage {
  id?: string;
  url?: string;
  status?: 'uploading' | 'done' | 'error';
  percent?: number;
}

/**
 * ImageUpload component props
 */
export interface ImageUploadProps {
  /**
   * Maximum number of images
   */
  maxCount?: number;
  /**
   * Maximum file size in MB
   */
  maxSize?: number;
  /**
   * Accepted file types
   */
  accept?: string;
  /**
   * Current image list
   */
  value?: UploadedImage[];
  /**
   * On change callback
   */
  onChange?: (images: UploadedImage[]) => void;
  /**
   * Upload mode: 'dragger' | 'button'
   */
  mode?: 'dragger' | 'button';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom upload function
   */
  customUpload?: (file: File) => Promise<string>;
  /**
   * Callback when upload starts
   */
  onUploadStart?: () => void;
  /**
   * Callback when upload ends
   */
  onUploadEnd?: () => void;
  /**
   * Maximum number of concurrent uploads
   */
  concurrentLimit?: number;
}

/**
 * ImageUpload component - Support drag and drop upload
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  maxCount = 5,
  maxSize = 5,
  accept = '.jpg,.jpeg,.png',
  value = [],
  onChange,
  mode = 'dragger',
  disabled = false,
  customUpload,
  onUploadStart,
  onUploadEnd,
  concurrentLimit = 3,
}) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<UploadedImage[]>(() => {
    if (value.length > 0 && typeof value[0] === 'string') {
      return (value as string[]).map((url: string) => ({
        url,
        status: 'done' as const,
        percent: 100,
        id: url,
      }));
    }
    return (value as UploadedImage[]) || [];
  });

  useUpdateEffect(() => {
    onChange?.(images);
  }, [images]);

  const beforeUploadCheck = useCallback(
    (file: File) => {
      const isAccepted = accept
        .split(',')
        .some((type) => file.type.includes(type.replace('.', '')));
      if (!isAccepted) {
        message.error('Only JPG/PNG files are allowed');
        return false;
      }
      const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtMaxSize) {
        message.error('File size must be less than 5MB');
        return false;
      }

      return true;
    },
    [accept, maxSize]
  );
  const handleChange = useCallback(
    (files: FileList) => {
      if (!files || files.length === 0) return;

      if (images.length + files.length > maxCount) {
        message.error(`最多只能上传 ${maxCount} 张图片`);
        return;
      }

      const validFiles = Array.from(files).filter(beforeUploadCheck);
      if (validFiles.length === 0) return;

      onUploadStart?.();
      const taskExcutor = new TaskExecutor(concurrentLimit);
      let finished = 0;
      const __images = [...value];

      validFiles.map((file) => {
        // Add uploading placeholder with 0% progress
        const uploadingImage = {
          url: '',
          status: 'uploading' as const,
          percent: 0,
          id: `${Date.now()}-${Math.random()}`,
        };
        __images.push(uploadingImage);
        setImages?.([...__images]);

        taskExcutor.addTask(() => {
          // Simulate realistic progress with non-linear growth
          let currentProgress = 0;
          let progressStep = 0;

          const updateProgress = () => {
            const index = __images.findIndex(
              (img) => img.id === uploadingImage.id
            );
            if (index !== -1 && currentProgress < 90) {
              // Non-linear progress: fast at start, slower near the end
              if (currentProgress < 30) {
                progressStep = Math.random() * 8 + 5; // 5-13%
              } else if (currentProgress < 60) {
                progressStep = Math.random() * 5 + 3; // 3-8%
              } else if (currentProgress < 80) {
                progressStep = Math.random() * 3 + 1; // 1-4%
              } else {
                progressStep = Math.random() * 2 + 0.5; // 0.5-2.5%
              }

              currentProgress = Math.min(90, currentProgress + progressStep);
              __images[index] = {
                ...uploadingImage,
                percent: Math.floor(currentProgress),
              };
              setImages?.([...__images]);

              // Random delay for more realistic effect (80-200ms)
              const randomDelay = Math.random() * 120 + 80;
              setTimeout(updateProgress, randomDelay);
            }
          };

          // Start progress simulation
          updateProgress();

          const upload = customUpload ? customUpload(file) : uploadImage(file);

          return upload
            .then((imageUrl) => {
              const index = __images.findIndex(
                (img) => img.id === uploadingImage.id
              );
              if (index !== -1) {
                __images[index] = {
                  url: imageUrl,
                  status: 'done',
                  percent: 100,
                  id: imageUrl,
                };
                setImages?.([...__images]);
              }
            })
            .catch(() => {
              const index = __images.findIndex(
                (img) => img.id === uploadingImage.id
              );
              if (index !== -1) {
                __images[index] = {
                  url: '',
                  status: 'error',
                  percent: 0,
                  id: uploadingImage.id,
                };
                setImages?.([...__images]);
              }
            })
            .finally(() => {
              finished += 1;

              if (finished === validFiles.length) {
                onUploadEnd?.();
              }
            });
        });
      });
    },
    [
      images.length,
      maxCount,
      beforeUploadCheck,
      onUploadStart,
      concurrentLimit,
      value,
      onUploadEnd,
      customUpload,
    ]
  );

  /**
   * Handle drag over
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handle drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    handleChange(e.dataTransfer.files);
  };

  /**
   * Handle delete image
   */
  const handleDelete = (url: string) => {
    const newList = value.filter((img) => img.url !== url);
    onChange?.(newList);
    message.success('删除成功');
  };

  /**
   * Handle preview image
   */
  const handlePreview = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  /**
   * Trigger file input click
   */
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const canUpload = value.length < maxCount && !disabled;

  return (
    <div className="image-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e.target.files)}
        disabled={disabled}
      />

      {mode === 'dragger' && canUpload && (
        <div
          className="image-upload__dragger"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerUpload}
        >
          <p className="image-upload__dragger-icon">
            <InboxOutlined />
          </p>
          <p className="image-upload__dragger-text">
            点击或拖拽文件到此区域上传
          </p>
          <p className="image-upload__dragger-hint">
            支持上传 {accept} 格式的图片，单个文件不超过 {maxSize}MB，最多{' '}
            {maxCount} 张
          </p>
        </div>
      )}

      {mode === 'button' && canUpload && (
        <div className="image-upload__button-wrapper">
          <Button
            icon={<PlusOutlined />}
            onClick={triggerUpload}
            disabled={disabled}
          >
            上传图片
          </Button>
          <span className="image-upload__hint">
            （最多 {maxCount} 张，单张不超过 {maxSize}MB）
          </span>
        </div>
      )}

      {value.length > 0 && (
        <div className="image-upload__list">
          {value.map((image) => (
            <div key={image.id || image.url} className="image-upload__item">
              {image.status === 'uploading' && (
                <div className="image-upload__item-uploading">
                  <div className="image-upload__item-progress-wrapper">
                    <Progress
                      percent={image.percent || 0}
                      size="small"
                      status="active"
                    />
                    <span className="image-upload__item-progress-text">
                      上传中 {image.percent || 0}%
                    </span>
                  </div>
                </div>
              )}

              {image.status === 'done' && (
                <>
                  <div className="image-upload__item-thumbnail">
                    <img src={image.url} />
                    <div className="image-upload__item-actions">
                      <Space>
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => handlePreview(image.url)}
                          size="small"
                        />
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(image.url)}
                          size="small"
                        />
                      </Space>
                    </div>
                  </div>
                </>
              )}

              {image.status === 'error' && (
                <div className="image-upload__item-error">
                  <span className="image-upload__item-error-text">
                    上传失败
                  </span>
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(image.url)}
                    size="small"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {previewVisible && (
        <div
          className="image-upload__preview"
          onClick={() => setPreviewVisible(false)}
        >
          <div
            className="image-upload__preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={previewImage} alt="Preview" />
            <Button
              className="image-upload__preview-close"
              type="primary"
              onClick={() => setPreviewVisible(false)}
            >
              关闭
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
