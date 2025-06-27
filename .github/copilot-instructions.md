# Copilot Instructions for React + TypeScript Project

请始终遵循以下规范为本项目生成 React + TypeScript 代码：

- 使用 TypeScript 的 `React.FC` 定义函数组件类型
- 组件和函数必须添加类型注解，Props 和 State 必须定义接口或类型别名。
- 遵循 ESLint 和 Prettier 规则（如单引号、分号、行尾 2 空格缩进）。
- 使用解构赋值和 ES6+ 语法。
- 使用 TypeScript 的类型系统来增强代码的可读性和安全性。
- 组件应尽量小而专注，遵循单一职责原则。
- className 使用标准的BEM命名规范，确保样式可读性和可维护性, 并使用双引号。
- 在组件和样式文件的最顶部加上以下注释：
```javascript
/**
 * @file 组件文件相对路径
 */
```
- scss文件头加上一行 @import 'scss/common.scss', 类名用标准的BEM命名规范。
- 添加的样式文件不需要具体实现，只需添加样式文件头注释
- 使用 `useCallback` 和 `useMemo` 优化性能，避免不必要的重新渲染。
- 确保所有的副作用都在 `useEffect` 中处理，避免在组件渲染过程中直接调用副作用函数。
- 本项目的UI组件库使用 Ant Design v5，确保遵循 Ant Design 的设计规范和组件使用方式。
- commit message 必须符合规范并保持字数精简，格式为 `feat: 添加新功能` 或 `fix: 修复问题` 等。

---