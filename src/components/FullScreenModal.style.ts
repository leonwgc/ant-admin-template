/**
 * @file src/components/FullScreenModal.style.ts
 * @author leon.wang
 */

// antd doesn't have useCreateStyles, use plain CSS classNames instead
const useModalStyle = () => {
  return {
    styles: {
      body: 'fullscreen-modal-body',
      content: 'fullscreen-modal-content',
    },
  };
};

export default useModalStyle;
