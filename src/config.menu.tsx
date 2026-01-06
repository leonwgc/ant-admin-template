import {
  ExperimentOutlined,
  UserOutlined,
  FormOutlined,
  ApiOutlined,
  AppstoreOutlined,
  CodeOutlined,
  AndroidOutlined,
} from '@ant-design/icons';
import { MenuProps } from '@derbysoft/neat-design';

export type MenuItem = Required<MenuProps>['items'][number] & {
  /**
   * menu item children
   */
  children?: MenuItem[];
  /**
   * menu item route
   */
  route?: string;
  /**
   * permissions needed to access this menu item
   */
  permissions?: string[];
  /**
   * whether to hide this menu item from menu display
   * (but still generate route for it)
   */
  hidden?: boolean;
};

/**
 * Defines the application's sidebar menu configuration.
 *
 * Each menu item can have:
 * - `key`: Unique identifier for the menu item.
 * - `label`: Display name of the menu item.
 * - `icon`: React element representing the menu icon.
 * - `permissions`: Array of permissions required to view the menu item.
 * - `children`: Nested menu items.
 * - `route`: (Optional) Route path for navigation.
 * - `hidden`: (Optional) If true, the item is excluded from the menu UI but included in routing.
 *
 * This structure is used to render navigation menus and control access based on permissions.
 */
