import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import meReducer from 'app/me'
import othersReducer from 'app/others'
import resultReducer from 'app/result'
import gamesetReducer from './gameset';
import mySaga from './saga/sgags';
import gameInfoReducer from 'app/gameInfo'
import voteReducer from 'app/voteInfo'
import videoReducer from 'app/videoInfo'
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    me: meReducer,
    others : othersReducer,
    gameInfo : gameInfoReducer,
    result : resultReducer,
    gameset : gamesetReducer,
    voteInfo : voteReducer,
    videoInfo : videoReducer
  },
  middleware: [sagaMiddleware]
},
);

export const action = (type, payload) => store.dispatch({type, payload})

sagaMiddleware.run(mySaga);
