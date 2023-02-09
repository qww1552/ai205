import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 내 플레이어 정보
  player: { id: "player1" , isAlive: true},
  location: {
    y: 0,
    x: 0,
  },
  connectionId: undefined,
  streamManager: undefined,
  session: undefined,
  adjustPlayer: null,
  adjustBody: null,
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = {...state.location, x : action.payload.x, y : action.payload.y};
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    addPlayerVideo: (state, action) => {
      return  {
        ...state,
        connectionId: action.payload.connectionid,
        streamManager: action.payload.streamManager,
        session: action.payload.session,
        mutedSound: false,
        mutedVideo: false
      };
    },
    removePlayerVideo: (state, action) => {
      return {
        ...state,
        connectionId: undefined,
        streamManager: undefined,
        session: undefined,
        mutedSound: false,
        mutedVideo: false
      };
    },
    setMySoundOn(state, action) {
      return {
        ...state,
        mutedSound: false,
      };
    },
    setMySoundOff(state,action){
      return {
        ...state,
        mutedSound: true,
      };
    },
    setMyVideoOn(state, action) {
      return {
        ...state,
        mutedVideo: false
      };
    },
    setMyVideoOff(state, action){
      return {
        ...state,
        mutedVideo: true
      };
    },
    setAdjustPlayer: (state, action) => {
      state.adjustPlayer = action.payload
    },
    setAdjustBody: (state, action) => {
      state.adjustBody = action.payload
    }
  },
});

export const { changeLocation, setPlayer, addPlayerVideo, removePlayerVideo, setMySoundOn, setMySoundOff, setMyVideoOn, setMyVideoOff} = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMe = (state) => state.me;

export default meSlice.reducer;
