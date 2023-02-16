import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  win: "",

  players: [{ id:"", alive:"", role:""},],
}

export const gameResultSlice = createSlice({
  name: 'gameResult',
  initialState,
  reducers: {
    setGameResult: (state, action) => {
      
      state.gameResult = action.payload

    },
    setInit:(state, action) => {
      state = {

        win: "",
      
        players: [{ id:"", alive:"", role:""},],
      }
    }
  },
});

// export const { changeLocation, setPlayer } = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGameResult = (state) => state.gameResult;
export const {setInit} = gameResultSlice.actions;


export default gameResultSlice.reducer;
