import { call, put, takeEvery, take, takeLatest, select, fork, all, throttle, delay } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'
import { createClient, send, connectClient } from 'api';


//////////////////////// 채널 관련

function* initializeStompChannel(action) {
  yield call(startStomp, action);
}

function createEventChannel(client, topics, player) {

  return eventChannel(emit => {
    const onReceivedMessage = (message) => { emit(message); }

    client.connect(
      { playerId: player.id },
      () => {
        topics.forEach(topic => { client.subscribe(topic, onReceivedMessage, { playerId: player.id }); })
      },
      () => {
        client.unsubscribe();
      })

    return () => {
      client.unsubscribe();
    }
  }, buffers.expanding(3000) || buffers.none());
}

function* startStomp(action) {

  const stompClient = yield call(createClient)
  stompClient.debug = null;

  const stateMe = yield select(state => state.me);

  yield fork(sendChannel, stompClient, action.payload.roomId)

  const topics = [`/user/queue`, `/sub/room/${action.payload.roomId}`]

  const channel = yield call(createEventChannel, stompClient, topics, stateMe.player)


  // while(true) {
  //   try {
  //     const res = yield take(channel);
  //     const body = JSON.parse(res.body);

  //     console.log(res, body)

  //     if(body.type === 'GAME' && body.operation === 'START') {
  //       yield put({type : "gameInfo/setInGame", payload: true})
  //       break;
  //     }
  //   } catch (e) {
  //     console.error("Sagas recive error!!")
  //     console.error(e.message);
  //   } 


  // }


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
  GAME: function* (operation, data) {
    const stateMe = yield select(state => state.me);
    
    switch (operation) {
      case 'START':
        for(const player of data.players) {
          if(stateMe.player.id !== player.id)
            yield put({ type: "others/initOtherPlayer", payload: {id : player.id, color : player.color} })
        }
        yield put({ type: "gameInfo/setInGame", payload: true })
        yield put({ type: "gameSet/setGameSet", payload: data.gameSetting})
        break;
      case 'START_PERSONAL':

        yield put({
          type: "me/setPlayer",
          payload: {
            ...stateMe.player,
            role: data.role,
            color: data.color,
            isAlive: true,
            isVoted: false,
          }
        })
        break;
      // ※게임 종료신호 데이터 받아오기
      case 'END':
        yield put({ type: "gameResult/setGameResult", payload: data })
        yield put({type : "gameInfo/setInGame", payload: false})
        break;

      default:
        break;

    }
  },
  CHARACTER: function* (operation, data) {
    const stateMe = yield select(state => state.me);
    switch (operation) {
      case 'MOVE':
        if (stateMe.player.id !== data.player.id) {
          yield put({ type: "others/setOtherPlayer", payload: data })
        }
        break;
      case 'DIE':
        // if (stateMe.player.id !== data.player.id) {
        //   const otherPlayerData = {
        //     player: {...stateMe.player, id: data.player.id, isAlive: false },
        //     location: data.location
        //   }
        //   yield put({ type: "others/setOtherPlayer", payload: otherPlayerData })
        // }
        yield put({ type: "dead/addDeadList", payload: data })
        break;
      case 'YOU_DIED':
        console.log(operation, data)
        // const payload = { ...stateMe, player: { ...stateMe.player, isAlive: false } }
        yield put({ type: "me/setPlayer", payload : {...stateMe.player, isAlive: false } })
        break;
      default:
        break;
    }
  },
  MEETING: function* (operation, data) {

    switch (operation) {
      // 미팅 시작 알림 받음
      case 'START':
        // 시체들 초기화
        yield put({ type: "dead/setDeadList", payload: [] })
        yield put({ type: "gameInfo/setInMeeting", payload: true })
        yield delay(300)
        yield put({ type: "gameInfo/setGameStop", payload: true })

        break;
      // 투표 시작 알림 받음 
      case 'START_VOTING':
        yield put({ type: "gameInfo/setInVote", payload: true })
        break;
      // 투표 알림 받음
      case 'VOTE':
        yield put({ type: "others/setVote", payload: { id: data.playerId, value: true } })
        break;
      // 회의 종료
      case 'END':
        yield put({ type: "voteInfo/setVoteResult", payload: data })
        yield put({ type: "gameInfo/setInVote", payload: false })
        yield put({ type: "gameInfo/setInVoteResult", payload: true })
        yield put({ type: "gameInfo/setGameStop", payload: false })

        // 투표 관련 초기화

        const stateMe = yield select(state => state.me);

        yield put({ type: "others/setAllVoteFalse" })
        yield put({ type: "me/setPlayer", payload: { ...stateMe.player, isVoted: false } })

        break;
      default:
        break;
    }
  },
  MISSION: function* (operation, data) {
    switch (operation) {
      case 'PROGRESS':
        yield put({ type: "missionInfo/setTotalMissionProgress", payload: data.progress })
        break;
      default:
        break;
    }
  },
  EXCEPTION: function* (operation, data) {
    return
  }
}

/////////////////////////////////
/////////////////// 클라이언트 -> 서버 소켓 전송
function* sendChannel(client, roomId) {
  yield takeEvery("GAME_START_REQUEST", gameStart, client, roomId);
  yield takeEvery("LOCAITION_SEND_REQUEST", locationSend, client, roomId);
  yield throttle(3000, "START_MEETING_REQUEST", startMeeting, client, roomId);
  yield throttle(3000, "VOTE_REQUEST", vote, client, roomId)
  yield takeEvery("MISSION_REQUEST", mission, client, roomId)
  yield throttle(3000, "KILL_REQUEST", kill, client, roomId)
}

// 게임 시작 요청
function* gameStart(client, roomId, action) {
  yield call(send, client, "game/start", roomId)
}


// 이동 정보 전송 요청
function* locationSend(client, roomId, action) {
  const stateMe = yield select(state => state.me);
  yield put({ type: "me/changeLocation", payload: action.payload })
  yield call(send, client, "character/move", roomId, { player: stateMe.player, location: stateMe.location })
}

// 미팅 시작 요청
function* startMeeting(client, roomId, action) {
  yield call(send, client, "meeting/start", roomId)
}

// 투표 요청
function* vote(client, roomId, action) {
  const stateMe = yield select(state => state.me);
  yield put({ type: "me/setPlayer", payload: { ...stateMe.player, isVoted: true } })
  yield call(send, client, "meeting/vote", roomId, { from: stateMe.player.id, to: action.payload.to })
}

// 미션 완료 전송 요청
function* mission(client, roomId, action) {
  yield call(send, client, "meeting/complete", roomId, action.payload)
}

// 살해 요청
function* kill(client, roomId, action) {
  yield call(send, client, "character/kill", roomId, action.payload)
}

function* mySaga() {
  yield takeLatest("SOCKET_CONNECT_REQUEST", initializeStompChannel);
}

export default mySaga;
