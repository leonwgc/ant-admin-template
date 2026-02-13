"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["6167"],{14756(e,n,s){s.r(n)},58881(e,n,s){s.r(n),s.d(n,{default:()=>g});var o=s(74848),t=s(96540),i=s(19341),r=s(17125),a=s(16629),d=s(36813),l=s(77121),c=s(90697),u=s(32104),m=s(76440),h=s(7259);s(14756);let p=e=>new Promise((n,s)=>{setTimeout(()=>{e.phone&&11===e.phone.length?n({success:!0}):s(Error("Please enter a valid phone number"))},1e3)}),g=()=>{let[e]=i.A.useForm(),[n,s]=t.useState(0),[g,{setTrue:x,setFalse:f}]=(0,u.A)(!1),[,j]=(0,m.A)({targetDate:n,onEnd:()=>{f()}}),{loading:C,run:b}=(0,h.A)(p,{manual:!0,onSuccess:()=>{r.Ay.success("Verification code sent successfully!"),x(),s(Date.now()+6e4)},onError:e=>{r.Ay.error(e.message)}}),F=async()=>{try{await e.validateFields(["phone"]);let n=e.getFieldValue("phone");b({phone:n})}catch(e){console.error("Validation failed:",e)}},{seconds:w}=j;return(0,o.jsxs)("div",{className:"verification-code-countdown",children:[(0,o.jsx)(a.A,{title:"Verification Code Countdown Example",className:"verification-code-countdown__card",children:(0,o.jsxs)(d.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h3",{children:"Feature Description"}),(0,o.jsx)("p",{children:"This example demonstrates:"}),(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:["Using ",(0,o.jsx)("code",{children:"useCountDown"})," for countdown timer"]}),(0,o.jsxs)("li",{children:["Using ",(0,o.jsx)("code",{children:"useRequest"})," for async API calls"]}),(0,o.jsxs)("li",{children:["Using ",(0,o.jsx)("code",{children:"useBoolean"})," for state management"]}),(0,o.jsx)("li",{children:"Button disabled during countdown"}),(0,o.jsx)("li",{children:"Automatic countdown after successful code sending"})]})]}),(0,o.jsxs)(i.A,{form:e,layout:"vertical",initialValues:{phone:""},children:[(0,o.jsx)(i.A.Item,{label:"Phone Number",name:"phone",validateFirst:!0,validateDebounce:1e3,rules:[{required:!0,message:"Please enter phone number"},{len:11,message:"Phone number must be 11 digits"},{pattern:/^\d{11}$/,message:"Please enter a valid phone number"}],children:(0,o.jsx)(l.A,{placeholder:"Enter 11-digit phone number",maxLength:11,size:"large",disabled:g})}),(0,o.jsx)(i.A.Item,{children:(0,o.jsx)(c.Ay,{type:"primary",size:"large",onClick:F,disabled:g,loading:C,block:!0,children:g?`Resend in ${w}s`:"Send Verification Code"})})]}),(0,o.jsxs)("div",{className:"verification-code-countdown__status",children:[(0,o.jsx)("h4",{children:"Status:"}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Counting:"})," ",g?"Yes":"No"]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Remaining Time:"})," ",w,"s"]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Loading:"})," ",C?"Yes":"No"]})]})]})}),(0,o.jsx)(a.A,{title:"Code Example",className:"verification-code-countdown__code",children:(0,o.jsx)("pre",{children:`import { Form } from 'antd';
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
};`})})]})}},29090(e,n,s){s.r(n),s.d(n,{FormFieldHook:()=>t.default,ReactHookForm:()=>i.default,VerificationCodeCountdown:()=>o.default});var o=s(58881),t=s(90704),i=s(70744)}}]);