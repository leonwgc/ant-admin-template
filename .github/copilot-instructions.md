# Copilot Instructions for React + TypeScript Project

请始终遵循以下规范为本项目生成 React + TypeScript 代码：

1. 使用函数式组件（Function Component），优先使用箭头函数。
2. 组件和函数必须添加类型注解，Props 和 State 必须定义接口或类型别名。
3. 遵循 ESLint 和 Prettier 规则（如单引号、分号、行尾 2 空格缩进）。
4. 避免 any，优先使用明确的类型。
5. 组件文件命名采用大驼峰（PascalCase），变量/函数采用小驼峰（camelCase）。
6. 使用解构赋值和 ES6+ 语法。
7. 组件 props 必须加类型，事件处理函数类型要准确。
8. 避免内联样式，优先使用SCSS,不需要css module。
9. 导入顺序：第三方库 > 项目内模块 > 样式文件。
10. 代码需简洁、可读、易维护，必要时添加注释。
11. 使用 React Hooks（如 useState、useEffect）处理状态和副作用。
12. 确保组件可复用，避免过度复杂化。
13. 使用 TypeScript 的类型系统来增强代码的可读性和安全性。
14. 组件应尽量小而专注，遵循单一职责原则。
15. 使用 React Context 或 Redux 进行状态管理时，确保类型安全。
16. 添加组件或组件模版生成后，自动生成同名的scss文件，在scss文件头加上一行 @import 'scss/common.scss'，并确保样式文件与组件文件在同一目录下。
17. 添加的模版代码尽量精简，不需要具体实现
18. className 使用 BEM 命名规范，确保样式可读性和可维护性, 并使用双引号。
19. 使用 React Router 时，确保路由类型安全，使用 `RouteProps` 定义路由组件的 props。
20. 使用 TypeScript 的 `React.FC` 或 `React.FunctionComponent` 定义函数组件类型。
21. 确保所有组件都能通过 props 接收必要的参数，避免使用全局变量。
22. 使用 `useCallback` 和 `useMemo` 优化性能，避免不必要的重新渲染。
23. 确保所有的副作用都在 `useEffect` 中处理，避免在组件渲染过程中直接调用副作用函数。
24. 使用 `useRef` 来访问 DOM 元素或存储可变数据，避免不必要的状态更新。
25. 确保所有的事件处理函数都使用 `React.MouseEvent` 或其他适当的事件类型进行类型注解。
26. 所有列表渲染必须为每个元素提供唯一且稳定的 key。
27. 组件样式类名建议以组件名小驼峰（camelCase）格式为前缀，防止样式冲突。
29. 组件导入图片、SVG 等静态资源时，建议使用 import 语法并添加类型声明。
30. 使用 `React.lazy` 和 `Suspense` 实现代码分割，优化加载性能。
31. 确保所有的异步操作（如 API 调用）都在 `useEffect` 中处理，并使用适当的错误处理机制。
32. 使用 TypeScript 的 `Partial` 和 `Pick` 等工具类型来简化 props 类型定义。


---