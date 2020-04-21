import React, { useState, useRef, useEffect, createRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getListening,
    getGesture,
    getStatus,
    getRawTranscript,
    getInstructions,
    handleGesture,
    handleImage,
    startedListening,
} from '../../trainSlice';

import { useCamera } from './useCamera';
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

  const [src, setSrc] = useState()
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
  const videoRef = createRef();
  const canvasRef = createRef();
  const [video, isCameraInitialised, running, setPlaying, error] = useCamera(videoRef);

  const renderCamera = ()=>{

    return <><video
    style={{display: amRecording ? "block" : "none"}}
    ref={videoRef}
    autoPlay={true}
    muted={true}
    controls
    width={600}
    height={400}/>
    <canvas style={{display:"none"}}ref={canvasRef} width={128} height={128}/></>
  }
  
 
  const streamPhotos = (canvas, video)=>{
      
      setInterval(()=>{
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 128, 128);
        dispatch(handleImage(canvas.toDataURL('image/png')));
        
      },500);
  }

  const takePicture = ()=>{
    streamPhotos(canvasRef.current, videoRef.current);
  }
  

  return (
    <>
      <div style={{padding:"0px 100px 100px 100px"}}>
        {renderCamera()}
        <div style={{fontSize:80, fontWeight:700, textTransform:"uppercase", marginBottom:30}}>{gesture}</div>
        {amListening && <div style={{color:"#736A6A"}} dangerouslySetInnerHTML={{__html:instructions}}/>}
        {!amListening && <button id='microphone-btn' className={styles.button} onClick={handleListen}>START LISTENING</button>}
        <button onClick={takePicture}>TAKE PICTURE</button>
    </div>
     {rawTranscript.trim()!="" && <div className={styles.footer}>{`"${rawTranscript}"`}</div>}
     </>
  );
}
