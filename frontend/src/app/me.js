import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	player : {name : "player1"},	
	location : {
		y:0,
		x:0
	},
}

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    }
  },
});

export const { changeLocation, setPlayer } = meSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMe = (state) => state.me;


export default meSlice.reducer;
