import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const reviewSlice = createSlice({
  name: 'review',

  initialState: {
    images: [],
    categories: {},
    total: 0,
  },
  
  reducers: {
    setImages: (state, action)=>{ 
      state.images = action.payload.images;
      state.categories = action.payload.categories;
      state.total = action.payload.total;
    }
  },
});

export const {setImages} = reviewSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getImages = state => state.review.images;
export const getTotal = state =>state.review.total;
export const getCategories = state => state.review.categories;

export const fetchImages = (action) => (dispatch, getState)=>{
   
    axios({
      method:"get",
      url : '/marked',
    }).then((response)=>{
      const images = response.data || [];
      dispatch(setImages(images));
    })
}

export const labelImages = (action) => (dispatch, getState)=>{
  const {category, startImage, endImage} = action;
  const images = getState().review.images;
  
  const selected = images.reduce((acc, item, idx)=>{
      if (idx >= startImage && idx <= endImage){
        return [...acc, item];
      }
      return acc;
  },[]);

  console.log("selected", selected, "category", category);

  axios({
    method:"post",
    url : '/label',
    data: {
      images: selected,
      category
    }
  }).then((response)=>{
    dispatch(fetchImages(images));
  }) 
}



export default reviewSlice.reducer;
