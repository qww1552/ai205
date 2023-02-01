import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mySessionId: "SessionA",
  myUserName: "Participant" + Math.floor(Math.random() * 100),
  videoOpen: false,
  chatOpen: false,
  videoUsers: [],
  mainUser: {},
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
    setChatOpen(state, action) {
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
      console.log("setSound!!!!");
      console.log(state.mainUser);
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
      console.log("setVideo!!!!");
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
  },
});

export const {
  setMySessionId,
  setMyUserName,
  setVideoOpen,
  setChatOpen,
  addVideoUsers,
  deleteVideoUsers,
  addMainUser,
  removeMainUser,
  mutedSound,
  mutedVideo,
} = videoInfoSlice.actions;

export const selectMySessionId = (state) => state.videoInfo.mySessionId;
export const selectMyUserName = (state) => state.videoInfo.myUserName;
export const selectVideoOpen = (state) => state.videoInfo.videoOpen;
export const selectChatOpen = (state) => state.videoInfo.chatOpen;
export const selectVideoUsers = (state) => state.videoInfo.videoUsers;
export const selectMainUser = (state) => state.videoInfo.mainUser;

export default videoInfoSlice.reducer;
