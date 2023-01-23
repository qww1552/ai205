import { call, put, takeEvery, take, takeLatest, delay, select } from 'redux-saga/effects'
import { createClient, connectClient, send } from 'api/socket';


// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//    try {
//     //   const user = yield call(Api.fetchUser, action.payload.userId);
//       yield put({type: "USER_FETCH_SUCCEEDED", user: []});EW
//    } catch (e) {
//       yield put({type: "USER_FETCH_FAILED", message: e.message});
//    }
// }

// /*
//   Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
//   Allows concurrent fetches of user.
// */
let stompClient;

function* initializeStompChannel() {
  yield startStomp();
}

function* startStomp() {
  stompClient = yield call(createClient)
  yield call(connectClient, stompClient);
  // yield delay(3000);
  // yield call(send, stompClient);
  // stompSubscribe(stompClient);

}

function* locationSend() {
  const stateMe = yield select(state => state.me);
  yield call(send, [stompClient, stateMe])
}

function* mySaga() {
  yield takeLatest("SOCKET_CONNECT_REQUEST", initializeStompChannel);
  yield takeEvery("LOCAITION_SEND", locationSend);
}

// /*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */

export default mySaga;