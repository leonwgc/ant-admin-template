/**
 * @file src/utils/README.md
 * @author leon.wang(leon.wang@derbysoft.net)
 */

# Route Generation System

## Overview

This project uses an automatic route generation system that creates routes from menu configuration, eliminating the need to maintain routes in multiple places.

## How It Works

### 1. Define Menu Configuration (`config.menu.tsx`)

Add your menu items with routes:

```tsx
export const menus: MenuItem[] = [
  {
    key: 'user',
    label: 'Users',
    icon: <UserOutlined />,
    permissions: [],
    children: [
      {
        key: 'user-list',
        label: 'User List',
        route: '/app/users',
        permissions: [],
      },
      {
        key: 'user-add',
        label: 'Add User',
        route: '/app/users/add',
        permissions: [],
        hidden: true, // Won't show in menu, but route still exists
      },
    ],
  },
];
```

### 2. Register Component Mapping (`utils/routeGenerator.tsx`)

Map route paths to their components:

```tsx
export const routeComponentMap: RouteComponentMap = {
  '/app/users': lazyLoad('pages/User/Users'),
  '/app/users/add': lazyLoad('pages/User/AddUser'),
};
```

### 3. Routes Auto-Generate

Routes are automatically created in `RouteConfig.tsx` based on menu configuration.

## Key Features

### Hidden Routes

Use `hidden: true` for routes that shouldn't appear in menus but still need to exist:

```tsx
{
  key: 'user-edit',
  label: 'Edit User',
  route: '/app/users/edit',
  hidden: true, // Route exists but not in menu
}
```

### Permission Control

Routes inherit permissions from menu configuration:

```tsx
{
  key: 'admin-panel',
  route: '/app/admin',
  permissions: ['admin', 'superuser'], // Only users with these permissions can access
}
```

### Type Safety

All routes are fully typed with TypeScript:
- Route paths are validated
- Component imports are type-checked
- Permissions are strongly typed

## Adding a New Route

### Step 1: Add to Menu Configuration

```tsx
// src/config.menu.tsx
{
  key: 'new-feature',
  label: 'New Feature',
  route: '/app/new-feature',
  permissions: [],
}
```

### Step 2: Register Component

```tsx
// src/utils/routeGenerator.tsx
export const routeComponentMap: RouteComponentMap = {
  // ... existing mappings
  '/app/new-feature': lazyLoad('pages/NewFeature/NewFeature'),
};
```

### Step 3: Create Component

```tsx
// src/pages/NewFeature/NewFeature.tsx
const NewFeature = () => {
  return <div>New Feature Page</div>;
};

export default NewFeature;
```

**That's it!** The route is automatically generated and ready to use.

## Benefits

✅ **Single Source of Truth**: Menu configuration drives both navigation and routes
✅ **No Duplication**: Routes are defined once, not in multiple places
✅ **Type Safety**: Full TypeScript support catches errors at compile time
✅ **Easy Maintenance**: Adding new routes is a simple 3-step process
✅ **Permission Integration**: Routes automatically respect menu permissions
✅ **Hidden Routes**: Support for routes that exist but aren't in menus

## Migration Guide

### Before (Manual Routes)

```tsx
// RouteConfig.tsx - Had to maintain manually
<Route path="users" element={<Users />} />
<Route path="users/add" element={<AddUser />} />
<Route path="users/edit" element={<EditUser />} />

// config.menu.tsx - Duplicated route information
{ key: 'users', route: '/app/users' }
```

### After (Auto-Generated)

```tsx
// config.menu.tsx - Single source of truth
{ key: 'users', route: '/app/users' }
{ key: 'users-add', route: '/app/users/add', hidden: true }

// routeGenerator.tsx - Component mapping
'/app/users': lazyLoad('pages/User/Users')
'/app/users/add': lazyLoad('pages/User/AddUser')

// RouteConfig.tsx - Auto-generated, no manual editing needed!
```

## Troubleshooting

### Route Not Working?

1. Check menu configuration has correct `route` property
2. Verify component is registered in `routeComponentMap`
3. Ensure component file path is correct
4. Check browser console for warnings

### Component Not Loading?

1. Verify import path in `lazyLoad()` is correct
2. Check component has default export
3. Ensure component file exists at specified path

### Route Showing But Component Missing?

Check the `routeComponentMap` - every route in menu config must have a corresponding component mapping.

## Future Enhancements

- [ ] Auto-generate component mappings from file system
- [ ] Dynamic route validation at build time
- [ ] Visual route debugging tool
- [ ] Automatic route documentation generation

## how to add route

// 1️⃣ 在 config.menu.tsx 添加菜单
{ key: 'new-page', route: '/app/new-page' }

// 2️⃣ 在 routeGenerator.tsx 映射组件
'/app/new-page': lazyLoad('pages/NewPage/NewPage')

// 3️⃣ 创建页面组件
// src/pages/NewPage/NewPage.tsx
