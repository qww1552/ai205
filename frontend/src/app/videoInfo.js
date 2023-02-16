import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  mySessionId: "SessionA",
  myUserName: "Participant" + Math.floor(Math.random() * 100),
  videoOpen: false,
  chatOpen: false,
  videoUsers: [],
  mainUser: undefined, // 유저 정보가 아직 들어오지 않았는지를 판별하기 위해 수정함
};

export const videoInfoSlice = createSlice({
  name: "videoInfo",
  initialState,
  reducers: {
    setMySessionId(state, action) {
      state.mySessionId = action.payload;
    },
    setMyUserName(state, action) {
      state.myUserName = action.payload;
    },
    setVideoOpen(state, action) {
      state.videoOpen = action.payload;
    },
    setChatModalOpen(state, action) {
      state.chatOpen = action.payload;
    },
    addVideoUsers(state, action) {
      state.videoUsers = [...state.videoUsers, action.payload];
    },
    deleteVideoUsers(state, action) {
      state.videoUsers = [
        ...state.videoUsers.filter((user) => user.streamManager.stream !== action.payload),
      ];
    },
    addMainUser(state, action) {
      state.mainUser = action.payload;
    },
    removeMainUser(state, action) {
      state.mainUser = undefined;
    },
    mutedSound(state, action) {
      // console.log("setSound!!!!");
      // console.log(state.mainUser);
      if (state.mainUser.streamManager.stream === action.payload.streamManager.stream) {
        state.mainUser = {...state.mainUser, audioActive : !state.mainUser.audioActive}
      } else {
      
        const user = state.videoUsers.filter(
          (user) => user.streamManager.stream === action.payload.streamManager.stream
        )[0];
        user.setAudioActive(!user.isAudioActive());
        state.videoUsers = [
          ...state.videoUsers.filter(
            (user) => user.streamManager.stream !== action.payload.streamManager.stream
          ),
          user,
        ];
      }
    },
    mutedVideo(state, action) {
      // console.log("setVideo!!!!");
      if (state.mainUser.streamManager.stream === action.payload.streamManager.stream) {
          state.mainUser = {...state.mainUser, videoActive : !state.mainUser.videoActive}
      } else {
        const user = state.videoUsers.filter(
          (user) => user.streamManager.stream === action.payload.streamManager.stream
        )[0];
        user.videoActive = !user.videoActive
        state.videoUsers = [
          ...state.videoUsers.filter(
            (user) => user.streamManager.stream !== action.payload.streamManager.stream
          ),
          user,
        ];
      }
    },
    // 발언자 표시를 수정할 함수
    setIsSpeakingTrue(state, action) {
      for (let i = 0; i < state.videoUsers.length; i++) {
        
        if (state.videoUsers[i].connectionId === action.payload) {
          // console.log(state.videoUsers[i].nickname,state.videoUsers[i].connectionId,"이 말하는중")
          state.videoUsers[i] = {...state.videoUsers[i], isSpeaking : true}
        }
      }
    },
    setIsSpeakingFalse(state, action) {
      for (let i = 0; i < state.videoUsers.length; i++) {
        if (state.videoUsers[i].connectionId === action.payload) {
          // console.log(state.videoUsers[i].nickname,state.videoUsers[i].connectionId,"이 말을 멈춤")
          state.videoUsers[i] = {...state.videoUsers[i], isSpeaking : false}
        }
      }
    }
    // 여기까지
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
}
});

export const {
  setMySessionId,
  setMyUserName,
  setVideoOpen,
  setChatModalOpen,
  addVideoUsers,
  deleteVideoUsers,
  addMainUser,
  removeMainUser,
  mutedSound,
  mutedVideo,
  setIsSpeakingFalse,
  setIsSpeakingTrue,
} = videoInfoSlice.actions;

export const selectMySessionId = (state) => state.videoInfo.mySessionId;
export const selectMyUserName = (state) => state.videoInfo.myUserName;
export const selectVideoOpen = (state) => state.videoInfo.videoOpen;
export const selectChatOpen = (state) => state.videoInfo.chatOpen;
export const selectVideoUsers = (state) => state.videoInfo.videoUsers;
export const selectMainUser = (state) => state.videoInfo.mainUser;

export default videoInfoSlice.reducer;
