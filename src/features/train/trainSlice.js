import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const sendit =  ()=>{
  axios({
    method:"post",
    url : '/set_gesture',
    data : {
        hello: "world"
    }
  });
}

const record = (gesture)=>{
  axios({
   method:"get",
   url : encodeURIComponent(`/record/${gesture}`),
  });
}

const train = (ondata, amdone)=>{
  
  const source = new EventSource('/trains');

  source.onopen = ()=>{
    console.log("connection successfully opened!!");
  }
  source.onerror = (err)=>{
    console.log("error connecting", err);
    source.close();
  }
  source.onmessage = function(e) {
    if (e.data.indexOf("StreamExecutor") !== -1 || e.data.indexOf("COMPLETE") !==-1){
      console.log("FINISHED TRAINING")
      amdone();
      source.close();
    }else{
      ondata(e.data);
    }
  }

 /*axios({
   method:"get",
   url : '/train',
  });*/
}

const done = ()=>{
 axios({
   method:"get",
   url : '/done',
  });
}

const mark = ()=>{
  console.log("calling mark!")
  axios({
    method:"get",
    url : '/mark',
   });
 }

 const endmark = ()=>{
  console.log("calling END mark!")
  axios({
    method:"get",
    url : '/endmark',
   });
 }

const STATUSES = {
    "NOT_LISTENING" : "not listening",
    "AWAITING_GESTURE" : "awaiting gesture",
    "AWAITING_CONFIRMATION" : "awaiting confirmation",
    "FIVE" : "5",
    "FOUR" : "4",
    "THREE" : "3",
    "TWO" : "2",
    "ONE" : "1",
    "RECORDING": "recording",
    "TRAINING":"training",
    "TESTING":"testing",
    "CALIBRATING":"calibrating"
}

const COUNTDOWN = ["FIVE", "FOUR", "THREE", "TWO", "ONE", "RECORDING"];

const INSTRUCTIONS = {
  "NOT_LISTENING"         : "press button to start listening for instructions",
  "AWAITING_GESTURE"      : `say <strong>record</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train`,
  "AWAITING_CONFIRMATION" : `say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture`,
  "FIVE" : "recording in <strong>five</strong> seconds...",
  "FOUR" : "recording in <strong>four</strong> seconds...",
  "THREE" : "recording in <strong>three</strong> seconds...",
  "TWO" : "recording in <strong>two</strong> seconds...",
  "ONE" : "recording in <strong>one</strong> second!",
  "RECORDING" : `record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard`, 
  "TRAINING" : `now training...this will take a while...`,
  "TESTING" : `now testing what we have learnt!`,
  "CALIBRATING": `line up camera with markers`,
}

export const trainSlice = createSlice({
  name: 'train',

  initialState: {
    amListening: false,
    marked: false,
    status: STATUSES["NOT_LISTENING"],
    instructions: INSTRUCTIONS["NOT_LISTENING"],
    gesture: "",
    rawTranscript: "",
    preview:false,
    classification:"unknown"
  },
  
  reducers: {

    setInstructions: (state, action)=>{
      state.instructions = action.payload;
    },

    setStatus: (state, action)=>{
      state.status = STATUSES[action.payload];
      state.instructions = INSTRUCTIONS[action.payload];
    },

    setPreview: (state, action)=>{
      state.preview=action.payload;
    },

    setMarked: (state, action)=>{
      state.marked=action.payload;
    },

    setRawTranscript: (state, action)=>{
      state.rawTranscript = action.payload;
    },
    setClassification: (state, action)=>{
      state.classification = action.payload;
    },
    reset: (state, action)=>{
      state.status       = STATUSES["AWAITING_GESTURE"]
      state.instructions =  INSTRUCTIONS["AWAITING_GESTURE"] 
      state.gesture = ""
      state.preview = false;
    },

    startedListening: (state, action)=>{
      if (action.payload){
        state.amFinished = false;
        state.amListening = true;
        state.status       = STATUSES["AWAITING_GESTURE"]
        state.instructions =  INSTRUCTIONS["AWAITING_GESTURE"] 
      }else{
        state.status = STATUSES["NOT_LISTENING"]
        state.instructions =  INSTRUCTIONS["NOT_LISTENING"] 
      }
    },
    issueConfirm: (state, action) => {
      state.readytorecord = action.payload.toLowerCase() === "yes";
    },
    setGesture: (state, action) => {
     
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload.trim() === ""){
        return;
      }

      const index = action.payload.toLowerCase().indexOf("record");
      
      if (index !== -1){
        state.gesture  = `${action.payload.substring(index+6).trim()}`;
        state.status=  STATUSES["AWAITING_CONFIRMATION"]
        state.instructions =  INSTRUCTIONS["AWAITING_CONFIRMATION"]
      }//else{
       // state.command = "";
      //}
    },
  },
});

