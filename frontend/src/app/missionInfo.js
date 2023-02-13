import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 전체 미션 진행도 (백분율)
  totalMissionProgress: 0,
  // 미션에 인접해 있는지 체크
  isAdjacentMissionBtn: false,
  // 내 미션 리스트
  myMissionList: [
  ],

}

export const missionInfoSlice = createSlice({
  name: 'missionInfo',
  initialState,
  reducers: {
    setTotalMissionProgress: (state, action) => {
      state.totalMissionProgress = action.payload;
    },

    setAdjacentMissionBtn: (state, action) => {
      
      state.isAdjacentMissionBtn = action.payload;
      console.log(state.isAdjacentMissionBtn)
    },

    setMissionById: (state, action) => {
      const idx = state.myMissionList.findIndex(v => v.id === action.payload.id)
      state.myMissionList[idx] = { ...state.myMissionList[idx], solved: action.payload.solved }
    }

  },
});

export const { setTotalMissionProgress, setAdjacentMissionBtn, setMissionById } = missionInfoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: useSelector((state: RootState) => state.counter.value)
export const selectMissionInfo = (state) => state.missionInfo;

export default missionInfoSlice.reducer;
