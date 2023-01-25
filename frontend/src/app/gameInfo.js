import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adjacentConferBtn: false,
    
}

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState,
  reducers: {
    setAdjacentConferBtn: (state, action) => {
      state.adjacentConferBtn = action.payload;
    }
  },
});

// export const { changeLocation, setPlayer } = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGameInfo = (state) => state.gameInfo;


export default gameInfoSlice.reducer;