export const {setGesture, setStatus, startedListening, amListening, reset, setRawTranscript, setPreview, setInstructions, setClassification, setMarked} = trainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getGesture = state => state.train.gesture;
export const getStatus =  state => state.train.status;
export const getInstructions = state => state.train.instructions;
export const getListening = state => state.train.amListening;
export const getMarked = state=>state.train.marked;
export const getRawTranscript = state => state.train.rawTranscript;
export const showPreview = state=>state.train.preview;
export const getClassification = state=>state.train.classification;

export const handleImage = (action) => (dispatch, getState)=>{
  const state = getState().train;
  
  if (state.status === STATUSES["RECORDING"]){
    axios({
      method:"post",
      url : '/image',
      data : {image:action}
    });
  }
  if (state.status === STATUSES["TESTING"]){
    axios({
      method:"post",
      url : '/classify',
      data : {image:action}
    }).then((response)=>{
      const {category="unknown"} = response.data;
      dispatch(setClassification(category));
    })
  }
}

export const handleGesture = (action) => (dispatch, getState) =>{

  const state = getState().train;
  
  dispatch(setRawTranscript(action.toLowerCase().trim()));

  if (action.toLowerCase().trim()==="test"){
    dispatch(setStatus("TESTING"));
    dispatch(setPreview(true));
    return;
  }

  if (action.toLowerCase().trim()==="mark"){
      console.log("marking");
      dispatch(setMarked(true));
      mark();
  }

  if (action.toLowerCase().trim()==="end"){
      console.log("end mark");
      dispatch(setMarked(false));
      endmark();
  }
  
  if (action.toLowerCase().trim()==="calibrate"){
    console.log("seen a calibrate!!");
    dispatch(reset());
    dispatch(setStatus("CALIBRATING"));
  }

  if (action.toLowerCase().trim()==="train"){
    if (state.status != STATUSES["TRAINING"]){
      dispatch(reset());
      dispatch(setStatus("TRAINING"));
      train((data)=>{dispatch(setInstructions(data))}, ()=>{
        dispatch(reset())
      });
      return;
    }
  }

  if (["done", "ok"].indexOf(action.toLowerCase().trim()) !== -1){
     dispatch(reset());
     done();
     return;
  }

  if (action.toLowerCase().trim()==="cancel"){
    dispatch(reset());
    return;
  }

  if (state.status===STATUSES["AWAITING_CONFIRMATION"]){ 
    if (action.toLowerCase().trim()==="ready"){
      dispatch(setStatus("RECORDING_COUNTDOWN"));
      dispatch(startCountdown(state));
      return;
    }
  }
  dispatch(setGesture(action));
}

export const startCountdown = (state, index=0) => dispatch =>{

    dispatch(setStatus(COUNTDOWN[index]));  
    
    if (index==5){
      console.log("calling record with ", state);
      dispatch(setPreview(false))
      record(state.gesture);
    }    
  
    if (index<5){
      dispatch(setPreview(true))
      setTimeout(()=>startCountdown(state, ++index)(dispatch), 1000);
    }
}


export default trainSlice.reducer;
