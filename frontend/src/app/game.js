import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	player : "user",	
	location : {
		y:0,
		x:0
	},
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { changeLocation } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;


export default gameSlice.reducer;
