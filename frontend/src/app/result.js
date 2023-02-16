import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Todo: 대충 결과를 저장하는 변수
  result : []
  
}

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload.result
    }
  },
});

export const { setResult } = resultSlice.actions;


export const selectResult = (state) => state.result;


export default resultSlice.reducer;
