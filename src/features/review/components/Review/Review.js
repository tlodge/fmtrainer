import React, { useState, useRef, useEffect, createRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchImages} from '../../reviewSlice';



export default function Review() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchImages());        
    },[]);

    return <h1>Review</h1>
}