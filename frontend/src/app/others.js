import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players : [
        {name : "ohterPlayer1"}
    ]
}

export const othersSlice = createSlice({
  name: 'others',
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

export const { changeLocation, setPlayer } = othersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOther = (state) => state.others;


export default othersSlice.reducer;
