(this.webpackJsonpgame=this.webpackJsonpgame||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(4),c=n.n(r),i=(n(10),n(1)),l=n(2),u=(n(11),25),s=25,m=25,f="gray",h="white",b="black",d=25,E=25,g=0,p=200,k=[[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1],[1,0],[-1,0]];var v=function(){var e=Object(a.useState)((function(){for(var e=[],t=0;t<u;t++)e.push(Array.from(Array(s),(function(){return 0})));return e})),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!1),v=Object(i.a)(c,2),y=v[0],w=v[1],C=Object(a.useRef)();C.current=y;var A=function(){for(var e=[],t=0;t<u;t++)e.push(Array.from(Array(s),(function(){return 0})));return g=0,e},O=Object(a.useCallback)((function(){C.current&&(r((function(e){return Object(l.a)(e,(function(t){for(var n=function(n){for(var a=function(a){var o=0;k.forEach((function(t){var r=Object(i.a)(t,2),c=r[0],l=r[1],m=n+c,f=a+l;m>=0&&m<u&&f>=0&&f<s&&(o+=e[m][f])})),o<2||o>3?t[n][a]=0:0===e[n][a]&&3===o&&(t[n][a]=1)},o=0;o<s;o++)a(o)},a=0;a<u;a++)n(a)}))})),setTimeout(O,p),g++)}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{onClick:function(){w(!y),y||(C.current=!0,g=0,O())}},y?"stop":"start"),o.a.createElement("button",{onClick:function(){for(var e=[],t=0;t<u;t++)e.push(Array.from(Array(s),(function(){return Math.random()>.8?1:0}))),g=0;r(e)}},"20% seed"),o.a.createElement("button",{onClick:function(){for(var e=[],t=0;t<u;t++)e.push(Array.from(Array(s),(function(){return Math.random()>.6?1:0}))),g=0;r(e)}},"40% seed"),o.a.createElement("button",{onClick:function(){for(var e=[],t=0;t<u;t++)e.push(Array.from(Array(s),(function(){return Math.random()>.3?1:0})));r(e)}},"70% seed"),o.a.createElement("button",{onClick:function(){u=25,s=25,m=25,f="gray",h="white",b="black",d=25,E=25,g=0,p=200,r(A())}},"RESET"),o.a.createElement("button",{onClick:function(){u=50,s=50,r(A())}},"50x50"),o.a.createElement("button",{onClick:function(){u=29,s=64,r(A())}},"widescreen"),o.a.createElement("button",{onClick:function(){u++,r(A())}},"+row"),o.a.createElement("button",{onClick:function(){s++,r(A())}},"+collum"),o.a.createElement("button",{onClick:function(){u++,s++,r(A())}},"+both"),o.a.createElement("button",{onClick:function(){d++,E++,m=d,r(A())}},"bigger cells"),o.a.createElement("button",{onClick:function(){d--,E--,m=d,r(A())}},"smaller cells"),o.a.createElement("button",{onClick:function(){m++,r(A())}},"add width space?"),o.a.createElement("button",{onClick:function(){p=50,r(A())}},"fast speed"),o.a.createElement("button",{onClick:function(){p=500,r(A())}},"slow speed"),o.a.createElement("button",{onClick:function(){h="white"===h?"gray":"white",b="black"===b?"white":"black",f="gray"===f?"black":"gray",r(A())}},"white"===h?"darkmode":"lightmode"),o.a.createElement("button",{onClick:function(){r(A())}},"clear cells"),o.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(".concat(s,", ").concat(m,"px)")}},n.map((function(e,t){return e.map((function(e,a){return o.a.createElement("div",{key:"".concat(t,"-").concat(a),onClick:function(){var e=Object(l.a)(n,(function(e){e[t][a]=n[t][a]?0:1}));r(e)},style:{width:d,height:E,backgroundColor:n[t][a]?"".concat(f):"".concat(h),border:"solid 1px ".concat(b)}})}))}))),o.a.createElement("h1",null,"generation:",g),o.a.createElement("h2",null," About Conway's Game of Life"),o.a.createElement("p",null,"The Game of Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine."),o.a.createElement("p",null,"A cell is born if"),o.a.createElement("ol",null,"There are 3 live neighbours next to it"),o.a.createElement("p",null,"A cell dies if"),o.a.createElement("ol",null,"It has fewer than 2 live neighbours to underpopulation, or more than 3 live neighbors to overpopulation"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.3e321b51.chunk.js.map