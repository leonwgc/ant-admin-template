import React from 'react';
import './Footer.scss';
import { useLocalStorageState } from 'ahooks';
import { NAV_MENU_COLLAPSED_KEY } from './Sider';
import { CommonUseOutlined } from '@derbysoft/neat-design-icons';
import { AnimatePresence, motion } from 'motion/react';

const Footer = () => {
  const [value, _] = useLocalStorageState<boolean>(NAV_MENU_COLLAPSED_KEY, {
    listenStorageChange: true,
  });
  return (
    <div className="app-footer">
      <AnimatePresence>
        {value ? (
          <motion.div
            key="icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CommonUseOutlined
              style={{ fontSize: 20, color: 'rgb(0, 19, 28)' }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="licence"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <div>© 2002 - 2025 xxx Inc.</div>
            <div>All rights reserved. </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Footer;
