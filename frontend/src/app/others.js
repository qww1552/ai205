import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // 다른 플레이어 수
    otherPlayersCnt : 0,

    // 다른 플레이어 정보
    players : [

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

        // 이미 존재하면
        for (const idx of state.players.keys()) {
            if(state.players[idx].player.id === action.payload.player.id) {
                state.players[idx].location = action.payload.location;
                return;
            }
        }

        // 이름이 없으면 추가
        state.players = [...state.players, action.payload]
        state.otherPlayersCnt += 1;
    }
  },
});

export const { setOtherPlayer } = othersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOtherPlayersCnt = (state) => state.others.otherPlayersCnt;
export const selectOhterPlayers = (state) => state.others.players;


export default othersSlice.reducer;
