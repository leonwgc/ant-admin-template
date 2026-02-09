/**
 * @file pages/System/RoleManagement.tsx
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
  Tree,
  Tag,
  Popconfirm,
} from '@derbysoft/neat-design';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { TableColumnsType } from '@derbysoft/neat-design';
import './RoleManagement.scss';

interface RoleType {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  userCount: number;
  createdAt: string;
  permissions: string[];
}

interface PermissionNode {
  key: string;
  title: string;
  children?: PermissionNode[];
}

/**
 * Role Management Page
 * Provides CRUD operations for system roles
 */
const RoleManagement: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Mock data
  const [roles, setRoles] = useState<RoleType[]>([
    {
      id: '1',
      name: '超级管理员',
      code: 'super_admin',
      description: '拥有系统所有权限',
      status: 'active',
      userCount: 2,
      createdAt: '2024-01-01',
      permissions: ['user:view', 'user:create', 'user:update', 'user:delete', 'role:view'],
    },
    {
      id: '2',
      name: '管理员',
      code: 'admin',
      description: '拥有系统大部分权限',
      status: 'active',
      userCount: 5,
      createdAt: '2024-01-02',
      permissions: ['user:view', 'user:create', 'user:update', 'role:view'],
    },
    {
      id: '3',
      name: '普通用户',
      code: 'user',
      description: '基础权限',
      status: 'active',
      userCount: 100,
      createdAt: '2024-01-03',
      permissions: ['user:view'],
    },
  ]);

  // Permission tree data
  const permissionTree: PermissionNode[] = [
    {
      key: 'user',
      title: '用户管理',
      children: [
        { key: 'user:view', title: '查看用户' },
        { key: 'user:create', title: '创建用户' },
        { key: 'user:update', title: '编辑用户' },
        { key: 'user:delete', title: '删除用户' },
      ],
    },
    {
      key: 'role',
      title: '角色管理',
      children: [
        { key: 'role:view', title: '查看角色' },
        { key: 'role:create', title: '创建角色' },
        { key: 'role:update', title: '编辑角色' },
        { key: 'role:delete', title: '删除角色' },
      ],
    },
    {
      key: 'menu',
      title: '菜单管理',
      children: [
        { key: 'menu:view', title: '查看菜单' },
        { key: 'menu:create', title: '创建菜单' },
        { key: 'menu:update', title: '编辑菜单' },
        { key: 'menu:delete', title: '删除菜单' },
      ],
    },
    {
      key: 'permission',
      title: '权限管理',
      children: [
        { key: 'permission:view', title: '查看权限' },
        { key: 'permission:create', title: '创建权限' },
        { key: 'permission:update', title: '编辑权限' },
        { key: 'permission:delete', title: '删除权限' },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleType | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Table columns
  const columns: TableColumnsType<RoleType> = [
    {
      title: t('pages.system:roleColName'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: t('pages.system:roleColCode'),
      dataIndex: 'code',
      key: 'code',
      width: 150,
      render: (code: string) => <Tag>{code}</Tag>,
    },
    {
      title: t('pages.system:roleColDescription'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('pages.system:roleColStatus'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag className={`role-status-${status}`}>
          {status === 'active' ? t('pages.system:roleStatusActive') : t('pages.system:roleStatusInactive')}
        </Tag>
      ),
    },
    {
      title: t('pages.system:roleColUserCount'),
      dataIndex: 'userCount',
      key: 'userCount',
      width: 100,
    },
    {
      title: t('pages.system:roleColCreatedAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: t('pages.system:roleColActions'),
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<SafetyCertificateOutlined />}
            onClick={() => handlePermission(record)}
          >
            {t('pages.system:roleBtnPermission')}
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('pages.system:roleBtnEdit')}
          </Button>
          <Popconfirm
            title={t('pages.system:roleMsgDeleteConfirm')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('common:yes')}
            cancelText={t('common:no')}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              {t('pages.system:roleBtnDelete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle add role
  const handleAdd = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Handle edit role
  const handleEdit = (role: RoleType) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  // Handle delete role
  const handleDelete = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Handle permission assignment
  const handlePermission = (role: RoleType) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions);
    setIsPermissionModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingRole) {
        // Update existing role
        setRoles(
          roles.map((role) =>
            role.id === editingRole.id ? { ...role, ...values } : role
          )
        );
      } else {
        // Add new role
        const newRole: RoleType = {
          id: Date.now().toString(),
          ...values,
          userCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
          permissions: [],
        };
        setRoles([...roles, newRole]);
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle permission submit
  const handlePermissionSubmit = () => {
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id
            ? { ...role, permissions: selectedPermissions }
            : role
        )
      );
      setIsPermissionModalOpen(false);
    }
  };

  return (
    <div className="role-management">
      <div className="role-management__header">
        <h2>{t('pages.system:roleTitle')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t('pages.system:roleBtnAdd')}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      {/* Add/Edit Role Modal */}
      <Modal
        title={editingRole ? t('pages.system:roleModalTitleEdit') : t('pages.system:roleModalTitleAdd')}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t('pages.system:roleFormName')}
            rules={[{ required: true, message: t('pages.system:roleFormNameRequired') }]}
          >
            <Input placeholder={t('pages.system:roleFormNamePh')} />
          </Form.Item>

          <Form.Item
            name="code"
            label={t('pages.system:roleFormCode')}
            rules={[
              { required: true, message: t('pages.system:roleFormCodeRequired') },
              { pattern: /^[a-z_]+$/, message: t('pages.system:roleFormCodePattern') },
            ]}
          >
            <Input placeholder={t('pages.system:roleFormCodePh')} disabled={!!editingRole} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('pages.system:roleFormDescription')}
          >
            <Input.TextArea
              rows={3}
              placeholder={t('pages.system:roleFormDescriptionPh')}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label={t('pages.system:roleFormStatus')}
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">{t('pages.system:roleStatusActive')}</Select.Option>
              <Select.Option value="inactive">{t('pages.system:roleStatusInactive')}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Permission Assignment Modal */}
      <Modal
        title={t('pages.system:rolePermissionTitle')}
        open={isPermissionModalOpen}
        onOk={handlePermissionSubmit}
        onCancel={() => setIsPermissionModalOpen(false)}
        width={600}
      >
        <div className="role-management__permission">
          <p>为角色 "{editingRole?.name}" 分配权限：</p>
          <Tree
            checkable
            defaultExpandAll
            treeData={permissionTree}
            checkedKeys={selectedPermissions}
            onCheck={(checkedKeys) => {
              setSelectedPermissions(checkedKeys as string[]);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;
