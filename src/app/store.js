import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import trainReducer from '../features/train/trainSlice';
import reviewReducer from '../features/review/reviewSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    train: trainReducer,
    review: reviewReducer,
  },
});
