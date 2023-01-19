import { configureStore } from '@reduxjs/toolkit';
import meReuducer from './me'

export const store = configureStore({
  reducer: {
    me: meReuducer,
  },
});
