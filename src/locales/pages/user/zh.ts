/**
 * @file locales/pages/user/zh.ts
 * @author leon.wang
 */

/**
 * 用户管理页面翻译（中文）
 * 命名空间: pages.user
 */
export default {
  users: {
    // 页面标题和头部
    pageTitle: '用户列表',

    // 表格列
    columns: {
      name: '姓名',
      age: '年龄',
      address: '地址',
    },

    // 表单标签
    form: {
      nameLabel: '姓名',
      namePlaceholder: '请输入姓名',
      ageLabel: '年龄',
      agePlaceholder: '请输入年龄',
      addressLabel: '地址',
      addressPlaceholder: '请输入地址',
    },

    // 操作按钮
    actions: {
      addUser: '添加用户',
      editUser: '编辑用户',
      submit: '提交',
      reset: '重置',
      search: '搜索',
      delete: '删除',
      cancel: '取消',
    },

    // 提示信息
    messages: {
      deleteConfirm: '确定要删除该用户吗？',
      deleteSuccess: '用户删除成功',
      addSuccess: '用户添加成功',
      updateSuccess: '用户更新成功',
      loadError: '加载用户数据失败',
    },
  },

  addUser: {
    pageTitle: '添加用户',
    submitButton: '创建用户',
  },

  editUser: {
    pageTitle: '编辑用户',
    submitButton: '更新用户',
    loadError: '加载用户信息失败',
  },
};
