/**
 * @file src/utils/routeGenerator.example.md
 * @author leon.wang(leon.wang@derbysoft.net)
 */

# Route Generator - Quick Start Example

## Adding a New Page in 3 Simple Steps

Let's add a "Products" page to demonstrate how easy it is.

### Step 1: Update Menu Configuration

Open `src/config.menu.tsx` and add:

```tsx
export const menus: MenuItem[] = [
  // ... existing menus
  {
    key: 'products',
    label: 'Products',
    icon: <ShoppingOutlined />,
    permissions: [],
    children: [
      {
        key: 'product-list',
        label: 'Product List',
        route: '/app/products',
        permissions: [],
      },
      {
        key: 'product-add',
        label: 'Add Product',
        route: '/app/products/add',
        permissions: [],
        hidden: true, // This won't show in menu
      },
      {
        key: 'product-edit',
        label: 'Edit Product',
        route: '/app/products/edit',
        permissions: [],
        hidden: true, // This won't show in menu
      },
    ],
  },
];
```

### Step 2: Register Components

Open `src/utils/routeGenerator.tsx` and add:

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ... existing mappings

  // Product Management
  '/app/products': lazyLoad('pages/Product/ProductList'),
  '/app/products/add': lazyLoad('pages/Product/AddProduct'),
  '/app/products/edit': lazyLoad('pages/Product/EditProduct'),
};
```

### Step 3: Create Components

Create your page components:

```tsx
// src/pages/Product/ProductList.tsx
import React from 'react';

const ProductList: React.FC = () => {
  return (
    <div>
      <h1>Product List</h1>
      {/* Your product list implementation */}
    </div>
  );
};

export default ProductList;
```

```tsx
// src/pages/Product/AddProduct.tsx
import React from 'react';

const AddProduct: React.FC = () => {
  return (
    <div>
      <h1>Add Product</h1>
      {/* Your add product form */}
    </div>
  );
};

export default AddProduct;
```

```tsx
// src/pages/Product/EditProduct.tsx
import React from 'react';

const EditProduct: React.FC = () => {
  return (
    <div>
      <h1>Edit Product</h1>
      {/* Your edit product form */}
    </div>
  );
};

export default EditProduct;
```

## That's It! 🎉

**No need to touch `RouteConfig.tsx` at all!**

The routes are automatically generated and work immediately:
- `/app/products` - Shows in menu, navigates to ProductList
- `/app/products/add` - Hidden from menu, but route exists
- `/app/products/edit` - Hidden from menu, but route exists

## Advanced: Adding Permissions

```tsx
{
  key: 'admin-products',
  label: 'Manage Products',
  route: '/app/products/manage',
  permissions: ['admin', 'product-manager'], // Only these roles can access
}
```

## Advanced: Nested Routes

```tsx
{
  key: 'products',
  label: 'Products',
  children: [
    {
      key: 'product-categories',
      label: 'Categories',
      route: '/app/products/categories',
      children: [
        {
          key: 'category-add',
          label: 'Add Category',
          route: '/app/products/categories/add',
          hidden: true,
        }
      ]
    }
  ]
}
```

## Comparison: Before vs After

### ❌ Before (Manual Maintenance)

```tsx
// Had to edit RouteConfig.tsx every time
<Route path="products">
  <Route index element={<ProductList />} />
  <Route path="add" element={<AddProduct />} />
  <Route path="edit" element={<EditProduct />} />
</Route>

// AND also update config.menu.tsx
{ key: 'products', route: '/app/products' }

// AND manage permissions in config.route.ts
{ route: '/app/products', permissions: [] }
```

**3 files to maintain!** 😰

### ✅ After (Auto-Generated)

```tsx
// config.menu.tsx - Everything in one place
{ key: 'products', route: '/app/products', permissions: [] }

// routeGenerator.tsx - Just map components
'/app/products': lazyLoad('pages/Product/ProductList')
```

**2 files, clean and simple!** 😊

## Tips

1. **Always use `hidden: true`** for detail/edit pages that shouldn't appear in navigation
2. **Keep route paths consistent** with your folder structure
3. **Use lazy loading** for all page components to improve performance
4. **Add permissions early** to avoid security issues later

## Common Patterns

### List + Add + Edit Pattern

```tsx
// List (visible in menu)
{ key: 'items', route: '/app/items', permissions: [] }

// Add (hidden from menu)
{ key: 'items-add', route: '/app/items/add', permissions: ['editor'], hidden: true }

// Edit (hidden from menu)
{ key: 'items-edit', route: '/app/items/edit', permissions: ['editor'], hidden: true }
```

### Dashboard + Settings Pattern

```tsx
// Dashboard (visible)
{ key: 'dashboard', route: '/app/dashboard', permissions: [] }

// Settings (visible)
{ key: 'settings', route: '/app/settings', permissions: ['admin'] }

// Settings Detail (hidden)
{ key: 'settings-detail', route: '/app/settings/:id', permissions: ['admin'], hidden: true }
```
