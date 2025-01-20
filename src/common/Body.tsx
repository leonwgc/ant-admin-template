import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import hideHeaderRoutesCfg from './hideHeaderRoutesCfg';

const Body = ({
  children,
  bgColor = '#f5f5f5',
  className = '',
  style,
  ...otherProps
}) => {
  const { pathname } = useLocation();

  return (
    <section
      className={clsx(
        !hideHeaderRoutesCfg.includes(pathname)
          ? 'body-wrap'
          : 'body-wrap-no-header',
        className
      )}
      {...otherProps}
      style={{ ...style, backgroundColor: bgColor }}
    >
      {children}
    </section>
  );
};

export default Body;
