import{aL as a,d as e,O as n,l as t,b as l,P as r,I as i,J as o,z as u,q as c,a2 as s,c as v,K as p,a4 as d,a3 as f}from"./index.48f34480.js";import{u as m}from"./useFlexGapSupport.0ed8aa8a.js";var g={small:8,middle:16,large:24};const x=a(e({name:"ASpace",props:{prefixCls:String,size:{type:[String,Number,Array]},direction:d.oneOf(f("horizontal","vertical")).def("horizontal"),align:d.oneOf(f("start","end","center","baseline")),wrap:{type:Boolean,default:void 0}},slots:["split"],setup:function(a,e){var d=e.slots,f=n("space",a),x=f.prefixCls,y=f.space,z=f.direction,h=m(),w=t((function(){var e,n,t;return null!==(t=null!==(e=a.size)&&void 0!==e?e:null===(n=y.value)||void 0===n?void 0:n.size)&&void 0!==t?t:"small"})),A=l(),B=l();r(w,(function(){var a=(Array.isArray(w.value)?w.value:[w.value,w.value]).map((function(a){return function(a){return"string"==typeof a?g[a]:a||0}(a)})),e=i(a,2);A.value=e[0],B.value=e[1]}),{immediate:!0});var S=t((function(){return void 0===a.align&&"horizontal"===a.direction?"center":a.align})),b=t((function(){var e;return o(x.value,"".concat(x.value,"-").concat(a.direction),(u(e={},"".concat(x.value,"-rtl"),"rtl"===z.value),u(e,"".concat(x.value,"-align-").concat(S.value),S.value),e))})),G=t((function(){return"rtl"===z.value?"marginLeft":"marginRight"})),O=t((function(){var e={};return h.value&&(e.columnGap="".concat(A.value,"px"),e.rowGap="".concat(B.value,"px")),c(c({},e),a.wrap&&{flexWrap:"wrap",marginBottom:"".concat(-B.value,"px")})}));return function(){var e,n,t=a.wrap,l=a.direction,r=void 0===l?"horizontal":l,i=s(null===(e=d.default)||void 0===e?void 0:e.call(d)),o=i.length;if(0===o)return null;var f=null===(n=d.split)||void 0===n?void 0:n.call(d),m="".concat(x.value,"-item"),g=A.value,y=o-1;return v("div",{class:b.value,style:O.value},[i.map((function(a,e){var n={};return h.value||("vertical"===r?e<y&&(n={marginBottom:"".concat(g/(f?2:1),"px")}):n=c(c({},e<y&&u({},G.value,"".concat(g/(f?2:1),"px"))),t&&{paddingBottom:"".concat(B.value,"px")})),v(p,null,[v("div",{class:m,style:n},[a]),e<y&&f&&v("span",{class:"".concat(m,"-split"),style:n},[f])])}))])}}}));export{x as A};
