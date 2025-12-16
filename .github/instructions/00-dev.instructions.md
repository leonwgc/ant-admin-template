---
applyTo: '**'
---
# Copilot Instructions for React + TypeScript Project

请始终遵循以下规范为本项目生成 React + TypeScript 代码：

1. 使用函数式组件（Function Component），优先使用箭头函数。
2. 组件和函数必须添加类型注解，Props 和 State 必须定义接口或类型别名。
3. 遵循 ESLint 和 Prettier 规则（如单引号、分号、行尾 2 空格缩进）。
4. 组件 props 必须加类型，事件处理函数类型要准确。
5. 避免内联样式，优先使用SCSS,不需要css module。
6. 导入顺序：第三方库 > 项目内模块 > 样式文件。
7. 使用 TypeScript 的类型系统来增强代码的可读性和安全性。
8. 组件应尽量小而专注，遵循单一职责原则。
9. 添加组件或组件模版生成后，自动生成同名的scss文件，在scss文件头加上一行 @import 'scss/common.scss'，并确保样式文件与组件文件在同一目录下。
10. className 使用 BEM 命名规范，确保样式可读性和可维护性, 并使用双引号。
11. 本项目UI框架为 antd (Ant Design), 需要使用 antd 的组件和样式。
12. 所有的注释请使用英文。
13. - 在组件和样式文件的最顶部加上以下注释：
```javascript
/**
 * @file 组件文件相对路径
 * @author leon.wang
 */
```
14. 代码生成后使用prittier进行格式化。

---
