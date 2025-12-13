## 项目简介

ant admin template 是一个基于 React + TypeScript 的后台管理项目，采用 Ant Design v5 作为 UI 组件库，遵循高可维护性和可扩展性设计原则。

## 技术栈

- React 18
- TypeScript
- Ant Design v5
- SCSS
- Zustand
- react-router v7
- i18next

## 快速开始

### 方式一：使用现有项目

1. 安装依赖

    ```bash
    npm install
    ```

2. 启动开发服务器

    ```bash
    npm start
    ```

3. 构建生产包

    ```bash
    npm run build
    ```

### 方式二：使用模板创建新项目

使用提供的脚本快速创建新项目：

```bash
git clone --depth 1 https://github.com/leonwgc/ant-admin-template.git my-new-project
cd <new-project-name>
rm -rf .git
git init
pnpm install
```

**注意：** 使用前需先将此项目推送到 GitHub，并在 `create-project.sh` 中配置正确的 GitHub 仓库地址。

## 代码规范

- 所有组件均使用 TypeScript 的类型系统，Props 和 State 必须定义接口或类型别名。
- 组件文件和样式文件需添加头部注释，遵循 BEM 命名规范。
- 使用 `useCallback` 和 `useMemo` 优化性能，副作用统一在 `useEffect` 中处理。
- UI 组件统一使用 Ant Design v5。

## Commit 规范

- 格式：`feat: 添加新功能`、`fix: 修复问题` 等，保持简洁明了。

## 联系方式

如有问题或建议，请联系
