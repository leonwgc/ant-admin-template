"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["3767"],{92377(e,l,s){s.r(l)},81738(e,l,s){s.r(l),s.d(l,{default:()=>j});var n=s(74848),r=s(96540),t=s(10246),d=s(12229),i=s(16629),a=s(99373),o=s(58607),c=s(36813);s(92377);var m=s(38258);let{Title:h,Paragraph:u,Text:x}=d.A,j=()=>{let[e,l]=(0,r.useState)([{id:1,name:"Item 1",color:"blue"},{id:2,name:"Item 2",color:"green"},{id:3,name:"Item 3",color:"red"},{id:4,name:"Item 4",color:"orange"},{id:5,name:"Item 5",color:"purple"}]),s=(0,m.A)(e),d=(0,r.useRef)(null),[j,g]=(0,r.useState)([{id:11,name:"Task A1"},{id:12,name:"Task A2"},{id:13,name:"Task A3"}]),[p,_]=(0,r.useState)([{id:21,name:"Task B1"},{id:22,name:"Task B2"},{id:23,name:"Task B3"}]),[b,f]=(0,r.useState)([{id:31,name:"Drag me by handle",color:"cyan"},{id:32,name:"Drag me by handle",color:"magenta"},{id:33,name:"Drag me by handle",color:"gold"}]),[v]=(0,r.useState)([{id:41,name:"Clone Item 1"},{id:42,name:"Clone Item 2"},{id:43,name:"Clone Item 3"}]),[y,A]=(0,r.useState)([]),C=(0,r.useRef)(null),N=(0,r.useRef)(null),S=(0,r.useRef)(null),w=(0,r.useRef)(null),I=(0,r.useRef)(null),E=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(C.current){let e=d.current=t.Ay.create(C.current,{animation:150,ghostClass:"sortable-demo__ghost",dataIdAttr:"data-id",onEnd:function(){let n=e.toArray();l(s.current.sort((e,l)=>n.indexOf(String(e.id))-n.indexOf(String(l.id))))}});return()=>{e.destroy()}}},[s]),(0,r.useEffect)(()=>{N.current&&S.current&&(t.Ay.create(N.current,{group:"shared",animation:150,ghostClass:"sortable-demo__ghost",onEnd:()=>{}}),t.Ay.create(S.current,{group:"shared",animation:150,ghostClass:"sortable-demo__ghost",onEnd:()=>{}}))},[]),(0,r.useEffect)(()=>{w.current&&t.Ay.create(w.current,{handle:".sortable-demo__handle",animation:150,ghostClass:"sortable-demo__ghost",onEnd:e=>{f(l=>{let s=[...l],[n]=s.splice(e.oldIndex,1);return s.splice(e.newIndex,0,n),s})}})},[]),(0,r.useEffect)(()=>{I.current&&E.current&&(t.Ay.create(I.current,{group:{name:"clone",pull:"clone",put:!1},animation:150,sort:!1}),t.Ay.create(E.current,{group:"clone",animation:150,ghostClass:"sortable-demo__ghost",onAdd:e=>{let l=e.item.textContent||"",s={id:Date.now(),name:l};A(l=>{let n=[...l];return n.splice(e.newIndex,0,s),n}),e.item.remove()},onUpdate:e=>{A(l=>{let s=[...l],[n]=s.splice(e.oldIndex,1);return s.splice(e.newIndex,0,n),s})}}))},[y]),(0,n.jsxs)("div",{className:"sortable-demo",children:[(0,n.jsx)(h,{level:2,children:"Sortable.js - Drag & Drop Library"}),(0,n.jsx)(u,{children:"Sortable is a JavaScript library for reorderable drag-and-drop lists."}),(0,n.jsxs)(i.A,{title:"1. Basic Drag & Drop",className:"sortable-demo__card",children:[(0,n.jsxs)(u,{children:[(0,n.jsx)(x,{strong:!0,children:"Features:"})," Simple drag and drop reordering"]}),(0,n.jsx)("div",{className:"sortable-demo__list",ref:C,children:e.map(e=>(0,n.jsx)("div",{className:"sortable-demo__item","data-id":e.id,children:(0,n.jsx)(a.A,{children:e.name})},e.id))}),(0,n.jsx)(o.Ay,{onClick:()=>{l([{id:1,name:"Item 1",color:"blue"},{id:2,name:"Item 2",color:"green"},{id:3,name:"Item 3",color:"red"},{id:4,name:"Item 4",color:"orange"},{id:5,name:"Item 5",color:"purple"}]),d.current&&d.current.sort(["1","2","3","4","5"],!0)},style:{marginTop:16},children:"Reset Order"}),(0,n.jsx)(u,{style:{marginTop:16},children:(0,n.jsx)(x,{code:!0,children:`Sortable.create(element, {
  animation: 150,
  onEnd: (evt) => {
    // Update state based on new order
  }
});`})})]}),(0,n.jsxs)(i.A,{title:"2. Multiple Lists with Shared Group",className:"sortable-demo__card",children:[(0,n.jsxs)(u,{children:[(0,n.jsx)(x,{strong:!0,children:"Features:"})," Drag items between multiple lists"]}),(0,n.jsxs)("div",{className:"sortable-demo__multiple",children:[(0,n.jsxs)("div",{className:"sortable-demo__column",children:[(0,n.jsxs)(x,{strong:!0,children:["List A (",j.length,")"]}),(0,n.jsx)("div",{className:"sortable-demo__list",ref:N,children:j.map(e=>(0,n.jsx)("div",{className:"sortable-demo__item","data-id":e.id,children:e.name},e.id))})]}),(0,n.jsxs)("div",{className:"sortable-demo__column",children:[(0,n.jsxs)(x,{strong:!0,children:["List B (",p.length,")"]}),(0,n.jsx)("div",{className:"sortable-demo__list",ref:S,children:p.map(e=>(0,n.jsx)("div",{className:"sortable-demo__item","data-id":e.id,children:e.name},e.id))})]})]}),(0,n.jsx)(u,{style:{marginTop:16},children:(0,n.jsx)(x,{code:!0,children:`Sortable.create(element, {
  group: 'shared',
  animation: 150,
  onEnd: () => {
    // Sync state with DOM
  }
});`})})]}),(0,n.jsxs)(i.A,{title:"3. Drag Handle",className:"sortable-demo__card",children:[(0,n.jsxs)(u,{children:[(0,n.jsx)(x,{strong:!0,children:"Features:"})," Drag only by specific handle element"]}),(0,n.jsx)("div",{className:"sortable-demo__list",ref:w,children:b.map(e=>(0,n.jsxs)("div",{className:"sortable-demo__item-with-handle","data-id":e.id,children:[(0,n.jsx)("span",{className:"sortable-demo__handle",children:"☰"}),(0,n.jsx)(a.A,{children:e.name})]},e.id))}),(0,n.jsx)(u,{style:{marginTop:16},children:(0,n.jsx)(x,{code:!0,children:`Sortable.create(element, {
  handle: '.handle-class',
  animation: 150
});`})})]}),(0,n.jsxs)(i.A,{title:"4. Clone Mode",className:"sortable-demo__card",children:[(0,n.jsxs)(u,{children:[(0,n.jsx)(x,{strong:!0,children:"Features:"})," Clone items from source to target list"]}),(0,n.jsxs)("div",{className:"sortable-demo__multiple",children:[(0,n.jsxs)("div",{className:"sortable-demo__column",children:[(0,n.jsx)(x,{strong:!0,children:"Source (Clone from here)"}),(0,n.jsx)("div",{className:"sortable-demo__list sortable-demo__source",ref:I,children:v.map(e=>(0,n.jsx)("div",{className:"sortable-demo__item","data-id":e.id,children:e.name},e.id))})]}),(0,n.jsxs)("div",{className:"sortable-demo__column",children:[(0,n.jsxs)(c.A,{children:[(0,n.jsxs)(x,{strong:!0,children:["Target (",y.length,")"]}),(0,n.jsx)(o.Ay,{size:"small",onClick:()=>{A([])},children:"Clear"})]}),(0,n.jsxs)("div",{className:"sortable-demo__list sortable-demo__target",ref:E,children:[y.map(e=>(0,n.jsx)("div",{className:"sortable-demo__item","data-id":e.id,children:e.name},e.id)),0===y.length&&(0,n.jsx)("div",{className:"sortable-demo__empty",children:"Drop items here"})]})]})]}),(0,n.jsx)(u,{style:{marginTop:16},children:(0,n.jsx)(x,{code:!0,children:`// Source: Clone only
Sortable.create(source, {
  group: {
    name: 'clone',
    pull: 'clone',
    put: false
  },
  sort: false
});

