(this.webpackJsonpfmtrainer=this.webpackJsonpfmtrainer||[]).push([[0],{13:function(e,t,n){e.exports={button:"Train_button__2wHuI",footer:"Train_footer__WmYe4",classification:"Train_classification__1znlx",vcontainer:"Train_vcontainer__2e2zf"}},14:function(e,t,n){e.exports={topcontainer:"Review_topcontainer__oSrtc",imagecontainer:"Review_imagecontainer__tE3or",marked:"Review_marked__on5-r",start:"Review_start__1caLc",end:"Review_end__2mp8v"}},37:function(e,t,n){e.exports=n(67)},42:function(e,t,n){},65:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(15),i=n.n(o),c=(n(42),n(11)),s=n(6),u=n(1),l=n(17),d=n.n(l),m=n(8),f=n(7),g=n.n(f),O=function(e){g()({method:"get",url:encodeURIComponent("/record/".concat(e))})},I={NOT_LISTENING:"not listening",AWAITING_GESTURE:"awaiting gesture",AWAITING_CONFIRMATION:"awaiting confirmation",FIVE:"5",FOUR:"4",THREE:"3",TWO:"2",ONE:"1",RECORDING:"recording",TRAINING:"training",TESTING:"testing"},E=["FIVE","FOUR","THREE","TWO","ONE","RECORDING"],v={NOT_LISTENING:"press button to start listening for instructions",AWAITING_GESTURE:"say <strong>record</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train",AWAITING_CONFIRMATION:"say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture",FIVE:"recording in <strong>five</strong> seconds...",FOUR:"recording in <strong>four</strong> seconds...",THREE:"recording in <strong>three</strong> seconds...",TWO:"recording in <strong>two</strong> seconds...",ONE:"recording in <strong>one</strong> second!",RECORDING:"record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard",TRAINING:"now training...this will take a while...",TESTING:"now testing what we have learnt!"},w=Object(m.b)({name:"train",initialState:{amListening:!1,marked:!1,status:I.NOT_LISTENING,instructions:v.NOT_LISTENING,gesture:"",rawTranscript:"",preview:!1,classification:"unknown"},reducers:{setInstructions:function(e,t){e.instructions=t.payload},setStatus:function(e,t){e.status=I[t.payload],e.instructions=v[t.payload]},setPreview:function(e,t){e.preview=t.payload},setMarked:function(e,t){e.marked=t.payload},setRawTranscript:function(e,t){e.rawTranscript=t.payload},setClassification:function(e,t){e.classification=t.payload},reset:function(e,t){e.status=I.AWAITING_GESTURE,e.instructions=v.AWAITING_GESTURE,e.gesture="",e.preview=!1},startedListening:function(e,t){t.payload?(e.amFinished=!1,e.amListening=!0,e.status=I.AWAITING_GESTURE,e.instructions=v.AWAITING_GESTURE):(e.status=I.NOT_LISTENING,e.instructions=v.NOT_LISTENING)},issueConfirm:function(e,t){e.readytorecord="yes"===t.payload.toLowerCase()},setGesture:function(e,t){if(""!==t.payload.trim()){var n=t.payload.toLowerCase().indexOf("record");-1!==n&&(e.gesture="".concat(t.payload.substring(n+6).trim()),e.status=I.AWAITING_CONFIRMATION,e.instructions=v.AWAITING_CONFIRMATION)}}}}),N=w.actions,p=N.setGesture,T=N.setStatus,b=N.startedListening,h=(N.amListening,N.reset),R=N.setRawTranscript,_=N.setPreview,j=N.setInstructions,S=N.setClassification,y=N.setMarked,G=function(e){return e.train.gesture},A=function(e){return e.train.status},k=function(e){return e.train.instructions},C=function(e){return e.train.amListening},L=function(e){return e.train.marked},x=function(e){return e.train.rawTranscript},W=function(e){return e.train.preview},M=function(e){return e.train.classification},F=function(e){return function(t,n){var r=n().train;return t(R(e.toLowerCase().trim())),"test"===e.toLowerCase().trim()?(t(T("TESTING")),void t(_(!0))):("mark"===e.toLowerCase().trim()&&(console.log("marking"),t(y(!0)),console.log("calling mark!"),g()({method:"get",url:"/mark"})),"end"===e.toLowerCase().trim()&&(console.log("end mark"),t(y(!1)),console.log("calling END mark!"),g()({method:"get",url:"/endmark"})),"train"===e.toLowerCase().trim()&&r.status!=I.TRAINING?(t(h()),t(T("TRAINING")),void function(e,t){var n=new EventSource("/trains");n.onopen=function(){console.log("connection successfully opened!!")},n.onerror=function(e){console.log("error connecting",e),n.close()},n.onmessage=function(r){-1!==r.data.indexOf("StreamExecutor")||-1!==r.data.indexOf("COMPLETE")?(console.log("FINISHED TRAINING"),t(),n.close()):e(r.data)}}((function(e){t(j(e))}),(function(){t(h())}))):-1!==["done","ok"].indexOf(e.toLowerCase().trim())?(t(h()),void g()({method:"get",url:"/done"})):"cancel"!==e.toLowerCase().trim()?r.status===I.AWAITING_CONFIRMATION&&"ready"===e.toLowerCase().trim()?(t(T("RECORDING_COUNTDOWN")),void t(U(r))):void t(p(e)):void t(h()))}},U=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(r){r(T(E[n])),5==n&&(console.log("calling record with ",t),r(_(!1)),O(t.gesture)),n<5&&(r(_(!0)),setTimeout((function(){return e(t,++n)(r)}),1e3))}},D=w.reducer,H=n(20),B=n.n(H),z=n(35),P=function(){var e=Object(z.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({audio:!1,video:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(e){var t=Object(r.useState)(!1),n=Object(s.a)(t,2),a=n[0],o=n[1],i=Object(r.useState)(null),c=Object(s.a)(i,2),u=c[0],l=c[1],d=Object(r.useState)(""),m=Object(s.a)(d,2),f=m[0],g=m[1],O=Object(r.useState)(!0),I=Object(s.a)(O,2),E=I[0],v=I[1];return Object(r.useEffect)((function(){!u&&e.current&&(e.current instanceof HTMLVideoElement&&l(e.current))}),[e,u]),function(e){var t=Object(r.useRef)(e);Object(r.useEffect)((function(){t.current=e}),[e]),Object(r.useEffect)((function(){return function(){}}),[])}(u),Object(r.useEffect)((function(){u&&!a&&E&&P().then((function(e){u.srcObject=e,o(!0)})).catch((function(e){g(e.message),v(!1)}))}),[u,a,E]),Object(r.useEffect)((function(){var t=e.current;E?t.play():t.pause()}),[E,e]),[u,a,E,v,f]},J=n(13),K=n.n(J);function Y(){var e="undefined"!==typeof window&&(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.msSpeechRecognition||window.oSpeechRecognition),t=e?new e:null;t.continous=!0,t.interimResults=!0,t.lang="en-US";var n=Object(r.useState)(),o=Object(s.a)(n,2),i=(o[0],o[1],Object(u.c)(G)),l=Object(u.c)(k),m=Object(u.c)(C),f=Object(u.c)(L),O=Object(u.c)(x),E="recording"===Object(u.c)(A),v=Object(u.c)(W),w=Object(u.c)(M),N=Object(u.b)(),p="",T="";t.onend=function(){p="",t.start()},t.onresult=function(e){T="";for(var t=e.resultIndex;t<e.results.length;t++){var n=e.results[t][0].transcript;e.results[t].isFinal?p+=n+" ":N(F(T+=n))}N(F(p))};var h=Object(r.createRef)(),R=Object(r.createRef)(),_=V(h),j=Object(s.a)(_,5),y=(j[0],j[1],j[2],j[3],j[4],function(e,t){setInterval((function(){var n;e.getContext("2d").drawImage(t,0,0,128,128),N((n=e.toDataURL("image/png"),function(e,t){var r=t().train;r.status===I.RECORDING&&g()({method:"post",url:"/image",data:{image:n}}),r.status===I.TESTING&&g()({method:"post",url:"/classify",data:{image:n}}).then((function(t){var n=t.data.category;e(S(void 0===n?"unknown":n))}))}))}),1e3)});return a.a.createElement("div",{className:"App-content"},a.a.createElement("div",{style:{padding:"0px 100px 100px 100px"}},a.a.createElement(a.a.Fragment,null,a.a.createElement("video",{className:d()(Object(c.a)({},K.a.vcontainer,f)),style:{display:E||v?"block":"none"},ref:h,autoPlay:!0,muted:!0,controls:!0,width:"auto",height:400}),a.a.createElement("canvas",{style:{display:"none"},ref:R,width:128,height:128}),v&&"unknown"!=w.trim()&&a.a.createElement("div",{className:K.a.classification},w)),a.a.createElement("div",{style:{fontSize:80,fontWeight:700,textTransform:"uppercase",marginBottom:30}},i),m&&a.a.createElement("div",{style:{color:"#736A6A"},dangerouslySetInnerHTML:{__html:l}}),!m&&a.a.createElement("button",{id:"microphone-btn",className:K.a.button,onClick:function(){p="",console.log("in handle listener: am listening",m),m||(N(b(!0)),y(R.current,h.current),console.log("OK STARTING LISTENING!"),t.start())}},"START LISTENING")),""!=O.trim()&&a.a.createElement("div",{className:K.a.footer},'"'.concat(O,'"')))}var $=Object(m.b)({name:"review",initialState:{images:[]},reducers:{setImages:function(e,t){e.images=t.payload}}}),q=$.actions.setImages,Q=function(e){return e.review.images},X=$.reducer,Z=n(14),ee=n.n(Z);function te(){var e=Object(u.b)(),t=Object(u.c)(Q),n=Object(r.useState)(-1),o=Object(s.a)(n,2),i=o[0],l=o[1],m=Object(r.useState)(-1),f=Object(s.a)(m,2),O=f[0],I=f[1];Object(r.useEffect)((function(){e((function(e,t){console.log("nice, fetching images!!"),g()({method:"get",url:"/marked"}).then((function(t){var n=t.data||[];e(q(n))}))})),e(h())}),[]);return a.a.createElement("div",{className:ee.a.topcontainer},t.map((function(e,n){var r,o=-1!=i&&-1!=O,s=o&&n>=Math.min(i,O)&&n<=Math.max(i,O),u=!o&&n==Math.min(i,O),m=!o&&n==Math.max(i,O),f=d()((r={},Object(c.a)(r,ee.a.marked,s),Object(c.a)(r,ee.a.start,u),Object(c.a)(r,ee.a.end,m),r));return a.a.createElement("img",{onClick:function(){return function(e){-1!==i&&-1!==O?(l(t.indexOf(e)),I(-1)):-1==i?l(t.indexOf(e)):I(t.indexOf(e))}(e)},className:f,src:e,width:"128px",height:"128px"})})))}n(65);var ne=n(23),re=n(9);var ae=function(){return a.a.createElement(ne.a,null,a.a.createElement("div",{className:"App"},a.a.createElement(ne.b,{to:"/review"},"Review"),a.a.createElement(re.c,null,a.a.createElement(re.a,{path:"/review"},a.a.createElement(te,null)),a.a.createElement(re.a,{path:"/"},a.a.createElement(Y,null)))))},oe=Object(m.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),ie=oe.actions,ce=(ie.increment,ie.decrement,ie.incrementByAmount,oe.reducer),se=Object(m.a)({reducer:{counter:ce,train:D,review:X}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(u.a,{store:se},a.a.createElement(ae,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.22c8da6e.chunk.js.map