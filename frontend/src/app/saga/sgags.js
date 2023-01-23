import { call, put, takeEvery, take, takeLatest, delay, select } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'
import { createClient, connectClient, send } from 'api/socket';
import { setOtherPlayer } from 'app/others';
import { action } from 'app/store';
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

function createEventChannel(url) {

  return eventChannel(emit => {
    const onReceivedMessage = (message) => {emit(message);}
    stompClient.connect({}, () => {
      stompClient.subscribe(url, onReceivedMessage)
  })

    return () => {
      stompClient.unsubscribe();
    }
  }, buffers.expanding(3000) || buffers.none());
}

function* locationSend() {
  const stateMe = yield select(state => state.me);
  yield call(send, stompClient, stateMe)
}

function* initializeStompChannel() {
  yield startStomp();
}

function* startStomp() {
  stompClient = yield call(createClient)
  stompClient.debug = null;
  const channel = yield call(createEventChannel, "/sub/room/1");

  while (true) {
    try {
      const res = yield take(channel);
      const data = JSON.parse(res.body)
      
      switch (data.action) {
        case "MOVE":
          const stateMe = yield select(state => state.me);

          if(stateMe.player.name !== data.player.name) {
            const otherPlayerData = {player : data.player, location : data.location}
            action("others/setOtherPlayer", otherPlayerData);
          }
          break;
        default:
          break;
      }

    } catch (e) {
      console.error(e.message);
    }
  }
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