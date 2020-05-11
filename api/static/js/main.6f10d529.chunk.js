(this.webpackJsonpfmtrainer=this.webpackJsonpfmtrainer||[]).push([[0],{12:function(e,t,n){e.exports={button:"Train_button__2wHuI",footer:"Train_footer__WmYe4",classification:"Train_classification__1znlx",vcontainer:"Train_vcontainer__2e2zf"}},18:function(e,t,n){e.exports={topcontainer:"Review_topcontainer__oSrtc",imagecontainer:"Review_imagecontainer__tE3or"}},37:function(e,t,n){e.exports=n(67)},42:function(e,t,n){},65:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(13),i=n.n(a),c=(n(42),n(32)),s=n(9),u=n(1),l=n(34),d=n.n(l),g=n(7),f=n(6),m=n.n(f),I=function(e){m()({method:"get",url:encodeURIComponent("/record/".concat(e))})},E={NOT_LISTENING:"not listening",AWAITING_GESTURE:"awaiting gesture",AWAITING_CONFIRMATION:"awaiting confirmation",FIVE:"5",FOUR:"4",THREE:"3",TWO:"2",ONE:"1",RECORDING:"recording",TRAINING:"training",TESTING:"testing"},N=["FIVE","FOUR","THREE","TWO","ONE","RECORDING"],O={NOT_LISTENING:"press button to start listening for instructions",AWAITING_GESTURE:"say <strong>record</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train",AWAITING_CONFIRMATION:"say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture",FIVE:"recording in <strong>five</strong> seconds...",FOUR:"recording in <strong>four</strong> seconds...",THREE:"recording in <strong>three</strong> seconds...",TWO:"recording in <strong>two</strong> seconds...",ONE:"recording in <strong>one</strong> second!",RECORDING:"record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard",TRAINING:"now training...this will take a while...",TESTING:"now testing what we have learnt!"},p=Object(g.b)({name:"train",initialState:{amListening:!1,marked:!1,status:E.NOT_LISTENING,instructions:O.NOT_LISTENING,gesture:"",rawTranscript:"",preview:!1,classification:"unknown"},reducers:{setInstructions:function(e,t){e.instructions=t.payload},setStatus:function(e,t){e.status=E[t.payload],e.instructions=O[t.payload]},setPreview:function(e,t){e.preview=t.payload},setMarked:function(e,t){e.marked=t.payload},setRawTranscript:function(e,t){e.rawTranscript=t.payload},setClassification:function(e,t){e.classification=t.payload},reset:function(e,t){e.status=E.AWAITING_GESTURE,e.instructions=O.AWAITING_GESTURE,e.gesture="",e.preview=!1},startedListening:function(e,t){t.payload?(e.amFinished=!1,e.amListening=!0,e.status=E.AWAITING_GESTURE,e.instructions=O.AWAITING_GESTURE):(e.status=E.NOT_LISTENING,e.instructions=O.NOT_LISTENING)},issueConfirm:function(e,t){e.readytorecord="yes"===t.payload.toLowerCase()},setGesture:function(e,t){if(""!==t.payload.trim()){var n=t.payload.toLowerCase().indexOf("record");-1!==n&&(e.gesture="".concat(t.payload.substring(n+6).trim()),e.status=E.AWAITING_CONFIRMATION,e.instructions=O.AWAITING_CONFIRMATION)}}}}),w=p.actions,T=w.setGesture,v=w.setStatus,h=w.startedListening,b=(w.amListening,w.reset),R=w.setRawTranscript,S=w.setPreview,y=w.setInstructions,G=w.setClassification,A=w.setMarked,j=function(e){return e.train.gesture},_=function(e){return e.train.status},k=function(e){return e.train.instructions},C=function(e){return e.train.amListening},L=function(e){return e.train.marked},x=function(e){return e.train.rawTranscript},W=function(e){return e.train.preview},F=function(e){return e.train.classification},U=function(e){return function(t,n){var r=n().train;return t(R(e.toLowerCase().trim())),"test"===e.toLowerCase().trim()?(t(v("TESTING")),void t(S(!0))):("mark"===e.toLowerCase().trim()&&(console.log("marking"),t(A(!0)),console.log("calling mark!"),m()({method:"get",url:"/mark"})),"end"===e.toLowerCase().trim()&&(console.log("end mark"),t(A(!1)),console.log("calling END mark!"),m()({method:"get",url:"/endmark"})),"train"===e.toLowerCase().trim()&&r.status!=E.TRAINING?(t(b()),t(v("TRAINING")),void function(e,t){var n=new EventSource("/trains");n.onopen=function(){console.log("connection successfully opened!!")},n.onerror=function(e){console.log("error connecting",e),n.close()},n.onmessage=function(r){-1!==r.data.indexOf("StreamExecutor")||-1!==r.data.indexOf("COMPLETE")?(console.log("FINISHED TRAINING"),t(),n.close()):e(r.data)}}((function(e){t(y(e))}),(function(){t(b())}))):-1!==["done","ok"].indexOf(e.toLowerCase().trim())?(t(b()),void m()({method:"get",url:"/done"})):"cancel"!==e.toLowerCase().trim()?r.status===E.AWAITING_CONFIRMATION&&"ready"===e.toLowerCase().trim()?(t(v("RECORDING_COUNTDOWN")),void t(M(r))):void t(T(e)):void t(b()))}},M=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(r){r(v(N[n])),5==n&&(console.log("calling record with ",t),r(S(!1)),I(t.gesture)),n<5&&(r(S(!0)),setTimeout((function(){return e(t,++n)(r)}),1e3))}},D=p.reducer,H=n(17),B=n.n(H),z=n(35),P=function(){var e=Object(z.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({audio:!1,video:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(e){var t=Object(r.useState)(!1),n=Object(s.a)(t,2),o=n[0],a=n[1],i=Object(r.useState)(null),c=Object(s.a)(i,2),u=c[0],l=c[1],d=Object(r.useState)(""),g=Object(s.a)(d,2),f=g[0],m=g[1],I=Object(r.useState)(!0),E=Object(s.a)(I,2),N=E[0],O=E[1];return Object(r.useEffect)((function(){!u&&e.current&&(e.current instanceof HTMLVideoElement&&l(e.current))}),[e,u]),function(e){var t=Object(r.useRef)(e);Object(r.useEffect)((function(){t.current=e}),[e]),Object(r.useEffect)((function(){return function(){}}),[])}(u),Object(r.useEffect)((function(){u&&!o&&N&&P().then((function(e){u.srcObject=e,a(!0)})).catch((function(e){m(e.message),O(!1)}))}),[u,o,N]),Object(r.useEffect)((function(){var t=e.current;N?t.play():t.pause()}),[N,e]),[u,o,N,O,f]},J=n(12),K=n.n(J);function Y(){var e="undefined"!==typeof window&&(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.msSpeechRecognition||window.oSpeechRecognition),t=e?new e:null;t.continous=!0,t.interimResults=!0,t.lang="en-US";var n=Object(r.useState)(),a=Object(s.a)(n,2),i=(a[0],a[1],Object(u.c)(j)),l=Object(u.c)(k),g=Object(u.c)(C),f=Object(u.c)(L),I=Object(u.c)(x),N="recording"===Object(u.c)(_),O=Object(u.c)(W),p=Object(u.c)(F),w=Object(u.b)(),T="",v="";t.onend=function(){T="",t.start()},t.onresult=function(e){v="";for(var t=e.resultIndex;t<e.results.length;t++){var n=e.results[t][0].transcript;e.results[t].isFinal?T+=n+" ":w(U(v+=n))}w(U(T))};var b=Object(r.createRef)(),R=Object(r.createRef)(),S=V(b),y=Object(s.a)(S,5),A=(y[0],y[1],y[2],y[3],y[4],function(e,t){setInterval((function(){var n;e.getContext("2d").drawImage(t,0,0,128,128),w((n=e.toDataURL("image/png"),function(e,t){var r=t().train;r.status===E.RECORDING&&m()({method:"post",url:"/image",data:{image:n}}),r.status===E.TESTING&&m()({method:"post",url:"/classify",data:{image:n}}).then((function(t){console.log("setting classidficaton",t.data);var n=t.data.category;e(G(void 0===n?"unknown":n))}))}))}),1e3)});return o.a.createElement("div",{className:"App-content"},o.a.createElement("div",{style:{padding:"0px 100px 100px 100px"}},o.a.createElement(o.a.Fragment,null,o.a.createElement("video",{className:d()(Object(c.a)({},K.a.vcontainer,f)),style:{display:N||O?"block":"none"},ref:b,autoPlay:!0,muted:!0,controls:!0,width:"auto",height:400}),o.a.createElement("canvas",{style:{display:"none"},ref:R,width:128,height:128}),O&&"unknown"!=p.trim()&&o.a.createElement("div",{className:K.a.classification},p)),o.a.createElement("div",{style:{fontSize:80,fontWeight:700,textTransform:"uppercase",marginBottom:30}},i),g&&o.a.createElement("div",{style:{color:"#736A6A"},dangerouslySetInnerHTML:{__html:l}}),!g&&o.a.createElement("button",{id:"microphone-btn",className:K.a.button,onClick:function(){T="",console.log("in handle listener: am listening",g),g||(w(h(!0)),A(R.current,b.current),console.log("OK STARTING LISTENING!"),t.start())}},"START LISTENING")),""!=I.trim()&&o.a.createElement("div",{className:K.a.footer},'"'.concat(I,'"')))}var $=Object(g.b)({name:"review",initialState:{images:[]},reducers:{setImages:function(e,t){e.images=t.payload}}}),q=$.actions.setImages,Q=function(e){return e.review.images},X=$.reducer,Z=n(18),ee=n.n(Z);function te(){var e=Object(u.b)(),t=Object(u.c)(Q);Object(r.useEffect)((function(){console.log("fetching images!!"),e((function(e,t){console.log("nice, fetching images!!"),m()({method:"get",url:"/marked"}).then((function(t){var n=t.data||[];e(q(n))}))}))}),[]);return o.a.createElement("div",{className:ee.a.topcontainer},t.map((function(e){return o.a.createElement("img",{className:ee.a.imagecontainer,src:e,width:"128px",height:"128px"})})))}n(65);var ne=n(21),re=n(8);var oe=function(){return o.a.createElement(ne.a,null,o.a.createElement("div",{className:"App"},o.a.createElement(ne.b,{to:"/review"},"Review"),o.a.createElement(re.c,null,o.a.createElement(re.a,{path:"/review"},o.a.createElement(te,null)),o.a.createElement(re.a,{path:"/"},o.a.createElement(Y,null)))))},ae=Object(g.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),ie=ae.actions,ce=(ie.increment,ie.decrement,ie.incrementByAmount,ae.reducer),se=Object(g.a)({reducer:{counter:ce,train:D,review:X}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(u.a,{store:se},o.a.createElement(oe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.6f10d529.chunk.js.map