import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Todo: 대충 게임에 필요한 세팅을 저장하는 변수
  gameSet: {
        "visionRange": 1,
        "playerSpeed": 1,
        "meetingLimitTime": 20,
        "voteLimitTime": 10,
        "killCoolTime": 10,
        "meetingCoolTime": 15
  }
  
}

export const gamesetSlice = createSlice({
  name: 'gameSet',
  initialState,
  reducers: {
    setGameSet: (state, action) => {
      state.gameSet = action.payload
      console.log(state.gameSet)
    },
  },
});

export const { setGameSet } = gamesetSlice.actions;


export const selectGameset = (state) => state.gameSet;


export default gamesetSlice.reducer;
