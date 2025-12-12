/**
 * @file src/pages/Components/ImageUploadExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Space, Button, Divider, message, Tag } from '@derbysoft/neat-design';
import ImageUpload, { UploadedImage } from '~/components/ImageUpload';
import './ImageUploadExample.scss';

/**
 * ImageUploadExample component
 */
const ImageUploadExample: React.FC = () => {
  const [draggerImages, setDraggerImages] = useState<UploadedImage[]>([]);
  const [buttonImages, setButtonImages] = useState<UploadedImage[]>([]);
  const [customImages, setCustomImages] = useState<UploadedImage[]>([]);

  /**
   * Custom upload function (simulate API call)
   */
  const customUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simulate API upload with delay
      setTimeout(() => {
        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.onerror = () => {
          reject(new Error('Upload failed'));
        };
        reader.readAsDataURL(file);
      }, 2000);
    });
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    message.success(`提交成功！共 ${draggerImages.length} 张图片`);
    console.log('Uploaded images:', draggerImages);
  };

  /**
   * Handle clear
   */
  const handleClear = () => {
    setDraggerImages([]);
    message.info('已清空');
  };

  return (
    <div className="image-upload-example">
      <h2 className="image-upload-example__title">ImageUpload - 图片上传组件示例</h2>

      <div className="image-upload-example__section">
        <Card title="基础用法 - 拖拽上传">
          <p className="image-upload-example__desc">
            支持点击上传和拖拽上传，自动校验文件类型和大小，支持多张图片上传
          </p>
          <ImageUpload
            value={draggerImages}
            onChange={setDraggerImages}
            maxCount={5}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
          />
          <Space style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSubmit} disabled={draggerImages.length === 0}>
              提交 ({draggerImages.length})
            </Button>
            <Button onClick={handleClear} disabled={draggerImages.length === 0}>
              清空
            </Button>
          </Space>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="按钮模式">
          <p className="image-upload-example__desc">使用按钮触发上传，适合表单场景</p>
          <ImageUpload
            mode="button"
            value={buttonImages}
            onChange={setButtonImages}
            maxCount={3}
            maxSize={2}
            accept=".jpg,.jpeg,.png"
          />
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="自定义上传">
          <p className="image-upload-example__desc">
            自定义上传逻辑，可以对接真实的后端接口
          </p>
          <ImageUpload
            value={customImages}
            onChange={setCustomImages}
            maxCount={3}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
            customUpload={customUpload}
          />
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="组件 API">
          <h3>Props</h3>
          <table className="image-upload-example__table">
            <thead>
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>maxCount</td>
                <td>最大上传数量</td>
                <td>number</td>
                <td>5</td>
              </tr>
              <tr>
                <td>maxSize</td>
                <td>单个文件最大大小（MB）</td>
                <td>number</td>
                <td>5</td>
              </tr>
              <tr>
                <td>accept</td>
                <td>接受的文件类型</td>
                <td>string</td>
                <td>'.jpg,.jpeg,.png'</td>
              </tr>
              <tr>
                <td>value</td>
                <td>已上传的图片列表</td>
                <td>UploadedImage[]</td>
                <td>[]</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>图片列表变化时的回调</td>
                <td>(images: UploadedImage[]) =&gt; void</td>
                <td>-</td>
              </tr>
              <tr>
                <td>mode</td>
                <td>上传模式</td>
                <td>'dragger' | 'button'</td>
                <td>'dragger'</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>是否禁用</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>customUpload</td>
                <td>自定义上传函数</td>
                <td>(file: File) =&gt; Promise&lt;string&gt;</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <Divider />

          <h3>UploadedImage 类型</h3>
          <table className="image-upload-example__table">
            <thead>
              <tr>
                <th>字段</th>
                <th>说明</th>
                <th>类型</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>uid</td>
                <td>唯一标识</td>
                <td>string</td>
              </tr>
              <tr>
                <td>name</td>
                <td>文件名</td>
                <td>string</td>
              </tr>
              <tr>
                <td>url</td>
                <td>图片地址</td>
                <td>string</td>
              </tr>
              <tr>
                <td>size</td>
                <td>文件大小（字节）</td>
                <td>number</td>
              </tr>
              <tr>
                <td>status</td>
                <td>上传状态</td>
                <td>'uploading' | 'done' | 'error'</td>
              </tr>
              <tr>
                <td>percent</td>
                <td>上传进度</td>
                <td>number</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="功能特性">
          <ul className="image-upload-example__features">
            <li>
              <Tag color="blue">拖拽上传</Tag>
              支持拖拽文件到指定区域上传
            </li>
            <li>
              <Tag color="green">点击上传</Tag>
              点击区域或按钮选择文件上传
            </li>
            <li>
              <Tag color="orange">文件校验</Tag>
              自动校验文件类型、大小和数量
            </li>
            <li>
              <Tag color="purple">进度显示</Tag>
              实时显示上传进度
            </li>
            <li>
              <Tag color="cyan">图片预览</Tag>
              点击查看大图，支持关闭
            </li>
            <li>
              <Tag color="red">删除功能</Tag>
              支持删除已上传的图片
            </li>
            <li>
              <Tag color="geekblue">自定义上传</Tag>
              支持自定义上传逻辑，对接真实 API
            </li>
            <li>
              <Tag color="magenta">响应式设计</Tag>
              适配移动端和桌面端
            </li>
          </ul>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="使用示例">
          <div className="image-upload-example__code">
            {`import ImageUpload, { UploadedImage } from '~/components/ImageUpload';

const MyComponent = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  return (
    <ImageUpload
      value={images}
      onChange={setImages}
      maxCount={5}
      maxSize={5}
      accept=".jpg,.jpeg,.png"
    />
  );
};

// 自定义上传
const customUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.url;
};

<ImageUpload
  value={images}
  onChange={setImages}
  customUpload={customUpload}
/>`}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageUploadExample;
