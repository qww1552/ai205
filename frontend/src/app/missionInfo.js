import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// 전체 미션 진행도 (백분율)
	totalMissionProgress : 70,
	// 내 미션 리스트
	myMissionList : [
		{id : "missionId", solved : false}
	],
	
}

export const missionInfoSlice = createSlice({
  name: 'missionInfo',
  initialState,
  reducers: {
    setTotalMissionProgress: (state, action) => {
      state.totalMissionProgress = action.payload
    },
    addMyMissionList: (state, action) => {
      state.myMissionList = [...state.myMissionList, action.payload]
    }
  },
});

export const { setTotalMissionProgress,addMyMissionList } = missionInfoSlice.actions;


export const selectMissionInfo = (state) => state.missionInfo;


export default missionInfoSlice.reducer;
