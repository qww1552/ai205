import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //무효표는 아이디 "skip" 으로
  voteResult: [
    { id: "", from: ["from_id",] },
  ],
  // 당선된 사람
  elected: { id: "", role: "" },

  // 남은 투표권 수
  remainingVoteTicket: 0,
}

export const voteInfoSlice = createSlice({
  name: 'voteInfo',
  initialState,
  reducers: {
    setVoteResult: (state, action) => {
      
      state.voteResult = action.payload
    },
  },
});

// export const { changeLocation, setPlayer } = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectVoteInfo = (state) => state.voteInfo;


export default voteInfoSlice.reducer;
