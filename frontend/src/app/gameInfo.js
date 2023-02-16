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
  // 게임 시작했는지 체크하는 변수
  isInGame: false,
  // 채팅창을 열어야 하는지 체크하는 변수
  isChatModalOpen: false,
  // 미션창을 열어야 하는지 체크하는 변수
  isMissionModalOpen: 0,
  unReadMessage:0,
  isGameStop : false,
  isInSabotage: false,
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
    setChatModalOpen: (state, action) => {
      state.isChatModalOpen = action.payload
    },
    setInGame: (state, action) => {
      state.isInGame = action.payload;
    },
    setMissionModalOpen: (state, action) => {
      state.isMissionModalOpen = action.payload
    },
    setunReadMessage: (state, action) => {
      if (state.isChatModalOpen === true) {
        state.unReadMessage = 0
      } else {
        state.unReadMessage = state.unReadMessage+1
      }
    },
    setGameStop: (state, action) => {
      state.isGameStop = action.payload
    },
    setSabotage: (state, action) => {
      state.isInSabotage = action.payload
    }
  },
});

export const {
  setAdjacentMeetingBtn, setInMeeting, setInVote, setInVoteResult, setChatModalOpen, setMissionModalOpen, setunReadMessage 
} = gameInfoSlice.actions;

export const selectGameInfo = (state) => state.gameInfo;


export default gameInfoSlice.reducer