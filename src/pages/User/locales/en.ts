/**
 * @file pages/User/locales/en.ts
 * @author leon.wang
 */

/**
 * User management pages translations (English)
 * Namespace: pages.user
 */
export default {
  users: {
    // Page title and headers
    pageTitle: 'Users',

    // Table columns
    columns: {
      name: 'Name',
      age: 'Age',
      address: 'Address',
    },

    // Form labels
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Please enter name',
      ageLabel: 'Age',
      agePlaceholder: 'Please enter age',
      addressLabel: 'Address',
      addressPlaceholder: 'Please enter address',
    },

    // Actions
    actions: {
      addUser: 'Add User',
      editUser: 'Edit User',
      submit: 'Submit',
      reset: 'Reset',
      search: 'Search',
      delete: 'Delete',
      cancel: 'Cancel',
    },

    // Messages
    messages: {
      deleteConfirm: 'Are you sure you want to delete this user?',
      deleteSuccess: 'User deleted successfully',
      addSuccess: 'User added successfully',
      updateSuccess: 'User updated successfully',
      loadError: 'Failed to load user data',
    },
  },

  addUser: {
    pageTitle: 'Add User',
    submitButton: 'Create User',
  },

  editUser: {
    pageTitle: 'Edit User',
    submitButton: 'Update User',
    loadError: 'Failed to load user information',
  },
};
