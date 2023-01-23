import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import meReducer from 'app/me'
import othersReducer from 'app/others'
import mySaga from './saga/sgags';

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    me: meReducer,
    others : othersReducer,
  },
  middleware: [sagaMiddleware]
},
);

export const action = (type, payload) => store.dispatch({type, payload})

sagaMiddleware.run(mySaga);