// Target: Accept clones
Sortable.create(target, {
  group: 'clone',
  onAdd: (evt) => {
    // Handle cloned item
  }
});`})})]}),(0,n.jsxs)(i.A,{title:"Advanced Features & Options",className:"sortable-demo__card",children:[(0,n.jsx)(h,{level:5,children:"Common Options:"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"animation"})," - Animation speed in milliseconds"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"handle"})," - Drag handle selector"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"group"})," - Group items between lists"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"ghostClass"})," - Class for dragged element"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"chosenClass"})," - Class for selected element"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"dragClass"})," - Class while dragging"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"disabled"})," - Disable sorting"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"filter"})," - Elements to exclude from dragging"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"delay"})," - Time in ms before dragging starts"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"delayOnTouchOnly"})," - Only delay on touch devices"]})]}),(0,n.jsx)(h,{level:5,style:{marginTop:16},children:"Events:"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onStart"})," - Dragging started"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onEnd"})," - Dragging ended"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onAdd"})," - Element added to list"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onUpdate"})," - Element order changed"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onRemove"})," - Element removed from list"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onSort"})," - Any change to the list"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onMove"})," - Called when moving an element"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(x,{code:!0,children:"onClone"})," - Called when cloning an element"]})]}),(0,n.jsx)(h,{level:5,style:{marginTop:16},children:"Group Options:"}),(0,n.jsx)(u,{children:(0,n.jsx)(x,{code:!0,children:`group: {
  name: 'shared',      // Group name
  pull: true,          // Allow dragging out
  put: true,           // Allow dropping in
  revertClone: false   // Revert cloned element
}

