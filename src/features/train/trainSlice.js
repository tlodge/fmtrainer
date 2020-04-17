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

const train = ()=>{
 axios({
   method:"get",
   url : '/train',
  });
}

const done = ()=>{
 axios({
   method:"get",
   url : '/done',
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
    "RECORDING": "recording"
}

const COUNTDOWN = ["FIVE", "FOUR", "THREE", "TWO", "ONE", "RECORDING"];

const INSTRUCTIONS = {
  "NOT_LISTENING"         : "press button to start listening for instructions",
  "AWAITING_GESTURE"      : `say <strong>train</strong> followed by the <strong><i>name of the gesture</i></strong> you'd like to train`,
  "AWAITING_CONFIRMATION" : `say <strong>ready</strong> to start recording a gesture with this name or <strong>cancel</strong> to restate gesture`,
  "FIVE" : "recording in <strong>five</strong> seconds...",
  "FOUR" : "recording in <strong>four</strong> seconds...",
  "THREE" : "recording in <strong>three</strong> seconds...",
  "TWO" : "recording in <strong>two</strong> seconds...",
  "ONE" : "recording in <strong>one</strong> second!",
  "RECORDING" : `record gesture, say <strong>ok</strong> or <strong>done</strong> when done, or <strong>cancel</strong> to discard`, 
}

export const trainSlice = createSlice({
  name: 'train',

  initialState: {
    amListening: false,
    status: STATUSES["NOT_LISTENING"],
    instructions: INSTRUCTIONS["NOT_LISTENING"],
    gesture: "",
    rawTranscript: "",
  },
  
  reducers: {

    setStatus: (state, action)=>{
      state.status = STATUSES[action.payload];
      state.instructions = INSTRUCTIONS[action.payload];
    },

    setRawTranscript: (state, action)=>{
      state.rawTranscript = action.payload;
    },

    reset: (state, action)=>{
      state.status       = STATUSES["AWAITING_GESTURE"]
      state.instructions =  INSTRUCTIONS["AWAITING_GESTURE"] 
      state.gesture = ""
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

      const index = action.payload.toLowerCase().indexOf("train");
      
      if (index !== -1){
        state.gesture  = `${action.payload.substring(index+5).trim()}`;
        state.status=  STATUSES["AWAITING_CONFIRMATION"]
        state.instructions =  INSTRUCTIONS["AWAITING_CONFIRMATION"]
      }//else{
       // state.command = "";
      //}
    },
  },
});

export const {setGesture, setStatus, startedListening, amListening, reset, setRawTranscript } = trainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getGesture = state => state.train.gesture;
export const getStatus =  state => state.train.status;
export const getInstructions = state => state.train.instructions;
export const getListening = state => state.train.amListening;
export const getRawTranscript = state => state.train.rawTranscript;

export const handleGesture = (action) => (dispatch, getState) =>{

  const state = getState().train;
  
  dispatch(setRawTranscript(action.toLowerCase().trim()));

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
      record(state.gesture);
    }    
  
    if (index<5){
      setTimeout(()=>startCountdown(state, ++index)(dispatch), 1000);
    }
}


export default trainSlice.reducer;
