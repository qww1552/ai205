import { call, put, takeEvery, take, takeLatest, delay, select } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'
import { createClient, send, connectClient } from 'api/socket';


let stompClient;

//////////////////////// 채널 관련

function* initializeStompChannel() {
  yield startStomp();
}


function createEventChannel(roomId) {

  return eventChannel(emit => {
    const onReceivedMessage = (message) => {emit(message);}
    
    connectClient(stompClient, roomId, onReceivedMessage);

    return () => {
      stompClient.unsubscribe();
    }
  }, buffers.expanding(3000) || buffers.none());
}

function* startStomp() {
  stompClient = yield call(createClient)
  stompClient.debug = null;
  const channel = yield call(createEventChannel, 1);

  while (true) {
    try {
      const stateMe = yield select(state => state.me);

      const res = yield take(channel);
      const body = JSON.parse(res.body)

      const data = body.data;
      
      // 채널로 전송 받는거
      switch (body.type) {
        // 캐릭터 관련
        case "CHARACTER":
          // 움직임
          if(body.operation === 'MOVE') {

            if(stateMe.player.id !== data.player.id) {
              const otherPlayerData = {player : data.player, location : data.location}
              yield put({type : "others/setOtherPlayer", payload: otherPlayerData})
            }
          }
          break;

        // 미팅 관련
        case "MEETING":
          // 미팅 시작 알림 받음
          if(body.operation === 'START') {
            yield put({type : "gameInfo/setInMeeting", payload: true})
          }
          // 투표 시작 알림 받음 
          else if (body.operation === 'START_VOTING') {
            yield put({type : "gameInfo/setInVote", payload: true})
          }
          // 투표 알림 받음
          else if (body.operation === 'VOTE') {
            yield put({type: "others/setVote", payload: {id : data.playerId, value : true}})            
          } 
          // 투표 종료 (임시)
          else if (body.operation === 'END') {
            yield put({type : "voteInfo/setVoteResult", payload: data})
            yield put({type : "gameInfo/setInVote", payload: false})
            yield put({type : "gameInfo/setInVoteResult", payload: true})
            // 전체 투표 관련 초기화 필요
          }



          break;
        default:
          break;
      }

    } catch (e) {
      console.error("Sagas recive error!!")
      console.error(e.message);
    }
  }
}

//////////////////////////////////////

// 이동 정보 전송 요청
function* locationSend(action) {
  const stateMe = yield select(state => state.me);
  yield put({type : "me/changeLocation", payload: action.payload})
  yield call(send, stompClient, "move", 1, stateMe)
}

// 미팅 시작 요청
function* startMeeting(action) {
  yield call(send, stompClient, "meeting", 1)
}

// 투표 요청
function* vote(action) {
  const stateMe = yield select(state => state.me);
  yield call(send, stompClient, "vote", 1, {from : stateMe.player.id, to : action.payload})
}

// // 미팅 종료 요청
// function* endMeeting(action) {
//   yield put({type : "gameInfo/setInVote", payload: false})
//   yield put({type : "gameInfo/setInVoteResult", payload: true})
// }


function* mySaga() {
  yield takeLatest("SOCKET_CONNECT_REQUEST", initializeStompChannel);
  yield takeEvery("LOCAITION_SEND_REQUEST", locationSend);
  yield takeEvery("START_MEETING_REQUEST", startMeeting);
  yield takeEvery("VOTE_REQUEST", vote)
  // yield takeEvery("END_MEETING_REQUEST", endMeeting);
  
}

export default mySaga;