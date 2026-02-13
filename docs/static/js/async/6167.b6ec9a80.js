"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["6167"],{14756(e,n,o){o.r(n)},76440(e,n,o){o.d(n,{A:()=>u});var t=o(31635),s=o(74353),r=o.n(s),i=o(96540),a=o(38258),l=o(65523),d=function(e){if(!e)return 0;var n=r()(e).valueOf()-Date.now();return n<0?0:n};let u=function(e){void 0===e&&(e={});var n=e||{},o=n.leftTime,s=n.targetDate,r=n.interval,u=void 0===r?1e3:r,c=n.onEnd,m=(0,i.useMemo)(function(){return(0,l.Et)(o)&&o>0?Date.now()+o:void 0},[o]),h="leftTime"in e?m:s,f=(0,t.zs)((0,i.useState)(function(){return d(h)}),2),g=f[0],p=f[1],v=(0,a.A)(c);(0,i.useEffect)(function(){if(!h)return void p(0);p(d(h));var e=setInterval(function(){var n,o=d(h);p(o),0===o&&(clearInterval(e),null==(n=v.current)||n.call(v))},u);return function(){return clearInterval(e)}},[h,u]);var x=(0,i.useMemo)(function(){return{days:Math.floor(g/864e5),hours:Math.floor(g/36e5)%24,minutes:Math.floor(g/6e4)%60,seconds:Math.floor(g/1e3)%60,milliseconds:Math.floor(g)%1e3}},[g]);return[g,x]}},58881(e,n,o){o.r(n),o.d(n,{default:()=>g});var t=o(74848),s=o(96540),r=o(19341),i=o(17125),a=o(16629),l=o(36813),d=o(77121),u=o(90697),c=o(32104),m=o(76440),h=o(7259);o(14756);let f=e=>new Promise((n,o)=>{setTimeout(()=>{e.phone&&11===e.phone.length?n({success:!0}):o(Error("Please enter a valid phone number"))},1e3)}),g=()=>{let[e]=r.A.useForm(),[n,o]=s.useState(0),[g,{setTrue:p,setFalse:v}]=(0,c.A)(!1),[,x]=(0,m.A)({targetDate:n,onEnd:()=>{v()}}),{loading:j,run:w}=(0,h.A)(f,{manual:!0,onSuccess:()=>{i.Ay.success("Verification code sent successfully!"),p(),o(Date.now()+6e4)},onError:e=>{i.Ay.error(e.message)}}),C=async()=>{try{await e.validateFields(["phone"]);let n=e.getFieldValue("phone");w({phone:n})}catch(e){console.error("Validation failed:",e)}},{seconds:b}=x;return(0,t.jsxs)("div",{className:"verification-code-countdown",children:[(0,t.jsx)(a.A,{title:"Verification Code Countdown Example",className:"verification-code-countdown__card",children:(0,t.jsxs)(l.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{children:"Feature Description"}),(0,t.jsx)("p",{children:"This example demonstrates:"}),(0,t.jsxs)("ul",{children:[(0,t.jsxs)("li",{children:["Using ",(0,t.jsx)("code",{children:"useCountDown"})," for countdown timer"]}),(0,t.jsxs)("li",{children:["Using ",(0,t.jsx)("code",{children:"useRequest"})," for async API calls"]}),(0,t.jsxs)("li",{children:["Using ",(0,t.jsx)("code",{children:"useBoolean"})," for state management"]}),(0,t.jsx)("li",{children:"Button disabled during countdown"}),(0,t.jsx)("li",{children:"Automatic countdown after successful code sending"})]})]}),(0,t.jsxs)(r.A,{form:e,layout:"vertical",initialValues:{phone:""},children:[(0,t.jsx)(r.A.Item,{label:"Phone Number",name:"phone",validateFirst:!0,validateDebounce:1e3,rules:[{required:!0,message:"Please enter phone number"},{len:11,message:"Phone number must be 11 digits"},{pattern:/^\d{11}$/,message:"Please enter a valid phone number"}],children:(0,t.jsx)(d.A,{placeholder:"Enter 11-digit phone number",maxLength:11,size:"large",disabled:g})}),(0,t.jsx)(r.A.Item,{children:(0,t.jsx)(u.Ay,{type:"primary",size:"large",onClick:C,disabled:g,loading:j,block:!0,children:g?`Resend in ${b}s`:"Send Verification Code"})})]}),(0,t.jsxs)("div",{className:"verification-code-countdown__status",children:[(0,t.jsx)("h4",{children:"Status:"}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Counting:"})," ",g?"Yes":"No"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Remaining Time:"})," ",b,"s"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Loading:"})," ",j?"Yes":"No"]})]})]})}),(0,t.jsx)(a.A,{title:"Code Example",className:"verification-code-countdown__code",children:(0,t.jsx)("pre",{children:`import { Form } from 'antd';
import { useCountDown, useRequest, useBoolean } from 'ahooks';

const Component = () => {
  const [form] = Form.useForm();
  const [isCounting, { setTrue, setFalse }] = useBoolean(false);

  const [countdown, formattedRes] = useCountDown({
    targetDate: 0,
    onEnd: () => setFalse(),
  });

  const { loading, run } = useRequest(sendCodeAPI, {
    manual: true,
    onSuccess: () => {
      setTrue();
      setTargetDate(Date.now() + 60000);
    },
  });

  const handleSendCode = async () => {
    await form.validateFields(['phone']);
    const phone = form.getFieldValue('phone');
    run({ phone });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          { required: true, message: 'Please enter phone number' },
          { len: 11, message: 'Must be 11 digits' },
          { pattern: /^\\d{11}$/, message: 'Invalid phone number' }
        ]}
      >
        <Input disabled={isCounting} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleSendCode}
          disabled={isCounting}
          loading={loading}
        >
          {isCounting ? \`Resend in \${formattedRes.seconds}s\` : 'Send Code'}
        </Button>
      </Form.Item>
    </Form>
  );
};`})})]})}},29090(e,n,o){o.r(n),o.d(n,{FormFieldHook:()=>s.default,ReactHookForm:()=>r.default,VerificationCodeCountdown:()=>t.default});var t=o(58881),s=o(38740),r=o(70744)}}]);