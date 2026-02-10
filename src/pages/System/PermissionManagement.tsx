/**
 * @file pages/System/PermissionManagement.tsx
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
  Tag,
  Popconfirm,
  Collapse,
} from '@derbysoft/neat-design';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@derbysoft/neat-design-icons';
import { useTranslation } from 'react-i18next';
import type { TableColumnsType } from '@derbysoft/neat-design';
import './PermissionManagement.scss';

interface PermissionType {
  id: string;
  code: string;
  name: string;
  type: 'page' | 'button' | 'api';
  module: string;
  description: string;
  createdAt: string;
}

interface PermissionGroup {
  module: string;
  moduleName: string;
  permissions: PermissionType[];
}

/**
 * Permission Management Page
 * Provides CRUD operations for system permissions
 */
const PermissionManagement: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Mock permission data grouped by module
  const [permissions, setPermissions] = useState<PermissionType[]>([
    {
      id: '1',
      code: 'user:view',
      name: '查看用户',
      type: 'page',
      module: 'user',
      description: '查看用户列表和详情',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      code: 'user:create',
      name: '创建用户',
      type: 'button',
      module: 'user',
      description: '创建新用户',
      createdAt: '2024-01-01',
    },
    {
      id: '3',
      code: 'user:update',
      name: '编辑用户',
      type: 'button',
      module: 'user',
      description: '编辑用户信息',
      createdAt: '2024-01-01',
    },
    {
      id: '4',
      code: 'user:delete',
      name: '删除用户',
      type: 'button',
      module: 'user',
      description: '删除用户',
      createdAt: '2024-01-01',
    },
    {
      id: '5',
      code: 'role:view',
      name: '查看角色',
      type: 'page',
      module: 'role',
      description: '查看角色列表',
      createdAt: '2024-01-02',
    },
    {
      id: '6',
      code: 'role:create',
      name: '创建角色',
      type: 'button',
      module: 'role',
      description: '创建新角色',
      createdAt: '2024-01-02',
    },
    {
      id: '7',
      code: 'menu:view',
      name: '查看菜单',
      type: 'page',
      module: 'menu',
      description: '查看菜单列表',
      createdAt: '2024-01-03',
    },
    {
      id: '8',
      code: 'api:user:list',
      name: '用户列表接口',
      type: 'api',
      module: 'user',
      description: 'GET /api/users',
      createdAt: '2024-01-04',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] =
    useState<PermissionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Group permissions by module
  const groupedPermissions: PermissionGroup[] = permissions
    .reduce((groups: PermissionGroup[], permission) => {
      const existingGroup = groups.find((g) => g.module === permission.module);
      if (existingGroup) {
        existingGroup.permissions.push(permission);
      } else {
        groups.push({
          module: permission.module,
          moduleName: getModuleName(permission.module),
          permissions: [permission],
        });
      }
      return groups;
    }, [])
    .filter((group) =>
      searchText
        ? group.permissions.some(
            (p) =>
              p.name.toLowerCase().includes(searchText.toLowerCase()) ||
              p.code.toLowerCase().includes(searchText.toLowerCase()),
          )
        : true,
    );

  function getModuleName(module: string): string {
    const moduleMap: Record<string, string> = {
      user: '用户管理',
      role: '角色管理',
      menu: '菜单管理',
      permission: '权限管理',
    };
    return moduleMap[module] || module;
  }

  // Table columns
  const columns: TableColumnsType<PermissionType> = [
    {
      title: t('pages.system:permissionColCode'),
      dataIndex: 'code',
      key: 'code',
      width: 200,
      render: (code: string) => <Tag>{code}</Tag>,
    },
    {
      title: t('pages.system:permissionColName'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: t('pages.system:permissionColType'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const typeMap = {
          page: {
            text: t('pages.system:permissionTypePage'),
            className: 'permission-type-page',
          },
          button: {
            text: t('pages.system:permissionTypeButton'),
            className: 'permission-type-button',
          },
          api: {
            text: t('pages.system:permissionTypeApi'),
            className: 'permission-type-api',
          },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag className={config.className}>{config.text}</Tag>;
      },
    },
    {
      title: t('pages.system:permissionColDescription'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('pages.system:permissionColCreatedAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: t('pages.system:permissionColActions'),
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('pages.system:permissionBtnEdit')}
          </Button>
          <Popconfirm
            title={t('pages.system:permissionMsgDeleteConfirm')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('common:yes')}
            cancelText={t('common:no')}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              {t('pages.system:permissionBtnDelete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle add permission
  const handleAdd = () => {
    setEditingPermission(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Handle edit permission
  const handleEdit = (permission: PermissionType) => {
    setEditingPermission(permission);
    form.setFieldsValue(permission);
    setIsModalOpen(true);
  };

  // Handle delete permission
  const handleDelete = (id: string) => {
    setPermissions(permissions.filter((p) => p.id !== id));
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingPermission) {
        // Update existing permission
        setPermissions(
          permissions.map((p) =>
            p.id === editingPermission.id ? { ...p, ...values } : p,
          ),
        );
      } else {
        // Add new permission
        const newPermission: PermissionType = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setPermissions([...permissions, newPermission]);
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
    <div className="permission-management">
      <div className="permission-management__header">
        <h2>{t('pages.system:permissionTitle')}</h2>
        <Space>
          <Input.Search
            placeholder={t('pages.system:permissionSearchPh')}
            style={{ width: 250 }}
            onSearch={setSearchText}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t('pages.system:permissionBtnAdd')}
          </Button>
        </Space>
      </div>

      <Collapse
        defaultActiveKey={groupedPermissions.map((g) => g.module)}
        items={groupedPermissions.map((group) => ({
          key: group.module,
          label: (
            <div className="permission-management__panel-header">
              <span className="permission-management__panel-title">
                {group.moduleName}
              </span>
              <Tag>{group.permissions.length} 个权限</Tag>
            </div>
          ),
          children: (
            <Table
              columns={columns}
              dataSource={group.permissions}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 'max-content' }}
            />
          ),
        }))}
      />

      {/* Add/Edit Permission Modal */}
      <Modal
        title={
          editingPermission
            ? t('pages.system:permissionModalTitleEdit')
            : t('pages.system:permissionModalTitleAdd')
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label={t('pages.system:permissionFormCode')}
            rules={[
              {
                required: true,
                message: t('pages.system:permissionFormCodeRequired'),
              },
              {
                pattern: /^[a-z:_]+$/,
                message: t('pages.system:permissionFormCodePattern'),
              },
            ]}
          >
            <Input
              placeholder={t('pages.system:permissionFormCodePh')}
              disabled={!!editingPermission}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label={t('pages.system:permissionFormName')}
            rules={[
              {
                required: true,
                message: t('pages.system:permissionFormNameRequired'),
              },
            ]}
          >
            <Input placeholder={t('pages.system:permissionFormNamePh')} />
          </Form.Item>

          <Form.Item
            name="module"
            label={t('pages.system:permissionFormModule')}
            rules={[
              {
                required: true,
                message: t('pages.system:permissionFormModuleRequired'),
              },
            ]}
          >
            <Select placeholder={t('pages.system:permissionFormModulePh')}>
              <Select.Option value="user">用户管理</Select.Option>
              <Select.Option value="role">角色管理</Select.Option>
              <Select.Option value="menu">菜单管理</Select.Option>
              <Select.Option value="permission">权限管理</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label={t('pages.system:permissionFormType')}
            rules={[{ required: true }]}
            initialValue="button"
          >
            <Select>
              <Select.Option value="page">
                {t('pages.system:permissionTypePage')}
              </Select.Option>
              <Select.Option value="button">
                {t('pages.system:permissionTypeButton')}
              </Select.Option>
              <Select.Option value="api">
                {t('pages.system:permissionTypeApi')}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={t('pages.system:permissionFormDescription')}
          >
            <Input.TextArea
              rows={3}
              placeholder={t('pages.system:permissionFormDescriptionPh')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
