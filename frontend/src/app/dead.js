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
    }
    // gamesetTime: (state, action) => {
    //   state.time = action.payload
    // },
  },
});


export const selectDead = (state) => state.dead;


export default deadSlice.reducer;
