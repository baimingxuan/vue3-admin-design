import{d as e,r as t,cr as i,l as a,P as n,at as l,c as o,K as d,i as r,B as s,a as h,aK as u,aI as m,cs as p}from"./index.70334207.js";import{P as c}from"./PageWrapper.a7647f34.js";import{U as g}from"./UploadImage.8ab86999.js";import{A as f,a as w,C as b}from"./Card.ee5d8653.js";import{F as y,A as v}from"./Form.f3023c1e.js";import{A as x}from"./index.dc8fbafd.js";import{S as j}from"./index.0a9297be.js";import"./index.e8ec2f1a.js";import"./EyeOutlined.b925c9c3.js";import"./DeleteOutlined.4a2ca319.js";import"./CheckOutlined.85bc879d.js";import"./index.893a1d45.js";import"./FormItemContext.90f1956e.js";import"./Col.bfbeb36b.js";import"./useFlexGapSupport.229a03b0.js";import"./toArray.834367be.js";import"./antInputDirective.8e6978aa.js";import"./List.906e773d.js";import"./SearchOutlined.445baf93.js";function C(e,t,i,a){!function(e,t,i,a){const n=new Blob(void 0!==a?[a,e]:[e],{type:i||"application/octet-stream"}),l=window.URL.createObjectURL(n),o=document.createElement("a");o.style.display="none",o.href=l,o.setAttribute("download",t),void 0===o.download&&o.setAttribute("target","_blank");document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(l)}(function(e){const t=e.split(","),i=t[0].match(/:(.*?);/)[1],a=window.atob(t[1]);let n=a.length;const l=new Uint8Array(n);for(;n--;)l[n]=a.charCodeAt(n);return new Blob([l],{type:i})}(e),t,i,a)}const S=(()=>{const e=[];for(let t=10;t>4;t--)e.push({label:10*t,value:t/10});return e})(),U=e({name:"ImageCompress",setup(){const e=t({width:1920,height:1080,src:i}),U=t({width:0,height:0,imgSrc:""}),k=t({width:0,height:0,ratio:100,mineType:"image/png",quality:1}),I=a((()=>({position:"relative",width:U.width+"px",height:U.height+"px",backgroundImage:"url('"+U.imgSrc+"')",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}))),A=a((()=>e.width/e.height));function P(){m(p)}function q(t,i){"h"===t?k.height=Number(Math.round(i/h(A)).toFixed(0)):"w"===t&&(k.width=Number(Math.round(i*h(A)).toFixed(0))),k.ratio=Number((k.width/e.width*100).toFixed(2))}function F(e,t){const[i,a]=[850,550],{width:n,height:l}=function(e,t,i,a){let[n,l,o]=[0,0,0];if(e>t)if(e>=i){const d=t*(i/e);d>=i?(n=e*(a/t),l=a,o=t/a):(n=i,l=d,o=e/i)}else n=e,l=t,o=1;else t>=a?(n=e*(a/t),l=a,o=t/a):(n=e,l=t,o=1);return{width:n,height:l,ratio:o}}(e,t,i,a);U.width=n,U.height=l}function O(t){e.src=t;const i=new Image;i.src=t,i.onload=()=>{e.width=i.width,e.height=i.height}}function R(){const t={width:k.width,height:k.height,mineType:k.mineType,quality:k.quality};var i,a;(i=e.src,a=t,new Promise(((e,t)=>{let n=document.createElement("CANVAS");const l=n.getContext("2d"),{width:o,height:d,quality:r,mineType:s}=a,h=new Image;h.crossOrigin="",h.src=i,h.onload=function(){if(!n||!l)return t();n.width=o,n.height=d,l.fillRect(0,0,o,d),l.drawImage(h,0,0,o,d);const i=n.toDataURL(s||"image/png",r||1);n=null,e(i)}}))).then((e=>{C(e,k.mineType.replace(/\//,"."))}))}return n((()=>e),(e=>{F(e.width,e.height),U.imgSrc=e.src,k.width=e.width,k.height=e.height,k.ratio=100,k.quality=1}),{deep:!0}),l((()=>{F(e.width,e.height),U.imgSrc=e.src,k.width=e.width,k.height=e.height})),()=>o(c,{name:"Image 图片压缩"},{header:()=>o(d,null,[o("p",null,[r("ImageCompress: 纯JS实现对图片的等比压缩和放大的功能, 并能对图片进行下载。")]),o("p",null,[r("github源码:"),o(s,{type:"link",onClick:P},{default:()=>[r("立即访问")]})])]),default:()=>o(f,{gutter:12},{default:()=>[o(w,{span:16},{default:()=>[o(b,{title:"图片区域",bordered:!1},{default:()=>[o("div",{class:"flex-center",style:"height: 550px; overflow: hidden"},[o("div",{style:h(I)},null)])]})]}),o(w,{span:8},{default:()=>[o(b,{title:"设置区域",bordered:!1},{default:()=>[o("div",{class:"flex-center",style:"height: 550px"},[o(y,{style:"width: 280px"},{default:()=>[o(v,{label:"上传图片: "},{default:()=>[o(g,{onSuccess:O},null)]}),o(v,{label:"图片尺寸: "},{default:()=>[o("div",null,[o(x,{value:k.width,"onUpdate:value":e=>k.width=e,min:0,max:1e4,onChange:q.bind(null,"h"),onStep:q.bind(null,"h")},null),o(u,{name:"linking",size:20,style:"margin: 0 4px"},null),o(x,{value:k.height,"onUpdate:value":e=>k.height=e,min:0,max:1e4,onChange:q.bind(null,"w"),onStep:q.bind(null,"w")},null)])]}),o(v,{label:"压缩比例: "},{default:()=>[o(x,{value:k.ratio,"onUpdate:value":e=>k.ratio=e,min:0,max:100,disabled:!0,formatter:e=>`${e}%`,parser:e=>e.replace("%",""),style:"width: 100%"},null)]}),o(v,{label:"图片类型: "},{default:()=>[o(j,{value:k.mineType,"onUpdate:value":e=>k.mineType=e,options:[{label:"PNG",value:"image/png"},{label:"JPG",value:"image/jpg"},{label:"BMP",value:"image/bmp"}]},null)]}),o(v,{label:"图片质量: "},{default:()=>[o(j,{value:k.quality,"onUpdate:value":e=>k.quality=e,options:S},null)]}),o(v,null,{default:()=>[o(s,{type:"primary",style:"width: 100%",onClick:R},{default:()=>[r("压缩图片")]})]})]})])]})]})]})})}});export{U as default};
