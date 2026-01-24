/**
 * @file layouts/Header.tsx
 * @author leon.wang
 */
import React from 'react';
import { Layout, Space, Flex, Dropdown } from '@derbysoft/neat-design';
import { MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { useTranslation } from 'react-i18next';
import MobileMenus from './MobileMenus';
import { AIRelatedFilled } from '@derbysoft/neat-design-icons';
import { changeLanguage, type Language } from '~/i18n';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const [open, { setTrue, setFalse }] = useBoolean(false);
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language as Language;

  const handleLanguageChange = async (lang: Language) => {
    await changeLanguage(lang);
    // No need to reload - components will re-render automatically
  };

  const languageMenuItems = [
    {
      key: 'zh',
      label: '简体中文',
      onClick: () => handleLanguageChange('zh'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
    },
  ];

  return (
    <>
      <Layout.Header {...props}>
        <Flex
          align="center"
          gap={8}
          style={{ fontSize: 32, fontWeight: 'bold' }}
        >
          <AIRelatedFilled />
        </Flex>

        <Space size={16}>
          <Dropdown
            menu={{ items: languageMenuItems, selectedKeys: [currentLang] }}
            placement="bottomRight"
          >
            <GlobalOutlined
              style={{ fontSize: 18, cursor: 'pointer' }}
              title={t('switchLanguage')}
            />
          </Dropdown>
          <MenuOutlined className="mobile-menus" onClick={setTrue} />
          {/* <Avatar>LW</Avatar> */}
        </Space>
      </Layout.Header>
      <MobileMenus open={open} onClose={setFalse} />
    </>
  );
};

export default Header;
