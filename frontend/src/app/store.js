import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import meReuducer from './me'
import mySaga from './saga/sgags';

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    me: meReuducer,
  },
  middleware: [sagaMiddleware]
},
);

sagaMiddleware.run(mySaga);
