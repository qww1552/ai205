import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 내 플레이어 정보
  player: { id: "player1" , isAlive: true , role : "CITIZEN", missions: []},
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
    },
    setMyIsSpeakingTrue: (state, action) => {
      // console.log('내가 말을 하는중')
      return {
        ...state,
        isSpeaking: true
      }
    },
    setMyIsSpeakingFalse:(state, action) => {
      // console.log('내가 말을 안하는중')
      return {
        ...state,
        isSpeaking: false
      }      

    },
    setMission:(state, action) => {
      
      state.player.missions = [...state.player.missions, {...action.payload, isComplete: false}]
      // console.log(state.player.missions)
    },
    // 미션컴플리트
    setMissionComplete:(state, action) => {
      for(let i=0; i<state.player.missions.length; i++) {

        if (state.player.missions[i].id === action.payload.id) {
          const title = state.player.missions[i].title
          state.player.missions = [
            ...state.player.missions.filter((mission) => mission.id !== action.payload.id), 
            {id:action.payload.id, title:title, isComplete:true} ];
            break;
        }
      }
    }
  },

  
});

export const { changeLocation, setPlayer, addPlayerVideo, removePlayerVideo, setMySoundOn, setMySoundOff, setMyVideoOn, setMyVideoOff, setMyIsSpeakingTrue, setMyIsSpeakingFalse, setMission, setMissionComplete} = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMe = (state) => state.me;

export default meSlice.reducer;
