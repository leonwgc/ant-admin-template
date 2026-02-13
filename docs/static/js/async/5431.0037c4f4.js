"use strict";(self.webpackChunkneat_admin_template=self.webpackChunkneat_admin_template||[]).push([["5431"],{65929(e,s,t){t.r(s)},15338(e,s,t){t.r(s),t.d(s,{default:()=>b});var r=t(74848),n=t(96540),l=t(12229),i=t(58607),c=t(16629),a=t(36813),o=t(15398),d=t(26149),u=t(64651),h=t(87134),m=t(27467),j=t(75829);t(65929);let{Title:x,Paragraph:g,Text:p}=l.A,S=(0,u.v)(e=>({count:0,increment:()=>e(e=>({count:e.count+1})),decrement:()=>e(e=>({count:e.count-1})),reset:()=>e({count:0})})),v=(0,u.v)()((0,m.D)(e=>({todos:[],addTodo:s=>e(e=>{e.todos.push({id:Date.now(),text:s,completed:!1})}),toggleTodo:s=>e(e=>{let t=e.todos.find(e=>e.id===s);t&&(t.completed=!t.completed)}),removeTodo:s=>e(e=>{e.todos=e.todos.filter(e=>e.id!==s)})}))),A=(0,u.v)()((0,h.Zr)(e=>({user:null,setUser:s=>e({user:s}),clearUser:()=>e({user:null})}),{name:"user-storage"})),y=(0,u.v)()(e=>({bears:0,addBear:()=>e(e=>({bears:e.bears+1})),fishes:0,addFish:()=>e(e=>({fishes:e.fishes+1}))})),C=(0,u.v)(e=>({count:0,name:"John",age:25,incrementCount:()=>e(e=>({count:e.count+1})),updateName:s=>e({name:s}),updateAge:s=>e({age:s})})),f=()=>{let e=n.useRef(0);e.current++;let{count:s,incrementCount:t}=C();return(0,r.jsxs)("div",{className:"zustand-demo__performance-item",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(p,{strong:!0,children:"Without Shallow:"}),(0,r.jsxs)(p,{type:"danger",children:[" Renders: ",e.current]})]}),(0,r.jsxs)("div",{children:["Count: ",s]}),(0,r.jsx)(i.Ay,{onClick:t,size:"small",children:"Increment Count"})]})},w=()=>{let e=n.useRef(0);e.current++;let s=C(e=>e.count),t=C(e=>e.incrementCount);return(0,r.jsxs)("div",{className:"zustand-demo__performance-item",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(p,{strong:!0,children:"With Selector:"}),(0,r.jsxs)(p,{type:"success",children:[" Renders: ",e.current]})]}),(0,r.jsxs)("div",{children:["Count: ",s]}),(0,r.jsx)(i.Ay,{onClick:t,size:"small",children:"Increment Count"})]})},_=()=>{let e=n.useRef(0);e.current++;let{count:s,incrementCount:t}=C((0,j.k)(e=>({count:e.count,incrementCount:e.incrementCount})));return(0,r.jsxs)("div",{className:"zustand-demo__performance-item",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(p,{strong:!0,children:"With Shallow:"}),(0,r.jsxs)(p,{type:"success",children:[" Renders: ",e.current]})]}),(0,r.jsxs)("div",{children:["Count: ",s]}),(0,r.jsx)(i.Ay,{onClick:t,size:"small",children:"Increment Count"})]})},b=()=>{let{count:e,increment:s,decrement:t,reset:l}=S(),{todos:u,addTodo:h,toggleTodo:m,removeTodo:j}=v(),{user:b,setUser:z,clearUser:N}=A(),{bears:k,addBear:U,fishes:I,addFish:B}=y(),{name:P,age:R,updateName:T,updateAge:F}=C(),[W,D]=n.useState(""),[M,Z]=n.useState(""),[q,E]=n.useState(""),[L,O]=n.useState(""),[G,J]=n.useState(""),[K,V]=n.useState(""),H=()=>{W.trim()&&(h(W),D(""))};return(0,r.jsxs)("div",{className:"zustand-demo",children:[(0,r.jsx)(x,{level:2,children:"Zustand State Management"}),(0,r.jsx)(g,{children:"Zustand is a small, fast and scalable bearbones state-management solution using simplified flux principles."}),(0,r.jsxs)(c.A,{title:"1. Basic Counter Store",className:"zustand-demo__card",children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(p,{strong:!0,children:"Features:"})," Simple state management with actions"]}),(0,r.jsxs)("div",{className:"zustand-demo__counter",children:[(0,r.jsx)(p,{className:"zustand-demo__count",children:e}),(0,r.jsxs)(a.A,{children:[(0,r.jsx)(i.Ay,{onClick:t,children:"-"}),(0,r.jsx)(i.Ay,{onClick:s,children:"+"}),(0,r.jsx)(i.Ay,{onClick:l,children:"Reset"})]})]}),(0,r.jsx)(o.A,{}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));`})})]}),(0,r.jsxs)(c.A,{title:"2. Todo Store with Immer Middleware",className:"zustand-demo__card",children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(p,{strong:!0,children:"Features:"})," Immutable updates made simple with Immer"]}),(0,r.jsxs)(a.A,{className:"zustand-demo__todo-input",children:[(0,r.jsx)(d.A,{placeholder:"Add a new todo",value:W,onChange:e=>D(e.target.value),onPressEnter:H}),(0,r.jsx)(i.Ay,{type:"primary",onClick:H,children:"Add"})]}),(0,r.jsx)("div",{className:"zustand-demo__todo-list",children:u.map(e=>(0,r.jsxs)("div",{className:"zustand-demo__todo-item",children:[(0,r.jsx)(p,{delete:e.completed,onClick:()=>m(e.id),style:{cursor:"pointer",flex:1},children:e.text}),(0,r.jsx)(i.Ay,{size:"small",danger:!0,onClick:()=>j(e.id),children:"Delete"})]},e.id))})]}),(0,r.jsxs)(c.A,{title:"3. User Store with Persist Middleware",className:"zustand-demo__card",children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(p,{strong:!0,children:"Features:"})," Auto-persist to localStorage"]}),(0,r.jsxs)(a.A,{direction:"vertical",style:{width:"100%"},children:[(0,r.jsx)(d.A,{placeholder:"Name",value:M,onChange:e=>Z(e.target.value)}),(0,r.jsx)(d.A,{placeholder:"Email",value:q,onChange:e=>E(e.target.value)}),(0,r.jsx)(d.A,{placeholder:"Age",type:"number",value:L,onChange:e=>O(e.target.value)}),(0,r.jsxs)(a.A,{children:[(0,r.jsx)(i.Ay,{type:"primary",onClick:()=>{M&&q&&L&&z({name:M,email:q,age:parseInt(L)})},children:"Save User"}),(0,r.jsx)(i.Ay,{onClick:N,children:"Clear User"})]})]}),b&&(0,r.jsxs)("div",{className:"zustand-demo__user-info",children:[(0,r.jsx)(x,{level:5,children:"Saved User:"}),(0,r.jsxs)(p,{children:["Name: ",b.name]}),(0,r.jsx)("br",{}),(0,r.jsxs)(p,{children:["Email: ",b.email]}),(0,r.jsx)("br",{}),(0,r.jsxs)(p,{children:["Age: ",b.age]})]})]}),(0,r.jsxs)(c.A,{title:"4. Slices Pattern (Advanced)",className:"zustand-demo__card",children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(p,{strong:!0,children:"Features:"})," Organize large stores into slices"]}),(0,r.jsxs)(a.A,{direction:"vertical",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)(p,{strong:!0,children:["Bears: ",k]}),(0,r.jsx)(i.Ay,{onClick:U,style:{marginLeft:16},children:"Add Bear"})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)(p,{strong:!0,children:["Fishes: ",I]}),(0,r.jsx)(i.Ay,{onClick:B,style:{marginLeft:16},children:"Add Fish"})]})]})]}),(0,r.jsxs)(c.A,{title:"5. Performance Optimization with Shallow",className:"zustand-demo__card",children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(p,{strong:!0,children:"Features:"})," Prevent unnecessary re-renders using shallow comparison"]}),(0,r.jsxs)("div",{className:"zustand-demo__performance-demo",children:[(0,r.jsxs)(g,{children:['Current Store State: Name = "',P,'", Age = ',R]}),(0,r.jsxs)(a.A,{style:{marginBottom:16},children:[(0,r.jsx)(d.A,{placeholder:"Update Name",value:G,onChange:e=>J(e.target.value),style:{width:150}}),(0,r.jsx)(i.Ay,{onClick:()=>{T(G),J("")},children:"Update Name"}),(0,r.jsx)(d.A,{placeholder:"Update Age",type:"number",value:K,onChange:e=>V(e.target.value),style:{width:100}}),(0,r.jsx)(i.Ay,{onClick:()=>{F(Number(K)),V("")},children:"Update Age"})]}),(0,r.jsx)(o.A,{}),(0,r.jsxs)("div",{className:"zustand-demo__performance-compare",children:[(0,r.jsx)(f,{}),(0,r.jsx)(w,{}),(0,r.jsx)(_,{})]}),(0,r.jsx)(g,{style:{marginTop:16},children:(0,r.jsx)(p,{type:"warning",children:"\uD83D\uDCA1 Try updating Name or Age: The components with selector/shallow will only re-render when count changes, but the component without optimization will re-render every time!"})})]})]}),(0,r.jsx)(c.A,{title:"Zustand Best Practices",className:"zustand-demo__card",children:(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Use TypeScript:"})," Define interfaces for type safety"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Middleware:"})," Use persist for localStorage, devtools for debugging"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Immer:"})," Simplify nested state updates with immer middleware"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Slices:"})," Split large stores into smaller, manageable slices"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Selectors:"})," Use selectors to prevent unnecessary re-renders"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(p,{strong:!0,children:"Actions:"})," Keep actions close to state for better organization"]})]})}),(0,r.jsxs)(c.A,{title:"Advanced Techniques",className:"zustand-demo__card",children:[(0,r.jsx)(x,{level:5,children:"1. Computed Values"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`const useStore = create((set, get) => ({
  items: [],
  get total() { return get().items.length; }
}));`})}),(0,r.jsx)(x,{level:5,children:"2. Async Actions"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`const useStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const response = await fetch('/api/users');
    const users = await response.json();
    set({ users });
  }
}));`})}),(0,r.jsx)(x,{level:5,children:"3. Subscribe to State Changes"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`// Basic subscription
useStore.subscribe((state) => {
  console.log('State changed:', state);
});

