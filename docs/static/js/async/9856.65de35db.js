"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["9856"],{76878(r,e,s){s.r(e)},62131(r,e,s){s.r(e),s.d(e,{default:()=>m});var o=s(74848),d=s(96540),n=s(58607),i=s(40244),l=s(16629),c=s(36813),a=s(15398),t=s(18941),h=s(62736);s(76878);let j=r=>{let{shouldThrow:e}=r;if(e)throw Error("\uD83D\uDCA5 组件崩溃了！这是一个测试错误。");return(0,o.jsx)("div",{className:"buggy-component",children:"✅ 组件正常运行"})},x=()=>{let[r,e]=(0,d.useState)(!1);return d.useEffect(()=>{r&&setTimeout(()=>{throw Error("\uD83D\uDCA5 异步错误！这是在 useEffect 中抛出的错误。")},100)},[r]),(0,o.jsxs)("div",{children:[(0,o.jsx)(n.Ay,{danger:!0,onClick:()=>e(!0),children:"触发异步错误"}),r&&(0,o.jsx)("div",{children:"等待错误..."})]})},m=()=>{let[r,e]=(0,d.useState)(!1),[s,m]=(0,d.useState)(!1),[u,y]=(0,d.useState)(!1);return(0,o.jsxs)("div",{className:"error-boundary-demo",children:[(0,o.jsx)("h1",{children:"ErrorBoundary 错误边界组件"}),(0,o.jsx)(i.A,{message:"什么是错误边界？",description:"错误边界是 React 组件，用于捕获其子组件树中的 JavaScript 错误，记录错误，并显示备用 UI，而不是让整个组件树崩溃。",type:"info",showIcon:!0,style:{marginBottom:24}}),(0,o.jsx)(l.A,{title:"示例 1：基础用法",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:"当子组件抛出错误时，错误边界会捕获并显示备用 UI。"}),(0,o.jsx)(n.Ay,{type:"primary",danger:!0,icon:(0,o.jsx)(t.A,{}),onClick:()=>e(!0),children:"触发错误"})]}),(0,o.jsx)(h.ErrorBoundary,{children:(0,o.jsx)("div",{className:"error-boundary-demo__test-area",children:(0,o.jsx)(j,{shouldThrow:r})})})]})}),(0,o.jsx)(l.A,{title:"示例 2：自定义备用 UI",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:"可以提供自定义的备用 UI 来替代默认的错误页面。"}),(0,o.jsx)(n.Ay,{type:"primary",danger:!0,icon:(0,o.jsx)(t.A,{}),onClick:()=>m(!0),children:"触发错误"})]}),(0,o.jsx)(h.ErrorBoundary,{fallback:(0,o.jsx)(i.A,{message:"自定义错误提示",description:"这是一个自定义的错误备用 UI",type:"error",showIcon:!0,action:(0,o.jsx)(n.Ay,{size:"small",danger:!0,onClick:()=>m(!1),children:"重置"})}),children:(0,o.jsx)("div",{className:"error-boundary-demo__test-area",children:(0,o.jsx)(j,{shouldThrow:s})})})]})}),(0,o.jsx)(l.A,{title:"示例 3：错误回调",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:"可以通过 onError 回调来记录错误信息到日志服务。"}),(0,o.jsx)(n.Ay,{type:"primary",danger:!0,icon:(0,o.jsx)(t.A,{}),onClick:()=>y(!0),children:"触发错误"})]}),(0,o.jsx)(h.ErrorBoundary,{onError:(r,e)=>{console.log("\uD83D\uDCDD 记录错误到服务:",{error:r.message,componentStack:e.componentStack})},errorTitle:"组件出错",errorSubtitle:"错误已记录到日志系统",children:(0,o.jsx)("div",{className:"error-boundary-demo__test-area",children:(0,o.jsx)(j,{shouldThrow:u})})})]})}),(0,o.jsxs)(l.A,{title:"示例 4：嵌套错误边界",className:"error-boundary-demo__card",children:[(0,o.jsx)("p",{children:"可以在不同层级使用多个错误边界，只有最近的边界会捕获错误。"}),(0,o.jsx)(a.A,{}),(0,o.jsx)(h.ErrorBoundary,{errorTitle:"外层错误边界",children:(0,o.jsxs)("div",{className:"error-boundary-demo__nested",children:[(0,o.jsx)("h4",{children:"外层区域"}),(0,o.jsx)(h.ErrorBoundary,{errorTitle:"内层错误边界",children:(0,o.jsxs)("div",{className:"error-boundary-demo__nested-inner",children:[(0,o.jsx)("h4",{children:"内层区域"}),(0,o.jsx)(j,{shouldThrow:!1})]})})]})})]}),(0,o.jsx)(l.A,{title:"⚠️ 注意事项",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"middle",style:{width:"100%"},children:[(0,o.jsx)(i.A,{message:"错误边界无法捕获以下错误：",description:(0,o.jsxs)("ul",{style:{marginTop:8,paddingLeft:20},children:[(0,o.jsx)("li",{children:"事件处理器中的错误（使用 try-catch）"}),(0,o.jsx)("li",{children:"异步代码（setTimeout、Promise 等）"}),(0,o.jsx)("li",{children:"服务端渲染的错误"}),(0,o.jsx)("li",{children:"错误边界自身抛出的错误"})]}),type:"warning",showIcon:!0}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:"示例：异步错误（无法被捕获）"})}),(0,o.jsx)(h.ErrorBoundary,{children:(0,o.jsx)(x,{})}),(0,o.jsx)(i.A,{message:"异步错误不会被错误边界捕获，需要在代码中使用 try-catch 或 Promise.catch() 处理",type:"info",style:{marginTop:12}})]})]})}),(0,o.jsx)(l.A,{title:"\uD83D\uDCA1 最佳实践",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"middle",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"1. 粒度控制"}),(0,o.jsx)("p",{children:"在关键区域使用错误边界，如："}),(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:"路由级别（每个页面一个错误边界）"}),(0,o.jsx)("li",{children:"独立功能模块"}),(0,o.jsx)("li",{children:"第三方组件"})]})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"2. 错误上报"}),(0,o.jsx)("p",{children:"在生产环境中，使用 onError 回调将错误发送到监控服务："}),(0,o.jsx)("pre",{className:"error-boundary-demo__code",children:`<ErrorBoundary
  onError={(error, errorInfo) => {
    // 发送到 Sentry、LogRocket 等服务
    logErrorToService({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }}
>
  <YourComponent />
</ErrorBoundary>`})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"3. 用户友好的提示"}),(0,o.jsx)("p",{children:"提供清晰的错误信息和恢复操作按钮，如重新加载、返回首页等。"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"4. 开发环境调试"}),(0,o.jsx)("p",{children:"在开发环境显示详细的错误堆栈，方便调试。"})]})]})}),(0,o.jsx)(l.A,{title:"\uD83D\uDCDD 使用示例",className:"error-boundary-demo__card",children:(0,o.jsxs)(c.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"基础用法"}),(0,o.jsx)("pre",{className:"error-boundary-demo__code",children:`import { ErrorBoundary } from '~/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>`})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"自定义备用 UI"}),(0,o.jsx)("pre",{className:"error-boundary-demo__code",children:`<ErrorBoundary
  fallback={<div>自定义错误页面</div>}
>
  <YourComponent />
</ErrorBoundary>`})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"动态备用 UI"}),(0,o.jsx)("pre",{className:"error-boundary-demo__code",children:`<ErrorBoundary
  fallback={(error, errorInfo) => (
    <div>
      <h2>出错了</h2>
      <details>
        <summary>错误详情</summary>
        <pre>{error.message}</pre>
      </details>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>`})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{children:"配置选项"}),(0,o.jsx)("pre",{className:"error-boundary-demo__code",children:`<ErrorBoundary
  errorTitle="自定义标题"
  errorSubtitle="自定义副标题"
  showDetails={true}
  showReload={true}
  showHome={true}
  homePath="/dashboard"
  onError={(error, errorInfo) => {
    console.log('Error:', error);
  }}
>
  <YourComponent />
</ErrorBoundary>`})]})]})})]})}}}]);