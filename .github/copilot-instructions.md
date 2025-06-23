# Copilot Instructions for React + TypeScript Project

请始终遵循以下规范为本项目生成 React + TypeScript 代码：

1. 使用函数式组件（Function Component），优先使用箭头函数。
2. 组件和函数必须添加类型注解，Props 和 State 必须定义接口或类型别名。
3. 遵循 ESLint 和 Prettier 规则（如单引号、分号、行尾 2 空格缩进）。
4. 避免 any，优先使用明确的类型。
5. 组件文件命名采用大驼峰（PascalCase），变量/函数采用小驼峰（camelCase）。
6. 使用解构赋值和 ES6+ 语法。
7. 组件 props 必须加类型，事件处理函数类型要准确。
8. 避免内联样式，优先使用 CSS/SCSS 或 styled-components。
9. 导入顺序：第三方库 > 项目内模块 > 样式文件。
10. 代码需简洁、可读、易维护，必要时添加注释。
11. 使用 React Hooks（如 useState、useEffect）处理状态和副作用。
12. 确保组件可复用，避免过度复杂化。
13. 使用 TypeScript 的类型系统来增强代码的可读性和安全性。
14. 组件应尽量小而专注，遵循单一职责原则。
15. 使用 React Context 或 Redux 进行状态管理时，确保类型安全。
16. 添加组件后，自动生成同名的scss文件，在scss文件头加上一行 @import 'scss/common.scss'，并确保样式文件与组件文件在同一目录下。

---