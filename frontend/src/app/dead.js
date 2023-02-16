import { createSlice } from '@reduxjs/toolkit';

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
    }
  },
});


export const selectDead = (state) => state.dead;


export default deadSlice.reducer;
