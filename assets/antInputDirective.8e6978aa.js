function t(t){t.target.composing=!0}function n(t){t.target.composing&&(t.target.composing=!1,function(t,n){var o=document.createEvent("HTMLEvents");o.initEvent(n,!0,!0),t.dispatchEvent(o)}(t.target,"input"))}function o(t,n,o,e){t.addEventListener(n,o,e)}const e={created:function(e,i){i.modifiers&&i.modifiers.lazy||(o(e,"compositionstart",t),o(e,"compositionend",n),o(e,"change",n))}};export{e as a};
