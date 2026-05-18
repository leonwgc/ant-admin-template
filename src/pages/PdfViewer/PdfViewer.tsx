/**
 * @file pages/PdfViewer/PdfViewer.tsx
 * @author leon.wang
 */
import React, { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Space, Upload, Spin, message } from '@derbysoft/neat-design';
import { UploadOutlined } from '@derbysoft/neat-design-icons';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PdfViewer.scss';

// 配置 PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * PDF 文件预览组件
 */
const PdfViewer: FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    if (file) {
      setPageRendering(true);
    }
  }, [file, pageNumber, scale]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber((prev) => Math.min(Math.max(prev, 1), numPages));
  };

  const onDocumentLoadError = () => {
    setPageRendering(false);
    message.error(t('pages.pdf:loadError'));
  };

  const onPageLoadSuccess = (page: { getViewport: (options: { scale: number }) => { height: number } }) => {
    const viewport = page.getViewport({ scale });
    setPageHeight(viewport.height);
  };

  const onPageRenderSuccess = () => {
    setPageRendering(false);
  };

  const onPageRenderError = () => {
    setPageRendering(false);
  };

  const handleFileChange = (info: { file: { originFileObj?: File; type?: string } }) => {
    const fileObj = info.file.originFileObj || (info.file as unknown as File);

    if (fileObj && fileObj instanceof File && fileObj.type === 'application/pdf') {
      setLoading(true);
      setPageNumber(1);
      setNumPages(0);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target?.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(fileObj);
    } else {
      message.error(t('pages.pdf:invalidFileType'));
    }
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer__header">
        <Space>
          <Upload
            accept="application/pdf"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>
              {t('pages.pdf:uploadPdf')}
            </Button>
          </Upload>

          {file && !loading && (
            <>
              <Button
                icon={<LeftOutlined />}
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                {t('pages.pdf:prevPage')}
              </Button>

              <span className="pdf-viewer__page-info">
                {`${t('pages.pdf:pageInfo')}`.replace('{{current}}', String(pageNumber)).replace('{{total}}', String(numPages))}
              </span>

              <Button
                icon={<RightOutlined />}
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                {t('pages.pdf:nextPage')}
              </Button>

              <Button icon={<ZoomOutOutlined />} onClick={zoomOut}>
                {t('pages.pdf:zoomOut')}
              </Button>

              <span className="pdf-viewer__scale">
                {Math.round(scale * 100)}%
              </span>

              <Button icon={<ZoomInOutlined />} onClick={zoomIn}>
                {t('pages.pdf:zoomIn')}
              </Button>

              <Button onClick={resetZoom}>
                {t('pages.pdf:resetZoom')}
              </Button>
            </>
          )}
        </Space>
      </div>

      <div className="pdf-viewer__content">
        {loading && (
          <div className="pdf-viewer__loading">
            <Spin size="large" tip={t('pages.pdf:loading')} />
          </div>
        )}

        {!file && !loading && (
          <div className="pdf-viewer__empty">
            <div className="pdf-viewer__empty-icon">📄</div>
            <div className="pdf-viewer__empty-text">
              {t('pages.pdf:emptyText')}
            </div>
          </div>
        )}

        {file && (
          <div className="pdf-viewer__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <div
                className={`pdf-viewer__page-shell ${pageRendering ? 'pdf-viewer__page-shell--loading' : ''}`}
                style={{ minHeight: pageHeight || 420 }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={null}
                  onLoadSuccess={onPageLoadSuccess}
                  onRenderSuccess={onPageRenderSuccess}
                  onRenderError={onPageRenderError}
                />

                {pageRendering && (
                  <div className="pdf-viewer__page-loading">
                    <Spin size="large" />
                  </div>
                )}
              </div>
            </Document>

            {numPages > 1 && (
              <div className="pdf-viewer__pager">
                <button
                  type="button"
                  className="pdf-viewer__pager-btn"
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  aria-label={t('pages.pdf:prevPage')}
                >
                  <LeftOutlined />
                </button>

                <span className="pdf-viewer__pager-text">
                  {`${pageNumber} / ${numPages}`}
                </span>

                <button
                  type="button"
                  className="pdf-viewer__pager-btn"
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  aria-label={t('pages.pdf:nextPage')}
                >
                  <RightOutlined />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
