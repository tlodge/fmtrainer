import React, { useState, useEffect, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getListening,
    getGesture,
    getStatus,
    getRawTranscript,
    getInstructions,
    handleGesture,
    startedListening,
} from '../../trainSlice';
import styles from '../../Train.module.css';

//-----------------SPEECH RECOGNITION SETUP---------------------

//------------------------COMPONENT-----------------------------


export default function Main() {
    const BrowserSpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition)

const recognition = BrowserSpeechRecognition ? new BrowserSpeechRecognition() : null
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'


  const gesture = useSelector(getGesture);
  const instructions = useSelector(getInstructions);
  const amListening = useSelector(getListening);
  const rawTranscript = useSelector(getRawTranscript);
  const amRecording = useSelector(getStatus) === "recording";

  const dispatch = useDispatch();
  let finalTranscript = '', interimTranscript='';

  recognition.onend = () => {
    finalTranscript = "";
    recognition.start();
    //dispatch(startedListening(false));
    //handleListen();
    //}else{
    //  console.log("not calling restart!!");
    //}
  }

  recognition.onresult = event => {    
        
    interimTranscript = ''
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal){ 
        finalTranscript += transcript + ' ';
      }
      else{ 
        interimTranscript += transcript;
        dispatch(handleGesture(interimTranscript));
      }
    }
    dispatch(handleGesture(finalTranscript));
  }
  //useEffect(() => {
    //setTimeout(()=>setListening(false), 5000);
  //}, []);
 


  const handleListen = ()=>{ 
      // handle speech recognition here
      finalTranscript = "";
      console.log("in handle listener: am listening", amListening);
      
      if (!amListening) {
        dispatch(startedListening(true));
        console.log("OK STARTING LISTENING!");
        recognition.start();
      } 
  } 

  return (
    <>
      <div style={{padding:100}}>
        {amRecording && <img src="face.jpg"/>}
        <div style={{fontSize:80, fontWeight:700, textTransform:"uppercase", marginBottom:30}}>{gesture}</div>
        {amListening && <div style={{color:"#736A6A"}} dangerouslySetInnerHTML={{__html:instructions}}/>}
        {!amListening && <button id='microphone-btn' className={styles.button} onClick={handleListen}>START LISTENING</button>}
       
    </div>
     {rawTranscript.trim()!="" && <div className={styles.footer}>{`"${rawTranscript}"`}</div>}
     </>
  );
}