export const menus: MenuItem[] = [
  {
    key: 'js-feature',
    label: 'JS Feature',
    icon: <CodeOutlined />,
    permissions: ['js'],
    children: [
      {
        key: 'intl-number-format',
        label: 'Intl.NumberFormat',
        route: '/app/js-feature/intl-number-format',
        permissions: [],
      },
      {
        key: 'element-height',
        label: 'Element Height',
        route: '/app/js-feature/element-height',
        permissions: [],
      },
      {
        key: 'weakmap',
        label: 'WeakMap',
        route: '/app/js-feature/weakmap',
        permissions: [],
      },
      {
        key: 'proxy',
        label: 'Proxy',
        route: '/app/js-feature/proxy',
        permissions: [],
      },
    ],
  },
  {
    key: 'css',
    label: 'CSS Feature',
    icon: <ExperimentOutlined />,
    permissions: [],
    children: [
      {
        key: 'css-1',
        label: 'CSS New Features',
        route: '/app/css',
        permissions: [],
      },
      {
        key: 'css-render-optimization',
        label: 'CSS Render Optimization',
        route: '/app/css/render-optimization',
        permissions: [],
      },
      {
        key: 'css-grid',
        label: 'CSS Grid Layout',
        route: '/app/css/grid',
        permissions: [],
      },
      {
        key: 'css-flex',
        label: 'CSS Flexbox',
        route: '/app/css/flexbox',
        permissions: [],
      },
      {
        key: 'css-container-queries',
        label: 'CSS Container Queries',
        route: '/app/css/container-queries',
        permissions: [],
      },
      {
        key: 'css-blend-modes',
        label: 'CSS Blend Modes',
        route: '/app/css/blend-modes',
        permissions: [],
      },
      {
        key: 'css-animation',
        label: 'CSS Animation',
        route: '/app/css/animation',
        permissions: [],
      },
      {
        key: 'css-filter',
        label: 'CSS Filter',
        route: '/app/components/css-filter',
        permissions: [],
      },
    ],
  },
  {
    key: 'user',
    label: 'Users',
    icon: <UserOutlined />,
    permissions: [],
    children: [
      {
        key: 'user-1',
        label: 'User list',
        route: '/app/users',
        permissions: [],
      },
      {
        key: 'user-2',
        label: 'Expand Table',
        route: '/app/users/table',
        permissions: [],
      },
      {
        key: 'user-add',
        label: 'Add User',
        route: '/app/users/add',
        permissions: [],
        hidden: true, // Hidden from menu, but included in routes
      },
      {
        key: 'user-edit',
        label: 'Edit User',
        route: '/app/users/edit',
        permissions: [],
        hidden: true, // Hidden from menu, but included in routes
      },
    ],
  },
  {
    key: 'form',
    label: 'Forms',
    icon: <FormOutlined />,
    permissions: [],
    children: [
      {
        key: 'form1',
        label: 'Responsive Form',
        route: '/app/forms',
        permissions: [],
      },
      {
        key: 'dynamic-list',
        label: 'Dynamic List',
        route: '/app/forms/dynamic-list',
        permissions: [],
      },
      {
        key: 'form-validation',
        label: 'Form Validation',
        route: '/app/forms/validation',
        permissions: [],
      },
      {
        key: 'virtual-list',
        label: 'Virtual List',
        route: '/app/forms/virtual-list',
        permissions: [],
      },
    ],
  },
  {
    key: 'hooks',
    label: 'React Hooks',
    icon: <ApiOutlined />,
    permissions: [],
    children: [
      {
        key: 'use-transition',
        label: 'useTransition',
        route: '/app/hooks/use-transition',
        permissions: [],
      },
      {
        key: 'use-suspense',
        label: 'Suspense',
        route: '/app/hooks/use-suspense',
        permissions: [],
      },
      {
        key: 'use-ahooks-countdown',
        label: 'useCountdown',
        route: '/app/hooks/use-ahooks-countdown',
        permissions: [],
      },
      {
        key: 'verification-code-countdown',
        label: 'Verification Code Countdown',
        route: '/app/hooks/verification-code-countdown',
        permissions: [],
      },
      {
        key: 'use-responsive',
        label: 'useResponsive',
        route: '/app/hooks/use-responsive',
        permissions: [],
      },
      {
        key: 'use-ds-table',
        label: 'useDsTable',
        route: '/app/hooks/use-ds-table',
        permissions: [],
      },
    ],
  },

  {
    key: 'components',
    label: 'Components',
    icon: <AppstoreOutlined />,
    permissions: [],
    children: [
      {
        key: 'dot-status',
        label: 'DotStatus',
        route: '/app/components/dot-status',
        permissions: [],
      },
      {
        key: 'verification-code',
        label: 'VerificationCode',
        route: '/app/components/verification-code',
        permissions: [],
      },
      {
        key: 'contact-info',
        label: 'ContactInfo',
        route: '/app/components/contact-info',
        permissions: [],
      },
      {
        key: 'user-contact-card',
        label: 'UserContactCard',
        route: '/app/components/user-contact-card',
        permissions: [],
      },
      {
        key: 'email-success-modal',
        label: 'EmailSuccessModal',
        route: '/app/components/email-success-modal',
        permissions: [],
      },
      {
        key: 'verification-code-page',
        label: 'VerificationCodePage',
        route: '/app/components/verification-code-page',
        permissions: [],
      },
      {
        key: 'masonry',
        label: 'Masonry',
        route: '/app/components/masonry',
        permissions: [],
      },
      {
        key: 'chatbot',
        label: 'ChatBot',
        route: '/app/components/chatbot',
        permissions: [],
      },
      {
        key: 'image-upload',
        label: 'ImageUpload',
        route: '/app/components/image-upload',
        permissions: [],
      },
      {
        key: 'fade-in',
        label: 'FadeIn',
        route: '/app/components/fade-in',
        permissions: [],
      },
      {
        key: 'date-table',
        label: 'DateTable',
        route: '/app/components/date-table',
        permissions: [],
      },
    ],
  },
  {
    key: 'libs',
    label: 'Libraries',
    icon: <CodeOutlined />,
    permissions: [],
    children: [
      {
        key: 'zustand-demo',
        label: 'Zustand',
        route: '/app/hooks/zustand-demo',
        permissions: [],
      },
      {
        key: 'sortable-demo',
        label: 'Sortable.js',
        route: '/app/js/sortable-demo',
        permissions: [],
      },
    ],
  },
  {
    key: 'games',
    label: 'Games',
    icon: <AndroidOutlined />,
    permissions: [],
    children: [
      {
        key: 'tetris-3d',
        label: '3D Tetris',
        route: '/app/games/tetris-3d',
        permissions: [],
      },
      {
        key: 'flappy-birds-3d',
        label: 'Flappy Birds 3D',
        route: '/app/games/flappy-birds-3d',
        permissions: [],
      },
      {
        key: 'snake-3d',
        label: '3D Snake',
        route: '/app/games/snake-3d',
        permissions: [],
      },
      {
        key: 'match-3',
        label: 'Match 3',
        route: '/app/games/match-3',
        permissions: [],
      },
    ],
  },
];
