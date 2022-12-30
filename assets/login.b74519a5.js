import{c as e,A as a,d as r,r as s,b as t,e as o,o as n,f as l,g as c,w as i,a as u,L as m,B as p,h as d,i as f,j as b,p as v,k as g,_ as y}from"./index.70334207.js";import{A as h,F as j}from"./Form.f3023c1e.js";import{I as w}from"./Input.7c132771.js";import{C as _}from"./Checkbox.bbedcbc0.js";import"./Col.bfbeb36b.js";import"./useFlexGapSupport.229a03b0.js";import"./toArray.834367be.js";import"./FormItemContext.90f1956e.js";import"./antInputDirective.8e6978aa.js";import"./Checkbox.45a313ab.js";const x={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"};function O(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?Object(arguments[a]):{},s=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),s.forEach((function(a){k(e,a,r[a])}))}return e}function k(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}var C=function(r,s){var t=O({},r,s.attrs);return e(a,O({},t,{icon:x}),null)};C.displayName="UserOutlined",C.inheritAttrs=!1;const S=C,P=e=>(v("data-v-caf42ec0"),e=e(),g(),e),A={class:"login-wrapper"},F={class:"login-box"},I=P((()=>c("div",{class:"login-box-title"},[c("img",{src:"/assets/logo2.191e97e2.png",alt:"icon"}),c("p",null,"账 号 登 录")],-1))),U=f("记住我"),q=P((()=>c("a",{class:"fr",href:""},"忘记密码？",-1))),z=f("登 录"),B=y(r({__name:"login",setup(a){const r=s({username:"admin",password:"123456",remember:!0}),f=t(!1),v=t(),g=o();function y(){return e=this,a=null,r=function*(){const e=u(v),a=yield null==e?void 0:e.validate();if(a)try{f.value=!0,(yield g.login({username:a.username,password:a.password}))&&b.success("登陆成功！")}catch(r){b.error(r.message)}finally{f.value=!1}},new Promise(((s,t)=>{var o=e=>{try{l(r.next(e))}catch(a){t(a)}},n=e=>{try{l(r.throw(e))}catch(a){t(a)}},l=e=>e.done?s(e.value):Promise.resolve(e.value).then(o,n);l((r=r.apply(e,a)).next())}));var e,a,r}return(a,s)=>(n(),l("div",A,[c("div",F,[I,e(u(j),{ref_key:"loginFormRef",ref:v,model:r,class:"login-box-form",onKeypress:d(y,["enter"])},{default:i((()=>[e(u(h),{name:"username",rules:[{required:!0,message:"请输入账号"}]},{default:i((()=>[e(u(w),{value:r.username,"onUpdate:value":s[0]||(s[0]=e=>r.username=e),placeholder:"请输入账号"},{prefix:i((()=>[e(u(S),{style:{color:"rgba(0, 0, 0, 0.25)"}})])),_:1},8,["value"])])),_:1}),e(u(h),{name:"password",rules:[{required:!0,message:"请输入密码"}]},{default:i((()=>[e(u(w),{value:r.password,"onUpdate:value":s[1]||(s[1]=e=>r.password=e),type:"password",placeholder:"请输入密码"},{prefix:i((()=>[e(u(m),{style:{color:"rgba(0, 0, 0, 0.25)"}})])),_:1},8,["value"])])),_:1}),e(u(h),null,{default:i((()=>[e(u(h),{name:"remember","no-style":""},{default:i((()=>[e(u(_),{checked:r.remember,"onUpdate:checked":s[2]||(s[2]=e=>r.remember=e)},{default:i((()=>[U])),_:1},8,["checked"])])),_:1}),q])),_:1}),e(u(h),null,{default:i((()=>[e(u(p),{type:"primary","html-type":"submit",class:"login-btn",loading:f.value,onClick:y},{default:i((()=>[z])),_:1},8,["loading"])])),_:1})])),_:1},8,["model","onKeypress"])])]))}}),[["__scopeId","data-v-caf42ec0"]]);export{B as default};
