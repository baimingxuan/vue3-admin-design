import{P as e}from"./PageWrapper.a7647f34.js";import{d as a,r as t,b as l,c as i,K as o,i as n,B as s,a as r,aI as d,j as u,bS as p}from"./index.70334207.js";import{u as m}from"./useExcel.710c468f.js";import{t as c}from"./data.3871d5e2.js";import{C as f}from"./Card.ee5d8653.js";import{A as x}from"./index.d04c01f2.js";import{F as b,A as j}from"./Form.f3023c1e.js";import{I as h}from"./Input.7c132771.js";import{A as v}from"./Group.a1edb011.js";import{S as y}from"./index.0a9297be.js";import{A as S}from"./index.452683f3.js";import"./Col.bfbeb36b.js";import"./useFlexGapSupport.229a03b0.js";import"./toArray.834367be.js";import"./FormItemContext.90f1956e.js";import"./antInputDirective.8e6978aa.js";import"./Checkbox.45a313ab.js";import"./List.906e773d.js";import"./CheckOutlined.85bc879d.js";import"./SearchOutlined.445baf93.js";import"./iconUtil.28adbeeb.js";import"./index.c288fc95.js";import"./Checkbox.bbedcbc0.js";import"./index.30685292.js";import"./index.cdd22bf6.js";import"./EyeOutlined.b925c9c3.js";import"./index.a67a0ec6.js";const g=a({name:"ExportExcel",setup(){const a=t({fileName:"",autoWidth:!0,fileType:"xlsx"}),{exportDataToExcel:g}=m(),I=l(c),k=[{title:"编号",dataIndex:"key",align:"center"},{title:"姓名",dataIndex:"name",align:"center"},{title:"性别",dataIndex:"sex",align:"center"},{title:"手机",dataIndex:"phone",align:"center"},{title:"学历",dataIndex:"education",align:"center"},{title:"爱好",dataIndex:"hobby",align:"center"}],C=l([]),T=l([]);function W(e){C.value=e}function A(e,a,t){T.value=t}function E(e,a){T.value=a}function N(){d(p)}function w(){if(!r(T).length)return void u.warning("请勾选要导出的数据项！");const e={data:r(T),header:["编号","姓名","性别","手机","学历","爱好"],key:["key","name","sex","phone","education","hobby"],fileName:a.fileName,autoWidth:a.autoWidth,bookType:a.fileType};g(e),C.value=[],T.value=[]}return()=>i(e,{name:"JS-xlsx插件"},{header:()=>i(o,null,[i("p",null,[n("JS-xlsx: 由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库, 功能强大, 支持xlsx、csv、txt等格式。")]),i("p",null,[n("组件地址:"),i(s,{type:"link",onClick:N},{default:()=>[n("立即访问")]})])]),default:()=>i(f,{bordered:!1},{default:()=>[i(x,{direction:"vertical",size:16,style:{width:"100%"}},{default:()=>[i(b,{model:a,layout:"inline"},{default:()=>[i(j,{label:"文件名:",name:"fileName"},{default:()=>[i(h,{value:a.fileName,"onUpdate:value":e=>a.fileName=e,placeholder:"文件名"},null)]}),i(j,{label:"自动宽度:",name:"autoWidth"},{default:()=>[i(v,{value:a.autoWidth,"onUpdate:value":e=>a.autoWidth=e,options:[{label:"自动",value:!0},{label:"固定",value:!1}]},null)]}),i(j,{label:"文件类型:",name:"fileType"},{default:()=>[i(y,{value:a.fileType,"onUpdate:value":e=>a.fileType=e,options:[{label:"xlsx",value:"xlsx"},{label:"csv",value:"csv"},{label:"txt",value:"txt"}],style:{width:"180px"}},null)]}),i(j,null,{default:()=>[i(s,{type:"primary",htmlType:"submit",onClick:w},{default:()=>[n("导出Excel")]})]})]}),i(S,{dataSource:r(I),columns:k,rowSelection:{selectedRowKeys:r(C),onChange:W,onSelect:A,onSelectAll:E},pagination:!1},null)]})]})})}});export{g as default};
