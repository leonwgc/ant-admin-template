/**
 * @file pages/System/MenuManagement.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Tag,
  Popconfirm,
} from '@derbysoft/neat-design';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@derbysoft/neat-design-icons';
import { useTranslation } from 'react-i18next';
import type { TableColumnsType } from '@derbysoft/neat-design';
import './MenuManagement.scss';

interface MenuType {
  id: string;
  parentId: string | null;
  name: string;
  path: string;
  icon?: string;
  sort: number;
  type: 'menu' | 'page' | 'button';
  visible: boolean;
  permission?: string;
  children?: MenuType[];
}

/**
 * Menu Management Page
 * Provides tree-structured menu configuration
 */
const MenuManagement: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Mock menu data with tree structure
  const [menus, setMenus] = useState<MenuType[]>([
    {
      id: '1',
      parentId: null,
      name: '系统管理',
      path: '/system',
      icon: 'SettingOutlined',
      sort: 1,
      type: 'menu',
      visible: true,
      children: [
        {
          id: '1-1',
          parentId: '1',
          name: '用户管理',
          path: '/system/users',
          sort: 1,
          type: 'page',
          visible: true,
          permission: 'user:view',
        },
        {
          id: '1-2',
          parentId: '1',
          name: '角色管理',
          path: '/system/roles',
          sort: 2,
          type: 'page',
          visible: true,
          permission: 'role:view',
        },
        {
          id: '1-3',
          parentId: '1',
          name: '菜单管理',
          path: '/system/menus',
          sort: 3,
          type: 'page',
          visible: true,
          permission: 'menu:view',
        },
      ],
    },
    {
      id: '2',
      parentId: null,
      name: '组件示例',
      path: '/components',
      icon: 'AppstoreOutlined',
      sort: 2,
      type: 'menu',
      visible: true,
      children: [
        {
          id: '2-1',
          parentId: '2',
          name: '表单组件',
          path: '/components/form',
          sort: 1,
          type: 'page',
          visible: true,
        },
        {
          id: '2-2',
          parentId: '2',
          name: '表格组件',
          path: '/components/table',
          sort: 2,
          type: 'page',
          visible: true,
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuType | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['1', '2']);

  // Icon options
  const iconOptions = [
    'UserOutlined',
    'SettingOutlined',
    'AppstoreOutlined',
    'MenuOutlined',
    'FormOutlined',
    'TableOutlined',
    'FileOutlined',
    'DashboardOutlined',
  ];

  // Table columns
  const columns: TableColumnsType<MenuType> = [
    {
      title: t('pages.system:menuColName'),
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: t('pages.system:menuColPath'),
      dataIndex: 'path',
      key: 'path',
      width: 200,
    },
    {
      title: t('pages.system:menuColIcon'),
      dataIndex: 'icon',
      key: 'icon',
      width: 120,
      render: (icon: string) => icon && <Tag>{icon}</Tag>,
    },
    {
      title: t('pages.system:menuColType'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const typeMap = {
          menu: {
            text: t('pages.system:menuTypeMenu'),
            className: 'menu-type-menu',
          },
          page: {
            text: t('pages.system:menuTypePage'),
            className: 'menu-type-page',
          },
          button: {
            text: t('pages.system:menuTypeButton'),
            className: 'menu-type-button',
          },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag className={config.className}>{config.text}</Tag>;
      },
    },
    {
      title: t('pages.system:menuColSort'),
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
    },
    {
      title: t('pages.system:menuColVisible'),
      dataIndex: 'visible',
      key: 'visible',
      width: 100,
      render: (visible: boolean) => (
        <Tag className={visible ? 'menu-visible-yes' : 'menu-visible-no'}>
          {visible
            ? t('pages.system:menuVisibleYes')
            : t('pages.system:menuVisibleNo')}
        </Tag>
      ),
    },
    {
      title: t('pages.system:menuColPermission'),
      dataIndex: 'permission',
      key: 'permission',
      width: 150,
      render: (permission: string) => permission && <Tag>{permission}</Tag>,
    },
    {
      title: t('pages.system:menuColActions'),
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => handleAddChild(record)}
          >
            {t('pages.system:menuBtnAddChild')}
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('pages.system:menuBtnEdit')}
          </Button>
          <Popconfirm
            title={t('pages.system:menuMsgDeleteConfirm')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('common:yes')}
            cancelText={t('common:no')}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              {t('pages.system:menuBtnDelete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Flatten tree data for table
  const flattenMenus = (menus: MenuType[]): MenuType[] => {
    return menus;
  };

  // Handle add root menu
  const handleAdd = () => {
    setEditingMenu(null);
    form.resetFields();
    form.setFieldsValue({ type: 'menu', sort: 1, visible: true });
    setIsModalOpen(true);
  };

  // Handle add child menu
  const handleAddChild = (parent: MenuType) => {
    setEditingMenu(null);
    form.resetFields();
    form.setFieldsValue({
      parentId: parent.id,
      type: 'page',
      sort: (parent.children?.length || 0) + 1,
      visible: true,
    });
    setIsModalOpen(true);
  };

  // Handle edit menu
  const handleEdit = (menu: MenuType) => {
    setEditingMenu(menu);
    form.setFieldsValue(menu);
    setIsModalOpen(true);
  };

  // Handle delete menu
  const handleDelete = (id: string) => {
    const deleteFromTree = (menus: MenuType[]): MenuType[] => {
      return menus
        .filter((menu) => menu.id !== id)
        .map((menu) => ({
          ...menu,
          children: menu.children ? deleteFromTree(menu.children) : undefined,
        }));
    };
    setMenus(deleteFromTree(menus));
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingMenu) {
        // Update existing menu
        const updateTree = (menus: MenuType[]): MenuType[] => {
          return menus.map((menu) => {
            if (menu.id === editingMenu.id) {
              return { ...menu, ...values };
            }
            if (menu.children) {
              return { ...menu, children: updateTree(menu.children) };
            }
            return menu;
          });
        };
        setMenus(updateTree(menus));
      } else {
        // Add new menu
        const newMenu: MenuType = {
          id: Date.now().toString(),
          ...values,
        };

        if (values.parentId) {
          // Add as child
          const addToTree = (menus: MenuType[]): MenuType[] => {
            return menus.map((menu) => {
              if (menu.id === values.parentId) {
                return {
                  ...menu,
                  children: [...(menu.children || []), newMenu],
                };
              }
              if (menu.children) {
                return { ...menu, children: addToTree(menu.children) };
              }
              return menu;
            });
          };
          setMenus(addToTree(menus));
        } else {
          // Add as root
          setMenus([...menus, newMenu]);
        }
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-management">
      <div className="menu-management__header">
        <h2>{t('pages.system:menuTitle')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t('pages.system:menuBtnAdd')}
        </Button>
      </div>

      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={flattenMenus(menus)}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as string[]),
        }}
      />

      {/* Add/Edit Menu Modal */}
      <Modal
        title={
          editingMenu
            ? t('pages.system:menuModalTitleEdit')
            : t('pages.system:menuModalTitleAdd')
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="parentId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label={t('pages.system:menuFormName')}
            rules={[
              {
                required: true,
                message: t('pages.system:menuFormNameRequired'),
              },
            ]}
          >
            <Input placeholder={t('pages.system:menuFormNamePh')} />
          </Form.Item>

          <Form.Item
            name="path"
            label={t('pages.system:menuFormPath')}
            rules={[
              {
                required: true,
                message: t('pages.system:menuFormPathRequired'),
              },
            ]}
          >
            <Input placeholder={t('pages.system:menuFormPathPh')} />
          </Form.Item>

          <Form.Item name="icon" label={t('pages.system:menuFormIcon')}>
            <Select placeholder={t('pages.system:menuFormIconPh')} allowClear>
              {iconOptions.map((icon) => (
                <Select.Option key={icon} value={icon}>
                  {icon}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label={t('pages.system:menuFormType')}
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="menu">
                {t('pages.system:menuTypeMenu')}
              </Select.Option>
              <Select.Option value="page">
                {t('pages.system:menuTypePage')}
              </Select.Option>
              <Select.Option value="button">
                {t('pages.system:menuTypeButton')}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="sort"
            label={t('pages.system:menuFormSort')}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="visible"
            label={t('pages.system:menuFormVisible')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="permission"
            label={t('pages.system:menuFormPermission')}
          >
            <Input placeholder={t('pages.system:menuFormPermissionPh')} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuManagement;
