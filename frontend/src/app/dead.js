import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { action } from './store';


const initialState = {
  deadList : []
}

export const deadSlice = createSlice({
  name: 'dead',
  initialState,
  reducers: {
    addDeadList : (state, action) => {
      state.deadList = [...state.deadList, action.payload]
    },
    setDeadList : (state, action) => {
      state.deadList = action.payload
    },
    setInit: (state, action) => {
      state = {
        deadList : []
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
}
});


export const selectDead = (state) => state.dead;
export const {setInit} = deadSlice.actions;

export default deadSlice.reducer;
