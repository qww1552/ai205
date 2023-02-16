import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

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
    },
    setInit: (state, action) =>{
      state = {
        // Todo: 대충 결과를 저장하는 변수
        result : []
        
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
}
});

export const { setResult, setInit } = resultSlice.actions;


export const selectResult = (state) => state.result;


export default resultSlice.reducer;