// Pull/Put options:
pull: true         // Allow all
pull: false        // Deny all
pull: 'clone'      // Clone instead of move
put: ['group1']    // Accept from specific groups`})})]}),(0,n.jsxs)(i.A,{title:"React Integration Best Practices",className:"sortable-demo__card",children:[(0,n.jsx)(h,{level:5,children:"1. Use useEffect for initialization:"}),(0,n.jsx)(u,{children:(0,n.jsx)(x,{code:!0,children:`useEffect(() => {
  const sortable = Sortable.create(elementRef.current, options);
  return () => sortable.destroy(); // Cleanup
}, [dependencies]);`})}),(0,n.jsx)(h,{level:5,children:"2. Sync state with DOM:"}),(0,n.jsx)(u,{children:(0,n.jsx)(x,{code:!0,children:`onEnd: (evt) => {
  const newList = [...items];
  const [moved] = newList.splice(evt.oldIndex, 1);
  newList.splice(evt.newIndex, 0, moved);
  setItems(newList);
}`})}),(0,n.jsx)(h,{level:5,children:"3. Use data attributes for identification:"}),(0,n.jsx)(u,{children:(0,n.jsx)(x,{code:!0,children:`<div data-id={item.id}>{item.name}</div>

// In event handler:
const id = evt.item.getAttribute('data-id');`})}),(0,n.jsx)(h,{level:5,children:"4. Prevent re-initialization:"}),(0,n.jsx)(u,{children:(0,n.jsx)(x,{code:!0,children:`const sortableRef = useRef(null);

useEffect(() => {
  if (!sortableRef.current) {
    sortableRef.current = Sortable.create(element, options);
  }
}, []); // Empty deps - init once`})})]})]})}}}]);