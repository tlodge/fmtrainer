import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const reviewSlice = createSlice({
  name: 'train',

  initialState: {
    images: [],
  },
  
  reducers: {
    setImages: (state, action)=>{
      state.images = action.payload;
    }
  },
});

export const {setImages} = reviewSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getImages = state => state.review.images;


export const fetchImages = (action) => (dispatch, getState)=>{
    console.log("nice, fetching images!!");

    axios({
      method:"get",
      url : '/media/review',
    }).then((response)=>{
      console.log("got image urls", response.data)
      const {images=[]} = response.data;
      dispatch(setImages(images));
    })
}


export const setCategory = (action) => (dispatch, getState) =>{
}



export default reviewSlice.reducer;
