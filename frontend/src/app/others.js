import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players : [
        {
            player : {name : "dummy"},	
            location : {
                y:0,
                x:0
            },
        }
    ]
}

export const othersSlice = createSlice({
  name: 'others',
  initialState,
  reducers: {
    // changeLocation: (state, action) => {
    //   state.location = action.payload;
    // },
    setOtherPlayer: (state, action) => {

        console.log(action.payload);

        // 이미 존재하면
        for (const idx of state.players.keys()) {
            if(state.players[idx].player.name === action.payload.player.name) {
                state.players[idx].location = action.payload.location;
                return;
            }
        }

        // 이름이 없으면 추가
        state.players = [...state.players, action.payload] 
    }
  },
});

export const { setOtherPlayer } = othersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOther = (state) => state.others;


export default othersSlice.reducer;
