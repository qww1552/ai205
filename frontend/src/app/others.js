import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  // 다른 플레이어 수
  otherPlayersCnt: 0,

  // 다른 플레이어 정보
  players: [],
};

export const othersSlice = createSlice({
  name: "others",
  initialState,
  reducers: {
    // changeLocation: (state, action) => {
    //   state.location = action.payload;
    // },
    setOtherPlayer: (state, action) => {
      // 이미 존재하면
      for (const idx of state.players.keys()) {
        if (state.players[idx]?.player.id === action.payload.player.id) {

          state.players[idx].player = {
            ...state.players[idx].player,
            isAlive : action.payload.player.isAlive,
          }
          state.players[idx].location = action.payload.location;
          return;
        }
      }
    },


    // 다른 플레이어들 초기화
    initOtherPlayer: (state, action) => {
      // 이미 존재하면
      for (const idx of state.players.keys()) {
        if (state.players[idx]?.player.id === action.payload.id) {
          return;
        }
      }

      // 이름이 없으면 추가
      state.players = [...state.players, { player: { id: action.payload.id, isAlive: true, isVoted: false } , location : {x : 0, y : 0} }];
      state.otherPlayersCnt += 1;
    },

    // 아이디 투표 세팅
    setVote: (state, action) => {
      for (const idx of state.players.keys()) {
        if (state.players[idx].player.id === action.payload.id) {
          state.players[idx].player.isVoted = action.payload.value;
          return;
        }
      }
    },
    // 모든 플레이어 투표 초기화
    setAllVoteFalse: (state, action) => {
      for (const player of state.players) {
        player.isVoted = false;
      }
    },
    setOtherPlayerVideoInfo: (state, action) => {
      for (const idx of state.players.keys()) {
        if (state.players[idx].player.id === action.payload.nickname) {
          state.players[idx] = {
            ...state.players[idx],
            streamManager: action.payload.streamManager,
            connectionId: action.payload.connectionId,
            isSpeaking: action.payload.isSpeaking,
          };
          return;
        }
      }
    },
    removeOtherPlayerVideoInfo: (state, action) => {
      for (const idx of state.players.keys()) {
        if (state.players[idx].player.id === action.payload.nickname) {
          state.players[idx] = {
            ...state.players[idx],
            streamManager: undefined,
            connectionId: undefined,
            isSpeaking: undefined,
          };
          return;
        }
      }
    },
    setIsSpeakingTrue(state, action) {
      for (let i = 0; i < state.players.length; i++) {

        if (state.players[i].connectionId === action.payload) {
          // console.log(state.videoUsers[i].nickname,state.videoUsers[i].connectionId,"이 말하는중")
          state.players[i] = { ...state.players[i], isSpeaking: true }
        }
      }
    },
    setIsSpeakingFalse(state, action) {
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].connectionId === action.payload) {
          state.players[i] = { ...state.players[i], isSpeaking: false }
        }
      }
    },
  },
});

export const { setOtherPlayer, setOtherPlayerVideoInfo,setIsSpeakingFalse, setIsSpeakingTrue, removeOtherPlayerVideoInfo  } = othersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOtherPlayersCnt = (state) => state.others.otherPlayersCnt;
export const selectOhterPlayers = (state) => state.others.players;

export default othersSlice.reducer;
