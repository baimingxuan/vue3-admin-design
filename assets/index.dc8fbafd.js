import{c as e,A as t,bQ as n,bR as a,d as r,b as i,a1 as u,bK as o,J as l,z as s,N as c,$ as v,bi as f,q as d,s as p,l as g,I as m,P as b,b9 as y,O as h,bc as S,ar as N,as as w,a4 as x}from"./index.70334207.js";import{a as E}from"./FormItemContext.90f1956e.js";const I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"}}]},name:"up",theme:"outlined"};function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){k(e,t,n[t])}))}return e}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var M=function(n,a){var r=O({},n,a.attrs);return e(t,O({},r,{icon:I}),null)};M.displayName="UpOutlined",M.inheritAttrs=!1;const B=M;function A(){return"function"==typeof BigInt}function F(e){var t=e.trim(),n=t.startsWith("-");n&&(t=t.slice(1)),(t=t.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,"")).startsWith(".")&&(t="0".concat(t));var a=t||"0",r=a.split("."),i=r[0]||"0",u=r[1]||"0";"0"===i&&"0"===u&&(n=!1);var o=n?"-":"";return{negative:n,negativeStr:o,trimStr:a,integerStr:i,decimalStr:u,fullStr:"".concat(o).concat(a)}}function T(e){var t=String(e);return!Number.isNaN(Number(t))&&t.includes("e")}function _(e){var t=String(e);if(T(e)){var n=Number(t.slice(t.indexOf("e-")+2)),a=t.match(/\.(\d+)/);return(null==a?void 0:a[1])&&(n+=a[1].length),n}return t.includes(".")&&D(t)?t.length-t.indexOf(".")-1:0}function C(e){var t=String(e);if(T(e)){if(e>Number.MAX_SAFE_INTEGER)return String(A()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(A()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);t=e.toFixed(_(t))}return F(t).fullStr}function D(e){return"number"==typeof e?!Number.isNaN(e):!!e&&(/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e))}var P=function(){function e(t){a(this,e),this.origin="",(t||0===t)&&String(t).trim()?(this.origin=String(t),this.number=Number(t)):this.empty=!0}return n(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var n=Number(t);if(Number.isNaN(n))return this;var a=this.number+n;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var r=Math.max(_(this.number),_(n));return new e(a.toFixed(r))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(e){return this.toNumber()===(null==e?void 0:e.toNumber())}},{key:"lessEquals",value:function(e){return this.add(e.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?this.isInvalidate()?"":C(this.number):this.origin}}]),e}(),j=function(){function e(t){if(a(this,e),this.origin="",(t||0===t)&&String(t).trim())if(this.origin=String(t),"-"!==t){var n=t;if(T(n)&&(n=Number(n)),D(n="string"==typeof n?n:C(n))){var r=F(n);this.negative=r.negative;var i=r.trimStr.split(".");this.integer=BigInt(i[0]);var u=i[1]||"0";this.decimal=BigInt(u),this.decimalLen=u.length}else this.nan=!0}else this.nan=!0;else this.empty=!0}return n(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(e){var t="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(e,"0"));return BigInt(t)}},{key:"negate",value:function(){var t=new e(this.toString());return t.negative=!t.negative,t}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var n=new e(t);if(n.isInvalidate())return this;var a=Math.max(this.getDecimalStr().length,n.getDecimalStr().length),r=F((this.alignDecimal(a)+n.alignDecimal(a)).toString()),i=r.negativeStr,u=r.trimStr,o="".concat(i).concat(u.padStart(a+1,"0"));return new e("".concat(o.slice(0,-a),".").concat(o.slice(-a)))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(e){return this.toString()===(null==e?void 0:e.toString())}},{key:"lessEquals",value:function(e){return this.add(e.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?this.isInvalidate()?"":F("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}();function q(e){return A()?new j(e):new P(e)}function R(e,t,n){if(""===e)return"";var a=F(e),r=a.negativeStr,i=a.integerStr,u=a.decimalStr,o="".concat(t).concat(u),l="".concat(r).concat(i);if(n>=0){var s=Number(u[n]);return s>=5?R(q(e).add("".concat(r,"0.").concat("0".repeat(n)).concat(10-s)).toString(),t,n):0===n?l:"".concat(l).concat(t).concat(u.padEnd(n,"0").slice(0,n))}return".0"===o?l:"".concat(l).concat(o)}const z=r({name:"StepHandler",inheritAttrs:!1,props:{prefixCls:String,upDisabled:Boolean,downDisabled:Boolean,onStep:{type:Function}},slots:["upNode","downNode"],setup:function(t,n){var a=n.slots,r=n.emit,v=i(),f=function(e,t){e.preventDefault(),r("step",t),v.value=setTimeout((function e(){r("step",t),v.value=setTimeout(e,200)}),600)},d=function(){clearTimeout(v.value)};return u((function(){d()})),function(){if(o())return null;var n=t.prefixCls,r=t.upDisabled,i=t.downDisabled,u="".concat(n,"-handler"),v=l(u,"".concat(u,"-up"),s({},"".concat(u,"-up-disabled"),r)),p=l(u,"".concat(u,"-down"),s({},"".concat(u,"-down-disabled"),i)),g={unselectable:"on",role:"button",onMouseup:d,onMouseleave:d},m=a.upNode,b=a.downNode;return e("div",{class:"".concat(u,"-wrap")},[e("span",c(c({},g),{},{onMousedown:function(e){f(e,!0)},"aria-label":"Increase Value","aria-disabled":r,class:v}),[(null==m?void 0:m())||e("span",{unselectable:"on",class:"".concat(n,"-handler-up-inner")},null)]),e("span",c(c({},g),{},{onMousedown:function(e){f(e,!1)},"aria-label":"Decrease Value","aria-disabled":i,class:p}),[(null==b?void 0:b())||e("span",{unselectable:"on",class:"".concat(n,"-handler-down-inner")},null)])])}}});var G=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},H=function(e,t){return e||t.isEmpty()?t.toString():t.toNumber()},V=function(e){var t=q(e);return t.isInvalidate()?null:t},$=function(){return{stringMode:{type:Boolean},defaultValue:{type:[String,Number]},value:{type:[String,Number]},prefixCls:{type:String},min:{type:[String,Number]},max:{type:[String,Number]},step:{type:[String,Number],default:1},tabindex:{type:Number},controls:{type:Boolean,default:!0},readonly:{type:Boolean},disabled:{type:Boolean},autofocus:{type:Boolean},keyboard:{type:Boolean,default:!0},parser:{type:Function},formatter:{type:Function},precision:{type:Number},decimalSeparator:{type:String},onInput:{type:Function},onChange:{type:Function},onPressEnter:{type:Function},onStep:{type:Function},onBlur:{type:Function},onFocus:{type:Function}}};const L=r({name:"InnerInputNumber",inheritAttrs:!1,props:d(d({},$()),{lazy:Boolean}),slots:["upHandler","downHandler"],setup:function(t,n){var a=n.attrs,r=n.slots,o=n.emit,h=n.expose,S=i(),N=i(!1),w=i(!1),x=i(!1),E=i(q(t.value));var I,O=function(e,n){if(!n)return t.precision>=0?t.precision:Math.max(_(e),_(t.step))},k=function(e){var n=String(e);if(t.parser)return t.parser(n);var a=n;return t.decimalSeparator&&(a=a.replace(t.decimalSeparator,".")),a.replace(/[^\w.-]+/g,"")},M=i(""),B=function(e,n){if(t.formatter)return t.formatter(e,{userTyping:n,input:String(M.value)});var a="number"==typeof e?C(e):e;if(!n){var r=O(a,n);if(D(a)&&(t.decimalSeparator||r>=0))a=R(a,t.decimalSeparator||".",r)}return a},A=(I=t.value,E.value.isInvalidate()&&["string","number"].includes(p(I))?Number.isNaN(I)?"":I:B(E.value.toString(),!1));function F(e,t){M.value=B(e.isInvalidate()?e.toString(!1):e.toString(!t),t)}M.value=A;var T,P,j=g((function(){return V(t.max)})),$=g((function(){return V(t.min)})),L=g((function(){return!(!j.value||!E.value||E.value.isInvalidate())&&j.value.lessEquals(E.value)})),W=g((function(){return!(!$.value||!E.value||E.value.isInvalidate())&&E.value.lessEquals($.value)})),U=function(e,t){var n=i(null);return[function(){try{var t=e.value,a=t.selectionStart,r=t.selectionEnd,i=t.value,u=i.substring(0,a),o=i.substring(r);n.value={start:a,end:r,value:i,beforeTxt:u,afterTxt:o}}catch(l){}},function(){if(e.value&&n.value&&t.value)try{var a=e.value.value,r=n.value,i=r.beforeTxt,u=r.afterTxt,o=r.start,l=a.length;if(a.endsWith(u))l=a.length-n.value.afterTxt.length;else if(a.startsWith(i))l=i.length;else{var s=i[o-1],c=a.indexOf(s,o-1);-1!==c&&(l=c+1)}e.value.setSelectionRange(l,l)}catch(f){v(!1,"Something warning of cursor restore. Please fire issue about this: ".concat(f.message))}}]}(S,N),X=m(U,2),K=X[0],J=X[1],Q=function(e){return j.value&&!e.lessEquals(j.value)?j.value:$.value&&!$.value.lessEquals(e)?$.value:null},Y=function(e){return!Q(e)},Z=function(e,n){var a,r,i=e,u=Y(i)||i.isEmpty();if(i.isEmpty()||n||(i=Q(i)||i,u=!0),!t.readonly&&!t.disabled&&u){var o=i.toString(),l=O(o,n);return l>=0&&(i=q(R(o,".",l))),i.equals(E.value)||(r=i,void 0===t.value&&(E.value=r),null===(a=t.onChange)||void 0===a||a.call(t,i.isEmpty()?null:H(t.stringMode,i)),void 0===t.value&&F(i,n)),i}return E.value},ee=(T=i(0),P=function(){f.cancel(T.value)},u((function(){P()})),function(e){P(),T.value=f((function(){e()}))}),te=function e(n){var a;if(K(),M.value=n,!x.value){var r=q(k(n));r.isNaN()||Z(r,!0)}null===(a=t.onInput)||void 0===a||a.call(t,n),ee((function(){var a=n;t.parser||(a=n.replace(/。/g,".")),a!==n&&e(a)}))},ne=function(){x.value=!0},ae=function(){x.value=!1,te(S.value.value)},re=function(e){te(e.target.value)},ie=function(e){var n,a;if(!(e&&L.value||!e&&W.value)){w.value=!1;var r=q(t.step);e||(r=r.negate());var i=(E.value||q(0)).add(r.toString()),u=Z(i,!1);null===(n=t.onStep)||void 0===n||n.call(t,H(t.stringMode,u),{offset:t.step,type:e?"up":"down"}),null===(a=S.value)||void 0===a||a.focus()}},ue=function(e){var n=q(k(M.value)),a=n;a=n.isNaN()?E.value:Z(n,e),void 0!==t.value?F(E.value,!1):a.isNaN()||F(a,!1)},oe=function(e){var n,a=e.which;w.value=!0,a===y.ENTER&&(x.value||(w.value=!1),ue(!1),null===(n=t.onPressEnter)||void 0===n||n.call(t,e)),!1!==t.keyboard&&!x.value&&[y.UP,y.DOWN].includes(a)&&(ie(y.UP===a),e.preventDefault())},le=function(){w.value=!1},se=function(e){ue(!1),N.value=!1,w.value=!1,o("blur",e)};return b((function(){return t.precision}),(function(){E.value.isInvalidate()||F(E.value,!1)}),{flush:"post"}),b((function(){return t.value}),(function(){var e=q(t.value);E.value=e;var n=q(k(M.value));e.equals(n)&&w.value&&!t.formatter||F(e,w.value)}),{flush:"post"}),b(M,(function(){t.formatter&&J()}),{flush:"post"}),b((function(){return t.disabled}),(function(e){e&&(N.value=!1)})),h({focus:function(){var e;null===(e=S.value)||void 0===e||e.focus()},blur:function(){var e;null===(e=S.value)||void 0===e||e.blur()}}),function(){var n,i=d(d({},a),t),u=i.prefixCls,v=void 0===u?"rc-input-number":u,f=i.min,p=i.max,g=i.step,m=void 0===g?1:g;i.defaultValue,i.value;var b=i.disabled,y=i.readonly;i.keyboard;var h=i.controls,w=void 0===h||h,x=i.autofocus;i.stringMode,i.parser,i.formatter,i.precision,i.decimalSeparator,i.onChange,i.onInput,i.onPressEnter,i.onStep;var I=i.lazy,O=i.class,k=i.style,B=G(i,["prefixCls","min","max","step","defaultValue","value","disabled","readonly","keyboard","controls","autofocus","stringMode","parser","formatter","precision","decimalSeparator","onChange","onInput","onPressEnter","onStep","lazy","class","style"]),A=r.upHandler,F=r.downHandler,T="".concat(v,"-input"),_={};return I?_.onChange=re:_.onInput=re,e("div",{class:l(v,O,(n={},s(n,"".concat(v,"-focused"),N.value),s(n,"".concat(v,"-disabled"),b),s(n,"".concat(v,"-readonly"),y),s(n,"".concat(v,"-not-a-number"),E.value.isNaN()),s(n,"".concat(v,"-out-of-range"),!E.value.isInvalidate()&&!Y(E.value)),n)),style:k,onKeydown:oe,onKeyup:le},[w&&e(z,{prefixCls:v,upDisabled:L.value,downDisabled:W.value,onStep:ie},{upNode:A,downNode:F}),e("div",{class:"".concat(T,"-wrap")},[e("input",c(c(c({autofocus:x,autocomplete:"off",role:"spinbutton","aria-valuemin":f,"aria-valuemax":p,"aria-valuenow":E.value.isInvalidate()?null:E.value.toString(),step:m},B),{},{ref:S,class:T,value:M.value,disabled:b,readonly:y,onFocus:function(e){N.value=!0,o("focus",e)}},_),{},{onBlur:se,onCompositionstart:ne,onCompositionend:ae}),null)])])}}});function W(e){return null!=e}var U=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},X=$(),K=r({name:"AInputNumber",inheritAttrs:!1,props:d(d({},X),{size:{type:String},bordered:{type:Boolean,default:!0},placeholder:String,name:String,id:String,type:String,addonBefore:x.any,addonAfter:x.any,prefix:x.any,"onUpdate:value":X.onChange,valueModifiers:Object}),slots:["addonBefore","addonAfter","prefix"],setup:function(t,n){var a=n.emit,r=n.expose,u=n.attrs,o=n.slots,v=E(),f=h("input-number",t),p=f.prefixCls,g=f.size,m=f.direction,y=i(void 0===t.value?t.defaultValue:t.value),x=i(!1);b((function(){return t.value}),(function(){y.value=t.value}));var I=i(null);r({focus:function(){var e;null===(e=I.value)||void 0===e||e.focus()},blur:function(){var e;null===(e=I.value)||void 0===e||e.blur()}});var O=function(e){void 0===t.value&&(y.value=e),a("update:value",e),a("change",e),v.onFieldChange()},k=function(e){x.value=!1,a("blur",e),v.onFieldBlur()},M=function(e){x.value=!0,a("focus",e)};return function(){var n,a,r,i,v=d(d({},u),t),f=v.class,b=v.bordered,h=v.readonly,E=v.style,A=v.addonBefore,F=void 0===A?null===(a=o.addonBefore)||void 0===a?void 0:a.call(o):A,T=v.addonAfter,_=void 0===T?null===(r=o.addonAfter)||void 0===r?void 0:r.call(o):T,C=v.prefix,D=void 0===C?null===(i=o.prefix)||void 0===i?void 0:i.call(o):C,P=v.valueModifiers,j=void 0===P?{}:P,q=U(v,["class","bordered","readonly","style","addonBefore","addonAfter","prefix","valueModifiers"]),R=p.value,z=g.value,G=l((s(n={},"".concat(R,"-lg"),"large"===z),s(n,"".concat(R,"-sm"),"small"===z),s(n,"".concat(R,"-rtl"),"rtl"===m.value),s(n,"".concat(R,"-readonly"),h),s(n,"".concat(R,"-borderless"),!b),n),f),H=e(L,c(c({},N(q,["size","defaultValue"])),{},{ref:I,lazy:!!j.lazy,value:y.value,class:G,prefixCls:R,readonly:h,onChange:O,onBlur:k,onFocus:M}),{upHandler:function(){return e(B,{class:"".concat(R,"-handler-up-inner")},null)},downHandler:function(){return e(S,{class:"".concat(R,"-handler-down-inner")},null)}}),V=W(F)||W(_);if(W(D)){var $,X=l("".concat(R,"-affix-wrapper"),(s($={},"".concat(R,"-affix-wrapper-focused"),x.value),s($,"".concat(R,"-affix-wrapper-disabled"),t.disabled),s($,"".concat(R,"-affix-wrapper-sm"),"small"===g.value),s($,"".concat(R,"-affix-wrapper-lg"),"large"===g.value),s($,"".concat(R,"-affix-wrapper-rtl"),"rtl"===m.value),s($,"".concat(R,"-affix-wrapper-readonly"),h),s($,"".concat(R,"-affix-wrapper-borderless"),!b),s($,"".concat(f),!V&&f),$));H=e("div",{class:X,style:E,onMouseup:function(){return I.value.focus()}},[e("span",{class:"".concat(R,"-prefix")},[D]),H])}if(V){var K,J="".concat(R,"-group"),Q="".concat(J,"-addon"),Y=F?e("div",{class:Q},[F]):null,Z=_?e("div",{class:Q},[_]):null,ee=l("".concat(R,"-wrapper"),J,s({},"".concat(J,"-rtl"),"rtl"===m.value)),te=l("".concat(R,"-group-wrapper"),(s(K={},"".concat(R,"-group-wrapper-sm"),"small"===z),s(K,"".concat(R,"-group-wrapper-lg"),"large"===z),s(K,"".concat(R,"-group-wrapper-rtl"),"rtl"===m.value),K),f);H=e("div",{class:te,style:E},[e("div",{class:ee},[Y,H,Z])])}return w(H,{style:E})}}});const J=d(K,{install:function(e){return e.component(K.name,K),e}});export{J as A};
