(this.webpackJsonpfmtrainer=this.webpackJsonpfmtrainer||[]).push([[0],{13:function(t,e,n){t.exports={button:"Train_button__2wHuI",footer:"Train_footer__WmYe4"}},25:function(t,e,n){t.exports=n(57)},30:function(t,e,n){},31:function(t,e,n){t.exports=n.p+"static/media/logo.8dad8028.svg"},5:function(t,e,n){t.exports={row:"Counter_row__1C_4f",value:"Counter_value__1d0te",button:"Counter_button__1xpSV",textbox:"Counter_textbox__3ODaX",asyncButton:"Counter_asyncButton__2UAr3 Counter_button__1xpSV"}},56:function(t,e,n){},57:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(8),i=n.n(a),s=(n(30),n(31),n(4)),c=n(2),u=n(6),l=Object(u.b)({name:"counter",initialState:{value:0},reducers:{increment:function(t){t.value+=1},decrement:function(t){t.value-=1},incrementByAmount:function(t,e){t.value+=e.payload}}}),d=l.actions,g=(d.increment,d.decrement,d.incrementByAmount,l.reducer);n(5);var f=n(7),m=n.n(f),I=function(t){m()({method:"get",url:encodeURIComponent("/record/".concat(t))})},N={NOT_LISTENING:"not listening",AWAITING_GESTURE:"awaiting gesture",AWAITING_CONFIRMATION:"awaiting confirmation",FIVE:"5",FOUR:"4",THREE:"3",TWO:"2",ONE:"1",RECORDING:"recording",TRAINING:"training",TESTING:"testing"},T=["FIVE","FOUR","THREE","TWO","ONE","RECORDING"],O={NOT_LISTENING:"press button to start listening for instructions",AWAITING_GESTURE:"say <strong>record</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train",AWAITING_CONFIRMATION:"say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture",FIVE:"recording in <strong>five</strong> seconds...",FOUR:"recording in <strong>four</strong> seconds...",THREE:"recording in <strong>three</strong> seconds...",TWO:"recording in <strong>two</strong> seconds...",ONE:"recording in <strong>one</strong> second!",RECORDING:"record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard",TRAINING:"now training...this will take a while...",TESTING:"now testing what we have learnt!"},p=Object(u.b)({name:"train",initialState:{amListening:!1,status:N.NOT_LISTENING,instructions:O.NOT_LISTENING,gesture:"",rawTranscript:"",preview:!1},reducers:{setInstructions:function(t,e){t.instructions=e.payload},setStatus:function(t,e){t.status=N[e.payload],t.instructions=O[e.payload]},setPreview:function(t,e){t.preview=e.payload},setRawTranscript:function(t,e){t.rawTranscript=e.payload},reset:function(t,e){t.status=N.AWAITING_GESTURE,t.instructions=O.AWAITING_GESTURE,t.gesture="",t.preview=!1},startedListening:function(t,e){e.payload?(t.amFinished=!1,t.amListening=!0,t.status=N.AWAITING_GESTURE,t.instructions=O.AWAITING_GESTURE):(t.status=N.NOT_LISTENING,t.instructions=O.NOT_LISTENING)},issueConfirm:function(t,e){t.readytorecord="yes"===e.payload.toLowerCase()},setGesture:function(t,e){if(""!==e.payload.trim()){var n=e.payload.toLowerCase().indexOf("record");-1!==n&&(t.gesture="".concat(e.payload.substring(n+6).trim()),t.status=N.AWAITING_CONFIRMATION,t.instructions=O.AWAITING_CONFIRMATION)}}}}),E=p.actions,w=E.setGesture,v=E.setStatus,b=E.startedListening,h=(E.amListening,E.reset),R=E.setRawTranscript,_=E.setPreview,y=E.setInstructions,S=function(t){return t.train.gesture},G=function(t){return t.train.status},A=function(t){return t.train.instructions},j=function(t){return t.train.amListening},C=function(t){return t.train.rawTranscript},L=function(t){return t.train.preview},x=function(t){return function(e,n){var r=n().train;if(e(R(t.toLowerCase().trim())),"test"===t.toLowerCase().trim())return e(v("TESTING")),void e(_(!0));if("train"===t.toLowerCase().trim()){if(console.log("ok heard train!"),r.status!=N.TRAINING)return console.log("not already training so will start training!"),e(h()),e(v("TRAINING")),void function(t,e){var n=new EventSource("/trains");n.onopen=function(){console.log("connection successfully opened!!")},n.onerror=function(t){console.log("error connecting",t),n.close()},n.onmessage=function(r){-1!==r.data.indexOf("StreamExecutor")||-1!==r.data.indexOf("COMPLETE")?(console.log("FINISHED TRAINING"),e(),n.close()):t(r.data)}}((function(t){e(y(t))}),(function(){e(h())}));console.log("already training so not doing anything..")}return-1!==["done","ok"].indexOf(t.toLowerCase().trim())?(e(h()),void m()({method:"get",url:"/done"})):"cancel"!==t.toLowerCase().trim()?r.status===N.AWAITING_CONFIRMATION&&"ready"===t.toLowerCase().trim()?(e(v("RECORDING_COUNTDOWN")),void e(W(r))):void e(w(t)):void e(h())}},W=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(r){r(v(T[n])),5==n&&(console.log("calling record with ",e),r(_(!1)),I(e.gesture)),n<5&&(r(_(!0)),setTimeout((function(){return t(e,++n)(r)}),1e3))}},F=p.reducer,U=n(12),k=n.n(U),D=n(24),M=function(){var t=Object(D.a)(k.a.mark((function t(){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({audio:!1,video:!0});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),B=function(t){var e=Object(r.useState)(!1),n=Object(s.a)(e,2),o=n[0],a=n[1],i=Object(r.useState)(null),c=Object(s.a)(i,2),u=c[0],l=c[1],d=Object(r.useState)(""),g=Object(s.a)(d,2),f=g[0],m=g[1],I=Object(r.useState)(!0),N=Object(s.a)(I,2),T=N[0],O=N[1];return Object(r.useEffect)((function(){!u&&t.current&&(t.current instanceof HTMLVideoElement&&l(t.current))}),[t,u]),function(t){var e=Object(r.useRef)(t);Object(r.useEffect)((function(){e.current=t}),[t]),Object(r.useEffect)((function(){return function(){}}),[])}(u),Object(r.useEffect)((function(){u&&!o&&T&&M().then((function(t){u.srcObject=t,a(!0)})).catch((function(t){m(t.message),O(!1)}))}),[u,o,T]),Object(r.useEffect)((function(){var e=t.current;T?e.play():e.pause()}),[T,t]),[u,o,T,O,f]},H=n(13),V=n.n(H);function P(){var t="undefined"!==typeof window&&(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.msSpeechRecognition||window.oSpeechRecognition),e=t?new t:null;e.continous=!0,e.interimResults=!0,e.lang="en-US";var n=Object(r.useState)(),a=Object(s.a)(n,2),i=(a[0],a[1],Object(c.c)(S)),u=Object(c.c)(A),l=Object(c.c)(j),d=Object(c.c)(C),g="recording"===Object(c.c)(G),f=Object(c.c)(L),I=Object(c.b)(),T="",O="";e.onend=function(){T="",e.start()},e.onresult=function(t){O="";for(var e=t.resultIndex;e<t.results.length;e++){var n=t.results[e][0].transcript;t.results[e].isFinal?T+=n+" ":I(x(O+=n))}I(x(T))};var p=Object(r.createRef)(),E=Object(r.createRef)(),w=B(p),v=Object(s.a)(w,5),h=(v[0],v[1],v[2],v[3],v[4],function(t,e){setInterval((function(){var n;t.getContext("2d").drawImage(e,0,0,128,128),I((n=t.toDataURL("image/png"),function(t,e){var r=e().train;r.status===N.RECORDING&&m()({method:"post",url:"/image",data:{image:n}}),r.status===N.TESTING&&m()({method:"post",url:"/classify",data:{image:n}})}))}),200)});return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{padding:"0px 100px 100px 100px"}},o.a.createElement(o.a.Fragment,null,o.a.createElement("video",{style:{display:g||f?"block":"none"},ref:p,autoPlay:!0,muted:!0,controls:!0,width:600,height:400}),o.a.createElement("canvas",{style:{display:"none"},ref:E,width:128,height:128})),o.a.createElement("div",{style:{fontSize:80,fontWeight:700,textTransform:"uppercase",marginBottom:30}},i),l&&o.a.createElement("div",{style:{color:"#736A6A"},dangerouslySetInnerHTML:{__html:u}}),!l&&o.a.createElement("button",{id:"microphone-btn",className:V.a.button,onClick:function(){T="",console.log("in handle listener: am listening",l),l||(I(b(!0)),h(E.current,p.current),console.log("OK STARTING LISTENING!"),e.start())}},"START LISTENING")),""!=d.trim()&&o.a.createElement("div",{className:V.a.footer},'"'.concat(d,'"')))}n(56);var z=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement(P,null)))},J=Object(u.a)({reducer:{counter:g,train:F}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(c.a,{store:J},o.a.createElement(z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.a54a2878.chunk.js.map