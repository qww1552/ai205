import { call, put, takeEvery, take, takeLatest, delay, select } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'
import { createClient, send, connectClient } from 'api/socket';


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

function createEventChannel(roomId) {

  return eventChannel(emit => {
    const onReceivedMessage = (message) => {emit(message);}
    
    connectClient(stompClient, roomId, onReceivedMessage);

    return () => {
      stompClient.unsubscribe();
    }
  }, buffers.expanding(3000) || buffers.none());
}

// 이동 정보 전송
function* locationSend(action) {
  const stateMe = yield select(state => state.me);
  yield put({type : "me/changeLocation", payload: action.payload})
  yield call(send, stompClient, "move", 1, stateMe)
}

// 미팅 시작 트리거 전송
function* startMeeting(action) {
  yield call(send, stompClient, "meeting", 1)
}

function* initializeStompChannel() {
  yield startStomp();
}

function* startStomp() {
  stompClient = yield call(createClient)
  stompClient.debug = null;
  const channel = yield call(createEventChannel, 1);

  while (true) {
    try {
      const res = yield take(channel);
      const data = JSON.parse(res.body)
      
      // 채널로 전송 받는거
      switch (data.action) {
        case "MOVE":
          const stateMe = yield select(state => state.me);

          if(stateMe.player.name !== data.player.name) {
            const otherPlayerData = {player : data.player, location : data.location}
            yield put({type : "others/setOtherPlayer", payload: otherPlayerData})
          }
          break;

        // 미팅 관련
        case "MEETING":

          if(data.subAction === 'START') {

          } else if (data.subAction === 'START_VOTING') {

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
  yield takeEvery("START_MEETING", startMeeting);
}

// /*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */

export default mySaga;