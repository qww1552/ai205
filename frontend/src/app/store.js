import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import meReducer from 'app/me'
import othersReducer from 'app/others'
import mySaga from './saga/sgags';
import gameInfoReducer from 'app/gameInfo'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    me: meReducer,
    others : othersReducer,
    gameInfo : gameInfoReducer
  },
  middleware: [sagaMiddleware]
},
);

export const action = (type, payload) => store.dispatch({type, payload})

sagaMiddleware.run(mySaga);
