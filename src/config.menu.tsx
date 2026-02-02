/**
 * @file src/config.menu.tsx
 * @author leon.wang
 */
import {
  ExperimentOutlined,
  UserOutlined,
  FormOutlined,
  ApiOutlined,
  AppstoreOutlined,
  CodeOutlined,
  AndroidOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { MenuProps } from '@derbysoft/neat-design';
import i18n from './i18n';

/** Get translated label */
const t = (key) => i18n.t(key);

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
    get label() {
      return t('menu.jsFeature');
    },
    icon: <CodeOutlined />,
    permissions: ['js'],
    children: [
      {
        key: 'intl-number-format',
        get label() {
          return t('menu.intlNumberFormat');
        },
        route: '/app/js-feature/intl-number-format',
        permissions: [],
      },
      {
        key: 'element-height',
        get label() {
          return t('menu.elementHeight');
        },
        route: '/app/js-feature/element-height',
        permissions: [],
      },
      {
        key: 'weakmap',
        get label() {
          return t('menu.weakmap');
        },
        route: '/app/js-feature/weakmap',
        permissions: [],
      },
      {
        key: 'proxy',
        get label() {
          return t('menu.proxy');
        },
        route: '/app/js-feature/proxy',
        permissions: [],
      },
      {
        key: 'typescript-advanced-types',
        get label() {
          return t('menu.typescriptAdvancedTypes');
        },
        route: '/app/js-feature/typescript-advanced-types',
        permissions: [],
      },
    ],
  },
  {
    key: 'css',
    get label() {
      return t('menu.cssFeature');
    },
    icon: <ExperimentOutlined />,
    permissions: [],
    children: [
      {
        key: 'css-1',
        get label() {
          return t('menu.cssNewFeatures');
        },
        route: '/app/css',
        permissions: [],
      },
      {
        key: 'css-box-model',
        get label() {
          return t('menu.cssBoxModel');
        },
        route: '/app/css/box-model',
        permissions: [],
      },
      {
        key: 'css-render-optimization',
        get label() {
          return t('menu.cssRenderOptimization');
        },
        route: '/app/css/render-optimization',
        permissions: [],
      },
      {
        key: 'css-grid',
        get label() {
          return t('menu.cssGridLayout');
        },
        route: '/app/css/grid',
        permissions: [],
      },
      {
        key: 'css-flex',
        get label() {
          return t('menu.cssFlexbox');
        },
        route: '/app/css/flexbox',
        permissions: [],
      },
      {
        key: 'css-container-queries',
        get label() {
          return t('menu.cssContainerQueries');
        },
        route: '/app/css/container-queries',
        permissions: [],
      },
      {
        key: 'css-blend-modes',
        get label() {
          return t('menu.cssBlendModes');
        },
        route: '/app/css/blend-modes',
        permissions: [],
      },
      {
        key: 'css-animation',
        get label() {
          return t('menu.cssAnimation');
        },
        route: '/app/css/animation',
        permissions: [],
      },
      {
        key: 'css-filter',
        get label() {
          return t('menu.cssFilter');
        },
        route: '/app/components/css-filter',
        permissions: [],
      },
      {
        key: 'css-sticky-table',
        get label() {
          return t('menu.cssStickyTable');
        },
        route: '/app/css/sticky-table',
        permissions: [],
      },
      {
        key: 'css-sticky-examples',
        get label() {
          return t('menu.cssStickyExamples');
        },
        route: '/app/css/sticky-examples',
        permissions: [],
      },
    ],
  },
  {
    key: 'user',
    get label() {
      return t('menu.users');
    },
    icon: <UserOutlined />,
    permissions: [],
    children: [
      {
        key: 'user-1',
        get label() {
          return t('menu.userList');
        },
        route: '/app/users',
        permissions: [],
      },
      {
        key: 'user-2',
        get label() {
          return t('menu.expandTable');
        },
        route: '/app/users/table',
        permissions: [],
      },
      {
        key: 'user-add',
        get label() {
          return t('menu.addUser');
        },
        route: '/app/users/add',
        permissions: [],
        hidden: true, // Hidden from menu, but included in routes
      },
      {
        key: 'user-edit',
        get label() {
          return t('menu.editUser');
        },
        route: '/app/users/edit',
        permissions: [],
        hidden: true, // Hidden from menu, but included in routes
      },
    ],
  },
  {
    key: 'form',
    get label() {
      return t('menu.forms');
    },
    icon: <FormOutlined />,
    permissions: [],
    children: [
      {
        route: '/app/form/add-phone-number',
        key: 'add-phone-number',
        get label() {
          return t('menu.addPhoneNumber');
        },
        permissions: [],
      },
      {
        key: 'form1',
        get label() {
          return t('menu.responsiveForm');
        },
        route: '/app/forms',
        permissions: [],
      },
      {
        key: 'dynamic-list',
        get label() {
          return t('menu.dynamicList');
        },
        route: '/app/forms/dynamic-list',
        permissions: [],
      },
      {
        key: 'form-validation',
        get label() {
          return t('menu.formValidation');
        },
        route: '/app/forms/validation',
        permissions: [],
      },
      {
        key: 'virtual-list',
        get label() {
          return t('menu.virtualList');
        },
        route: '/app/forms/virtual-list',
        permissions: [],
      },
    ],
  },
  {
    key: 'hooks',
    get label() {
      return t('menu.reactHooks');
    },
    icon: <ApiOutlined />,
    permissions: [],
    children: [
      {
        key: 'use-transition',
        get label() {
          return t('menu.useTransition');
        },
        route: '/app/hooks/use-transition',
        permissions: [],
      },
      {
        key: 'use-suspense',
        get label() {
          return t('menu.suspense');
        },
        route: '/app/hooks/use-suspense',
        permissions: [],
      },
      {
        key: 'use-ahooks-countdown',
        get label() {
          return t('menu.useCountdown');
        },
        route: '/app/hooks/use-ahooks-countdown',
        permissions: [],
      },
      {
        key: 'verification-code-countdown',
        get label() {
          return t('menu.verificationCodeCountdown');
        },
        route: '/app/hooks/verification-code-countdown',
        permissions: [],
      },
      {
        key: 'use-responsive',
        get label() {
          return t('menu.useResponsive');
        },
        route: '/app/hooks/use-responsive',
        permissions: [],
      },
      {
        key: 'use-ds-table',
        get label() {
          return t('menu.useDsTable');
        },
        route: '/app/hooks/use-ds-table',
        permissions: [],
      },
    ],
  },

  {
    key: 'components',
    get label() {
      return t('menu.components');
    },
    icon: <AppstoreOutlined />,
    permissions: [],
    children: [
      {
        key: 'animated',
        get label() {
          return t('menu.animated');
        },
        route: '/app/components/animated',
        permissions: [],
      },
      {
        key: 'dot-status',
        get label() {
          return t('menu.dotStatus');
        },
        route: '/app/components/dot-status',
        permissions: [],
      },
      {
        key: 'verification-code',
        get label() {
          return t('menu.verificationCode');
        },
        route: '/app/components/verification-code',
        permissions: [],
      },
      {
        key: 'contact-info',
        get label() {
          return t('menu.contactInfo');
        },
        route: '/app/components/contact-info',
        permissions: [],
      },
      {
        key: 'user-contact-card',
        get label() {
          return t('menu.userContactCard');
        },
        route: '/app/components/user-contact-card',
        permissions: [],
      },
      {
        key: 'email-success-modal',
        get label() {
          return t('menu.emailSuccessModal');
        },
        route: '/app/components/email-success-modal',
        permissions: [],
      },
      {
        key: 'verification-code-page',
        get label() {
          return t('menu.verificationCodePage');
        },
        route: '/app/components/verification-code-page',
        permissions: [],
      },
      {
        key: 'masonry',
        get label() {
          return t('menu.masonry');
        },
        route: '/app/components/masonry',
        permissions: [],
      },
      {
        key: 'chatbot',
        get label() {
          return t('menu.chatbot');
        },
        route: '/app/components/chatbot',
        permissions: [],
      },
      {
        key: 'image-upload',
        get label() {
          return t('menu.imageUpload');
        },
        route: '/app/components/image-upload',
        permissions: [],
      },
      {
        key: 'fade-in',
        get label() {
          return t('menu.fadeIn');
        },
        route: '/app/components/fade-in',
        permissions: [],
      },
      {
        key: 'text-ellipsis',
        get label() {
          return t('menu.textEllipsis');
        },
        route: '/app/components/text-ellipsis',
        permissions: [],
      },

    ],
  },
  {
    key: 'libs',
    get label() {
      return t('menu.libraries');
    },
    icon: <CodeOutlined />,
    permissions: [],
    children: [
      {
        key: 'react-hook-form',
        get label() {
          return t('menu.reactHookForm');
        },
        route: '/app/hooks/react-hook-form',
        permissions: [],
      },
      {
        key: 'use-form-field',
        get label() {
          return t('menu.reactFormFieldHook');
        },
        route: '/app/hooks/use-form-field',
        permissions: [],
      },
      {
        key: 'zustand-demo',
        get label() {
          return t('menu.zustand');
        },
        route: '/app/hooks/zustand-demo',
        permissions: [],
      },
      {
        key: 'use-global-state',
        get label() {
          return t('menu.zustandKit');
        },
        route: '/app/hooks/use-global-state',
        permissions: [],
      },
      {
        key: 'sortable-demo',
        get label() {
          return t('menu.sortableJs');
        },
        route: '/app/js/sortable-demo',
        permissions: [],
      },
    ],
  },
  {
    key: 'games',
    get label() {
      return t('menu.games');
    },
    icon: <AndroidOutlined />,
    permissions: [],
    children: [
      {
        key: 'tetris-3d',
        get label() {
          return t('menu.tetris3d');
        },
        route: '/app/games/tetris-3d',
        permissions: [],
      },
      {
        key: 'flappy-birds-3d',
        get label() {
          return t('menu.flappyBirds3d');
        },
        route: '/app/games/flappy-birds-3d',
        permissions: [],
      },
      {
        key: 'snake-3d',
        get label() {
          return t('menu.snake3d');
        },
        route: '/app/games/snake-3d',
        permissions: [],
      },
      {
        key: 'match-3',
        get label() {
          return t('menu.match3');
        },
        route: '/app/games/match-3',
        permissions: [],
      },
    ],
  },
  {
    key: 'hotel',
    get label() {
      return t('menu.hotel');
    },
    icon: <HomeOutlined />,
    permissions: [],
    children: [
      {
        key: 'room-calendar',
        get label() {
          return t('menu.roomCalendar');
        },
        route: '/app/hotel/room-calendar',
        permissions: [],
      },
      {
        key: 'phone-management',
        get label() {
          return t('menu.phoneManagement');
        },
        route: '/app/hotel/phone-management',
        permissions: [],
      },
      {
        key: 'login-page',
        get label() {
          return t('menu.loginPage');
        },
        route: '/app/hotel/login-page',
        permissions: [],
      },
    ],
  },
];
