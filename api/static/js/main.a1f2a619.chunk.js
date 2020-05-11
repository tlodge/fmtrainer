(this.webpackJsonpfmtrainer=this.webpackJsonpfmtrainer||[]).push([[0],{14:function(e,t,n){e.exports={button:"Train_button__2wHuI",footer:"Train_footer__WmYe4",classification:"Train_classification__1znlx",vcontainer:"Train_vcontainer__2e2zf"}},37:function(e,t,n){e.exports=n(67)},42:function(e,t,n){},65:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),i=n.n(o),c=(n(42),n(11)),s=n(6),u=n(1),l=n(17),d=n.n(l),m=n(9),g=n(7),f=n.n(g),O=function(e){f()({method:"get",url:encodeURIComponent("/record/".concat(e))})},v={NOT_LISTENING:"not listening",AWAITING_GESTURE:"awaiting gesture",AWAITING_CONFIRMATION:"awaiting confirmation",FIVE:"5",FOUR:"4",THREE:"3",TWO:"2",ONE:"1",RECORDING:"recording",TRAINING:"training",TESTING:"testing"},I=["FIVE","FOUR","THREE","TWO","ONE","RECORDING"],w={NOT_LISTENING:"press button to start listening for instructions",AWAITING_GESTURE:"say <strong>record</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train",AWAITING_CONFIRMATION:"say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture",FIVE:"recording in <strong>five</strong> seconds...",FOUR:"recording in <strong>four</strong> seconds...",THREE:"recording in <strong>three</strong> seconds...",TWO:"recording in <strong>two</strong> seconds...",ONE:"recording in <strong>one</strong> second!",RECORDING:"record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard",TRAINING:"now training...this will take a while...",TESTING:"now testing what we have learnt!"},E=Object(m.b)({name:"train",initialState:{amListening:!1,marked:!1,status:v.NOT_LISTENING,instructions:w.NOT_LISTENING,gesture:"",rawTranscript:"",preview:!1,classification:"unknown"},reducers:{setInstructions:function(e,t){e.instructions=t.payload},setStatus:function(e,t){e.status=v[t.payload],e.instructions=w[t.payload]},setPreview:function(e,t){e.preview=t.payload},setMarked:function(e,t){e.marked=t.payload},setRawTranscript:function(e,t){e.rawTranscript=t.payload},setClassification:function(e,t){e.classification=t.payload},reset:function(e,t){e.status=v.AWAITING_GESTURE,e.instructions=w.AWAITING_GESTURE,e.gesture="",e.preview=!1},startedListening:function(e,t){t.payload?(e.amFinished=!1,e.amListening=!0,e.status=v.AWAITING_GESTURE,e.instructions=w.AWAITING_GESTURE):(e.status=v.NOT_LISTENING,e.instructions=w.NOT_LISTENING)},issueConfirm:function(e,t){e.readytorecord="yes"===t.payload.toLowerCase()},setGesture:function(e,t){if(""!==t.payload.trim()){var n=t.payload.toLowerCase().indexOf("record");-1!==n&&(e.gesture="".concat(t.payload.substring(n+6).trim()),e.status=v.AWAITING_CONFIRMATION,e.instructions=w.AWAITING_CONFIRMATION)}}}}),N=E.actions,p=N.setGesture,T=N.setStatus,b=N.startedListening,h=(N.amListening,N.reset),R=N.setRawTranscript,_=N.setPreview,y=N.setInstructions,j=N.setClassification,S=N.setMarked,G=function(e){return e.train.gesture},A=function(e){return e.train.status},k=function(e){return e.train.instructions},C=function(e){return e.train.amListening},L=function(e){return e.train.marked},x=function(e){return e.train.rawTranscript},W=function(e){return e.train.preview},F=function(e){return e.train.classification},M=function(e){return function(t,n){var a=n().train;return t(R(e.toLowerCase().trim())),"test"===e.toLowerCase().trim()?(t(T("TESTING")),void t(_(!0))):("mark"===e.toLowerCase().trim()&&(console.log("marking"),t(S(!0)),console.log("calling mark!"),f()({method:"get",url:"/mark"})),"end"===e.toLowerCase().trim()&&(console.log("end mark"),t(S(!1)),console.log("calling END mark!"),f()({method:"get",url:"/endmark"})),"train"===e.toLowerCase().trim()&&a.status!=v.TRAINING?(t(h()),t(T("TRAINING")),void function(e,t){var n=new EventSource("/trains");n.onopen=function(){console.log("connection successfully opened!!")},n.onerror=function(e){console.log("error connecting",e),n.close()},n.onmessage=function(a){-1!==a.data.indexOf("StreamExecutor")||-1!==a.data.indexOf("COMPLETE")?(console.log("FINISHED TRAINING"),t(),n.close()):e(a.data)}}((function(e){t(y(e))}),(function(){t(h())}))):-1!==["done","ok"].indexOf(e.toLowerCase().trim())?(t(h()),void f()({method:"get",url:"/done"})):"cancel"!==e.toLowerCase().trim()?a.status===v.AWAITING_CONFIRMATION&&"ready"===e.toLowerCase().trim()?(t(T("RECORDING_COUNTDOWN")),void t(U(a))):void t(p(e)):void t(h()))}},U=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(a){a(T(I[n])),5==n&&(console.log("calling record with ",t),a(_(!1)),O(t.gesture)),n<5&&(a(_(!0)),setTimeout((function(){return e(t,++n)(a)}),1e3))}},D=E.reducer,H=n(20),B=n.n(H),z=n(35),P=function(){var e=Object(z.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({audio:!1,video:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Object(a.useState)(null),c=Object(s.a)(i,2),u=c[0],l=c[1],d=Object(a.useState)(""),m=Object(s.a)(d,2),g=m[0],f=m[1],O=Object(a.useState)(!0),v=Object(s.a)(O,2),I=v[0],w=v[1];return Object(a.useEffect)((function(){!u&&e.current&&(e.current instanceof HTMLVideoElement&&l(e.current))}),[e,u]),function(e){var t=Object(a.useRef)(e);Object(a.useEffect)((function(){t.current=e}),[e]),Object(a.useEffect)((function(){return function(){}}),[])}(u),Object(a.useEffect)((function(){u&&!r&&I&&P().then((function(e){u.srcObject=e,o(!0)})).catch((function(e){f(e.message),w(!1)}))}),[u,r,I]),Object(a.useEffect)((function(){var t=e.current;I?t.play():t.pause()}),[I,e]),[u,r,I,w,g]},J=n(14),K=n.n(J);function Y(){var e="undefined"!==typeof window&&(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.msSpeechRecognition||window.oSpeechRecognition),t=e?new e:null;t.continous=!0,t.interimResults=!0,t.lang="en-US";var n=Object(a.useState)(),o=Object(s.a)(n,2),i=(o[0],o[1],Object(u.c)(G)),l=Object(u.c)(k),m=Object(u.c)(C),g=Object(u.c)(L),O=Object(u.c)(x),I="recording"===Object(u.c)(A),w=Object(u.c)(W),E=Object(u.c)(F),N=Object(u.b)(),p="",T="";t.onend=function(){p="",t.start()},t.onresult=function(e){T="";for(var t=e.resultIndex;t<e.results.length;t++){var n=e.results[t][0].transcript;e.results[t].isFinal?p+=n+" ":N(M(T+=n))}N(M(p))};var h=Object(a.createRef)(),R=Object(a.createRef)(),_=V(h),y=Object(s.a)(_,5),S=(y[0],y[1],y[2],y[3],y[4],function(e,t){setInterval((function(){var n;e.getContext("2d").drawImage(t,0,0,128,128),N((n=e.toDataURL("image/png"),function(e,t){var a=t().train;a.status===v.RECORDING&&f()({method:"post",url:"/image",data:{image:n}}),a.status===v.TESTING&&f()({method:"post",url:"/classify",data:{image:n}}).then((function(t){var n=t.data.category;e(j(void 0===n?"unknown":n))}))}))}),1e3)});return r.a.createElement("div",{className:"App-content"},r.a.createElement("div",{style:{padding:"0px 100px 100px 100px"}},r.a.createElement(r.a.Fragment,null,r.a.createElement("video",{className:d()(Object(c.a)({},K.a.vcontainer,g)),style:{display:I||w?"block":"none"},ref:h,autoPlay:!0,muted:!0,controls:!0,width:"auto",height:400}),r.a.createElement("canvas",{style:{display:"none"},ref:R,width:128,height:128}),w&&"unknown"!=E.trim()&&r.a.createElement("div",{className:K.a.classification},E)),r.a.createElement("div",{style:{fontSize:80,fontWeight:700,textTransform:"uppercase",marginBottom:30}},i),m&&r.a.createElement("div",{style:{color:"#736A6A"},dangerouslySetInnerHTML:{__html:l}}),!m&&r.a.createElement("button",{id:"microphone-btn",className:K.a.button,onClick:function(){p="",console.log("in handle listener: am listening",m),m||(N(b(!0)),S(R.current,h.current),console.log("OK STARTING LISTENING!"),t.start())}},"START LISTENING")),""!=O.trim()&&r.a.createElement("div",{className:K.a.footer},'"'.concat(O,'"')))}var $=Object(m.b)({name:"review",initialState:{images:[],categories:{},total:0},reducers:{setImages:function(e,t){e.images=t.payload.images,e.categories=t.payload.categories,e.total=t.payload.total}}}),q=$.actions.setImages,Q=function(e){return e.review.images},X=function(e){return e.review.total},Z=function(e){return e.review.categories},ee=$.reducer,te=n(8),ne=n.n(te);function ae(){var e=Object(u.b)(),t=Object(u.c)(Q),n=Object(u.c)(X),o=Object(u.c)(Z),i=Object(a.useState)(-1),l=Object(s.a)(i,2),m=l[0],g=l[1],O=Object(a.useState)(-1),v=Object(s.a)(O,2),I=v[0],w=v[1];Object(a.useEffect)((function(){e((function(e,t){f()({method:"get",url:"/marked"}).then((function(t){var n=t.data||[];e(q(n))}))})),e(h())}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"showing ".concat(t.length," images of ").concat(n)),r.a.createElement("div",{className:ne.a.topcontainer},t.map((function(e,n){var a,o=-1!=m&&-1!=I,i=o&&n>=Math.min(m,I)&&n<Math.max(m,I),s=!o&&n==Math.min(m,I),u=!o&&n==Math.max(m,I),l=d()((a={},Object(c.a)(a,ne.a.marked,i),Object(c.a)(a,ne.a.start,s),Object(c.a)(a,ne.a.end,u),Object(c.a)(a,ne.a.imagecontainer,!0),a));return r.a.createElement("img",{onClick:function(){return function(e){-1!==m&&-1!==I?(g(t.indexOf(e)),w(-1)):-1==m?g(t.indexOf(e)):w(t.indexOf(e))}(e)},className:l,src:e,width:"128px",height:"128px"})}))),function(){var e=Object.keys(o).map((function(e){return r.a.createElement("div",{className:ne.a.category},e)}));return r.a.createElement("div",{className:ne.a.categoryfooter},r.a.createElement("div",{className:ne.a.categorybar},e))}())}n(65);var re=n(23),oe=n(10);var ie=function(){return r.a.createElement(re.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(re.b,{to:"/review"},"Review"),r.a.createElement(oe.c,null,r.a.createElement(oe.a,{path:"/review"},r.a.createElement(ae,null)),r.a.createElement(oe.a,{path:"/"},r.a.createElement(Y,null)))))},ce=Object(m.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),se=ce.actions,ue=(se.increment,se.decrement,se.incrementByAmount,ce.reducer),le=Object(m.a)({reducer:{counter:ue,train:D,review:ee}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:le},r.a.createElement(ie,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports={topcontainer:"Review_topcontainer__oSrtc",imagecontainer:"Review_imagecontainer__tE3or",marked:"Review_marked__on5-r",start:"Review_start__1caLc",end:"Review_end__2mp8v",categoryfooter:"Review_categoryfooter__Ck-yN",categorybar:"Review_categorybar__3vtAN",category:"Review_category__11-7I"}}},[[37,1,2]]]);
//# sourceMappingURL=main.a1f2a619.chunk.js.map