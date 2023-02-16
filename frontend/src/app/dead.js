import { createSlice } from '@reduxjs/toolkit';
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
});


export const selectDead = (state) => state.dead;
export const {setInit} = deadSlice.actions;

export default deadSlice.reducer;
