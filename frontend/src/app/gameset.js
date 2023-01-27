import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Todo: 대충 게임에 필요한 세팅을 저장하는 변수
  time : 0,
  
}

export const gamesetSlice = createSlice({
  name: 'gameset',
  initialState,
  // 투표시간을 바꾼다
  reducers: {
    gamesetTime: (state, action) => {
      state.time = action.payload
    },
  },
});

export const { gamesetTime } = gamesetSlice.actions;


export const selectGameset = (state) => state.gameset;


export default gamesetSlice.reducer;
