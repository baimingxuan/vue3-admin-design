import{d as e,u as r,a as t}from"./index.70334207.js";const a=e({__name:"redirect",setup(e){const{currentRoute:a,replace:p}=r(),{params:s,query:c}=t(a),{path:n,redirect_type:o="path"}=s;Reflect.deleteProperty(s,"path"),Reflect.deleteProperty(s,"redirect_type");const u=Array.isArray(n)?n.join("/"):n;return p("name"===o?{name:u,params:s,query:c}:{path:u.startsWith("/")?u:"/"+u,query:c}),()=>{}}});export{a as default};
