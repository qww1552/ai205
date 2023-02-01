import { call, put, takeEvery, take, takeLatest, select, fork } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'
import { createClient, send, connectClient } from 'api';


//////////////////////// 채널 관련

function* initializeStompChannel() {
  yield call(startStomp);
}

function createEventChannel(client, roomId) {

  return eventChannel(emit => {
    const onReceivedMessage = (message) => {emit(message);}
    
    connectClient(client, roomId, onReceivedMessage);

    return () => {
      client.unsubscribe();
    }
  }, buffers.expanding(3000) || buffers.none());
}

function* startStomp() {
  const stompClient = yield call(createClient)
  stompClient.debug = null;

  const channel = yield call(createEventChannel, stompClient, 1);

  yield fork(sendChannel, stompClient);

  while (true) {

    try {
      const res = yield take(channel);
      const body = JSON.parse(res.body)

      yield channelHandling[body.type](body.operation, body.data);

    } catch (e) {
      console.error("Sagas recive error!!")
      console.error(e.message);
    }
  }
}


const channelHandling = {
  CHARACTER: function* (operation, data) {
    switch (operation) {
      case 'MOVE':
        
        const stateMe = yield select(state => state.me);

        if(stateMe.player.id !== data.player.id) {
          const otherPlayerData = {
            player : {id : data.player.id, isVoted : false, isAlive : true}, 
            location : data.location
          }
          yield put({type : "others/setOtherPlayer", payload: otherPlayerData})
        }
        break;
    
      default:
        break;
    }
  },
  MEETING: function* (operation, data) {
    switch (operation) {
      // 미팅 시작 알림 받음
      case 'START':
        yield put({type : "gameInfo/setInMeeting", payload: true})
        break;
      // 투표 시작 알림 받음 
      case 'START_VOTING':
        yield put({type : "gameInfo/setInVote", payload: true})
        break;
      // 투표 알림 받음
      case 'VOTE':
        yield put({type: "others/setVote", payload: {id : data.playerId, value : true}})
        break;
      // 회의 종료
      case 'END':
        yield put({type : "voteInfo/setVoteResult", payload: data})
        yield put({type : "gameInfo/setInVote", payload: false})
        yield put({type : "gameInfo/setInVoteResult", payload: true})

        // 투표 관련 초기화

        const stateMe = yield select(state => state.me);

        yield put({type : "others/setAllVoteFalse"})
        yield put({type : "me/setPlayer", payload: {...stateMe.player, isVoted: false}})

        break;
      default:
        break;
    }
  }
}

/////////////////////////////////
/////////////////// 클라이언트 -> 서버 소켓 전송
function* sendChannel(client) {
  yield takeEvery("LOCAITION_SEND_REQUEST", locationSend, client);
  yield takeEvery("START_MEETING_REQUEST", startMeeting, client);
  yield takeEvery("VOTE_REQUEST", vote, client)
}

// 이동 정보 전송 요청
function* locationSend(client, action) {
  const stateMe = yield select(state => state.me);
  yield put({type : "me/changeLocation", payload: action.payload})
  yield call(send, client, "move", 1, stateMe)
}

// 미팅 시작 요청
function* startMeeting(client, action) {
  yield call(send, client, "meeting/start", 1)
}

// 투표 요청
function* vote(client, action) {
  const stateMe = yield select(state => state.me);
  yield put({type: "me/setPlayer", payload: {...stateMe.player, isVoted: true}})
  yield call(send, client, "meeting/vote", 1, {from : stateMe.player.id, to : action.payload})
}

function* mySaga() {
  yield takeLatest("SOCKET_CONNECT_REQUEST", initializeStompChannel);
}

export default mySaga;