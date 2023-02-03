import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import meReducer from 'app/me'
import othersReducer from 'app/others'
import resultReducer from 'app/result'
import gamesetReducer from './gameset';
import mySaga from './saga/sgags';
import gameInfoReducer from 'app/gameInfo'
import voteReducer from 'app/voteInfo'
import videoReducer from 'app/videoInfo'
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

// import storage from 'redux-persist/lib/storage'; // 로컬 스토리지
import storageSession from 'redux-persist/lib/storage/session' // 세션 스토리지

const persistConfig = {
  key: 'root',
  storage : storageSession,
  // whitelist: ['user'] // 해당 reducer만 저장
  blacklist: ['me', 'others'] // 해당 reducer만 제외
};

const reducers = combineReducers({
  me: meReducer,
  others: othersReducer,
  gameInfo: gameInfoReducer,
  result: resultReducer,
  gameset: gamesetReducer,
  voteInfo: voteReducer,
  videoInfo: videoReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(mySaga);

const persistor = persistStore(store);

const action = (type, payload) => store.dispatch({ type, payload })

export {store, persistor, action}
