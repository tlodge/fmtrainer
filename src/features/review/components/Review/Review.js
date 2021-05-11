import React, { useState, useRef, useEffect, createRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchImages, getImages, getTotal, getCategories, labelImages} from '../../reviewSlice';
import {reset} from '../../../train/trainSlice';
import cn from 'classnames';
import styles from '../../Review.module.css';



export default function Review() {
    const dispatch = useDispatch();
    const images = useSelector(getImages);
    const total = useSelector(getTotal);
    const categories = useSelector(getCategories);
    const [startImage, setStartImage] = useState(-1);
    const [endImage, setEndImage] = useState(-1);

    useEffect(() => {
        dispatch(fetchImages());
        dispatch(reset());        
    },[]);
    
   const markImage= (i)=>{
        if (startImage !== -1 && endImage !== -1){
            setStartImage(images.indexOf(i));
            setEndImage(-1);
        }
        else if (startImage==-1){
            setStartImage(images.indexOf(i));
        }else{
            setEndImage(images.indexOf(i));
        }
   }

   const selectCategory = (category)=>{
       dispatch(labelImages({
                                category, 
                                startImage:Math.min(startImage, endImage), 
                                endImage: Math.max(startImage, endImage)
                            }));
   }


   const renderSelectCategory = ()=>{
        const bothselected = startImage != -1 && endImage != -1;
        if (bothselected){
            const _categories = Object.keys(categories).map(k=>{
                return <div onClick={()=>{selectCategory(categories[k])}} className={styles.category}>{k}</div>
            });

            return <div className={styles.categorybar}>
                      {_categories}    
                    </div>
        }
   }

   const renderImageSummary = ()=>{
        return <div>{`showing ${images.length} images of ${total}`}</div>
   }

   const renderImages = ()=>{
    return images.map((i, idx)=>{
        
        const bothselected = startImage != -1 && endImage != -1;

        const inrange = bothselected && idx >= Math.min(startImage,endImage) && idx <= Math.max(startImage,endImage);
        const amstart = !bothselected && idx == Math.min(startImage,endImage);
        const amend = !bothselected && idx ==  Math.max(startImage,endImage);

        const className=cn({
                                [styles.marked]:inrange,
                                [styles.start]:amstart,
                                [styles.end]: amend,
                                [styles.imagecontainer]: true,
                            });
        const rnd =  Math.random().toString(36).substring(7);
        return <img onClick={()=>markImage(i)} className={className} src={`${i}?q=${rnd}`} width="128px" height="128px"></img>
    })
   }

    return <>
                {renderImageSummary()}
                <div className={styles.topcontainer}>
                    {renderImages()}
                </div>
                {renderSelectCategory()}
            </>
}
