import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 회의 버튼에 인접해 있는지 체크하는 변수
  isAdjacentMeetingBtn: false,

  // 회의가 진행중인지 체크하는 변수
  isInMeeting: false,
  // 투표가 진행중인지 체크하는 변수
  isInVote: false,
  // 투표가 끝났는지 체크하는 변수
  isInVoteResult: false,
}

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState,
  reducers: {
    setAdjacentMeetingBtn: (state, action) => {
      state.isAdjacentMeetingBtn = action.payload;
    },
    setInMeeting: (state, action) => {
      state.isInMeeting = action.payload;
    },
    setInVote: (state, action) => {
      state.isInVote = action.payload;
    },
    setInVoteResult: (state, action) => {
      state.isInVoteResult = action.payload;
    },
  },
});

export const { setAdjacentMeetingBtn,setInMeeting,setInVote,setInVoteResult } = gameInfoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGameInfo = (state) => state.gameInfo;


export default gameInfoSlice.reducer;