// With selector (requires subscribeWithSelector middleware)
import { subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  subscribeWithSelector((set) => ({ count: 0 }))
);

useStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count changed:', count)
);`})}),(0,r.jsx)(x,{level:5,children:"4. Reset Store"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`const initialState = { count: 0 };
const useStore = create(() => initialState);
const reset = () => useStore.setState(initialState);`})}),(0,r.jsx)(x,{level:5,children:"5. Slice Patterns (Advanced)"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`// Define slice interfaces
interface UserSlice {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

interface CartSlice {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

// Define combined state type
type StoreState = UserSlice & CartSlice;
type SetState = (partial: Partial<StoreState>) => void;

// Create separate slices
const createUserSlice = (set: SetState): UserSlice => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

const createCartSlice = (set: SetState): CartSlice => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
});

// Combine slices into single store
const useStore = create<StoreState>()((set) => ({
  ...createUserSlice(set),
  ...createCartSlice(set),
}));

// Usage: Access any slice's state/actions
const { user, login, items, addItem } = useStore();`})}),(0,r.jsx)(x,{level:5,children:"6. Selectors for Performance"}),(0,r.jsx)(g,{children:(0,r.jsx)(p,{code:!0,children:`// Bad: Component re-renders on any state change
const { count, user, todos } = useStore();

// Good: Single selector - only re-renders when count changes
const count = useStore((state) => state.count);

// Best: Multiple values with useShallow hook (Zustand v4+)
// Re-renders only when count or increment changes (shallow compares the object)
import { useShallow } from 'zustand/react/shallow';

const { count, increment } = useStore(
  useShallow((state) => ({
    count: state.count,
    increment: state.increment
  }))
);

// Without useShallow, selecting multiple values would re-render on every state change
// because it returns a new object reference each time
// useShallow performs a shallow equality check on the returned object`})})]})]})}}}]);