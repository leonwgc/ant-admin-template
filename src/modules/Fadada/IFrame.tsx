import React, { IframeHTMLAttributes } from 'react';

export default ({ src, ...props }: IframeHTMLAttributes<HTMLIFrameElement>) => {
  return (
    src && (
      <iframe
        src={src}
        style={{ border: 'none', width: '100%', height: '100%' }}
        {...props}
      />
    )
  );
};
