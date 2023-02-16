import ChatComponent from 'components/webchat/ChatComponent'
import MissionComponent from '../mission/missionComponent'
import { selectGameInfo } from "app/gameInfo"
import { selectMissionInfo } from "app/missionInfo"
import { useState, useRef, useEffect } from 'react'
import { useSelector } from "react-redux"
import { action } from "app/store"
import { selectMe } from 'app/me'
import { useKeyboardControls } from "@react-three/drei";
import { Progress, Badge, Button, Modal, message } from 'antd'
import './style.css'
import { Col, Row } from 'antd';

const ImageButton = () => {
  const isInSabotage = useSelector(selectGameInfo).isInSabotage
  const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const isAdjacentMissionBtn = useSelector(selectMissionInfo).isAdjacentMissionBtn
  const me = useSelector(selectMe).player
  const adjustPlayer = useSelector(selectMe).adjustPlayer
  const adjustBody = useSelector(selectMe).adjustBody
  const unReadMessage = useSelector(selectGameInfo).unReadMessage
  const [minimapOpen, setMinimapOpen] = useState(false)
  const missionList = useSelector(selectMe).player.missions
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'warning',
      content: '현재 수행할 수 없는 미션입니다. 미션 내용을 다시 확인하세요.',
      duration: 0.5,
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };


  const chatButtonActivate = () => {
    action('gameInfo/setChatModalOpen', true)
  }
  const actButtonActivate = () => {


    if (isAdjacentMeetingBtn) {
      action('START_MEETING_REQUEST')

    } else if (isAdjacentMissionBtn) {
      // console.log('전송')
      if (isAdjacentMissionBtn == 10 && isInSabotage) {
        action('gameInfo/setMissionModalOpen', isAdjacentMissionBtn)
      } else if (1 <= isAdjacentMissionBtn && isAdjacentMissionBtn <= 9) {
        // console.log(missionList)
        for (let idx in missionList) {
          // console.log(idx, missionList.length-1)
          // console.log("isAdjust", isAdjacentMissionBtn)
          if ((Number(missionList[idx].id) === Number(isAdjacentMissionBtn)) && (missionList[idx].isComplete === false)) {
            action('gameInfo/setMissionModalOpen', isAdjacentMissionBtn)
            break;
          } else {
            if (Number(idx) === missionList.length - 1) {
              // console.log('success')
              success()
            }

          }
        }
      }



    }
  }
  const closeButtonActivate = () => {
    action('gameInfo/setChatModalOpen', false)
  }
  const killButtonActivate = () => {
    if (adjustPlayer) {
      action('KILL_REQUEST', { to: adjustPlayer })
      action('me/setAdjustPlayer', null);
    }
  }
  const reportButtonActivate = () => {
    if (adjustBody) {
      action('START_MEETING_REQUEST')
      action('me/setAdjustBody', null);
    }
  }
  const mapButtonToggle = () => {
    // action("me/setPlayer", {...me, isAlive: false })
    setMinimapOpen(!minimapOpen)
  }

  const sabotageActivate = () => {
    action('SABOTAGE_REQUEST')
  }

  // useEffect(() => { console.log(unReadMessage) }, [unReadMessage])
  // 게임 첫 시작의 쿨타임은 15초, 이후 10초로 설정
  const [killTimer, setKillTimer] = useState(-50)
  const killInterval = useRef(null)
  // 사보타지의 쿨타임은 20초
  const [sabotageTimer, setSabotageTimer] = useState(-100)
  const sabotageInterval = useRef(null)

  // 시간 지나면서 쿨타임이 채워지는 부분
  useEffect(() => {
    killInterval.current = setInterval(() => {
      setKillTimer((prev) => prev + 10)
    }, 1000) // 1000 = 1초마다 10퍼센트씩 채워짐
    return () => clearInterval(killInterval.current)
  }, [])

  // 투표 결과가 나오면 창 닫히는 시간 고려해서 쿨타임 초기화
  useEffect(() => {
    if (isInVoteResult) {
      setKillTimer(-150) // 회의 창 닫히는데 약 10초정도 걸림
    }
  }, [isInVoteResult])

  const resetKillTimer = () => {
    setKillTimer(0)
  }

  useEffect(() => {
    sabotageInterval.current = setInterval(() => {
      setSabotageTimer((prev) => prev + 10)
    }, 1000)
    return () => clearInterval(sabotageInterval.current)
  }, [])

  useEffect(() => {
    // 협동 미션이 끝나면 초기화해야 함...
    if (isInVoteResult) {
      setSabotageTimer(-100)
    }
  }, [isInVoteResult])

  const resetSabotageTimer = () => {
    setSabotageTimer(-100)
  }

  const [, get] = useKeyboardControls()
  const { actKey, killKey, reportKey, escKey, chatKey } = get()
  if (actKey) {
    actButtonActivate()
  } else if (chatKey) {
    chatButtonActivate()
  } else if (escKey) {
    closeButtonActivate()
  } else if (killKey) {
    killButtonActivate()
  } else if (reportKey) {
    //reportButtonActivate()
  }

  return (
    <>
      {contextHolder}

      <div id="ImageButton" style={{ width: "100vw", position: "absolute", bottom: "20px" }}>

        <Row>
          <Col offset={21} span={3}>
            {me.isAlive && <button
              className="imgBtn"
              id="chatBtn"
              onClick={chatButtonActivate}
            ><Badge count={unReadMessage}>
                <p />
                <img className="imgBtnIcon" src="/btnIcons/iconChat1.png" alt="채팅" />
                <p />
              </Badge>
            </button>}
          </Col>
        </Row>
        <Row>
          <Col offset={21} span={3}>
            <button
              className="imgBtn"
              id="mapBtn"
              onClick={mapButtonToggle}
            >
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
              <p />
              <img className="imgBtnIcon" src="/btnIcons/iconMap1.png" alt="지도" />
              <p />
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
              <Modal
                title="미니맵"
                width="76.5vh"
                open={minimapOpen}
                onCancel={mapButtonToggle}
                footer={[]}
              >
                <div>
                  <img className="minimap" src="/map/labeledMapImage.png" alt="미니맵" />
                </div>
              </Modal>
            </button>
          </Col>
        </Row>
        <Row>
          <Col offset={18} span={3}>
            {me.role === "MAFIA" ? <button
              className={"imgBtnNoHover " + ((adjustPlayer && killTimer >= 100) ? "imgBtnReady" : "")}
              id="killBtn"
              onClick={
                (adjustPlayer && killTimer >= 100) ? () => {
                  killButtonActivate()
                  resetKillTimer()
                } : undefined}
            >
              <Progress strokeWidth={4} percent={killTimer} steps={10} showInfo={false} strokeColor="red" />
              <p />
              <img className="imgBtnIcon" src="/btnIcons/iconKill1.png" alt="살해" />
              <p />
              <Progress strokeWidth={4} percent={killTimer} steps={10} showInfo={false} strokeColor="red" />
            </button> : undefined}
          </Col>
          <Col span={3}>
            {me.isAlive && <button
              className={"imgBtnNoHover " + ((adjustBody) ? "imgBtnReady" : "")}
              id="reportBtn"
              onClick={
                (adjustBody) ?
                  reportButtonActivate
                  : undefined}
            >
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
              <p />
              <img className="imgBtnIcon" src="/btnIcons/iconReport1.png" alt="신고" />
              <p />
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
            </button>}
          </Col>
        </Row>
        <Row>
          <Col offset={18} span={3}>
            {me.role === "MAFIA" ? <button
              className={"imgBtnNoHover " + ((sabotageTimer >= 100) ? "imgBtnReady" : "")}
              id="sabotageBtn"
              onClick={
                (sabotageTimer >= 100) ? () => {
                  sabotageActivate()
                  resetSabotageTimer()
                } : undefined}
            >
              <Progress strokeWidth={4} percent={sabotageTimer} steps={10} showInfo={false} strokeColor="red" />
              <p />
              <img className="imgBtnIcon" src="/btnIcons/iconSabotage1.png" alt="방해" />
              <p />
              <Progress strokeWidth={4} percent={sabotageTimer} steps={10} showInfo={false} strokeColor="red" />
            </button> : undefined}
          </Col>
          <Col span={3}>

            <button
              className={"imgBtnNoHover " + (isAdjacentMeetingBtn || isAdjacentMissionBtn ? "imgBtnReady" : "")}
              id="actBtn"
              onClick={
                (isAdjacentMeetingBtn || isAdjacentMissionBtn) ?
                  actButtonActivate
                  : undefined}
            >
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
              <p />
              <img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동" />
              <p />
              <Progress strokeWidth={4} percent={0} steps={10} showInfo={false} />
            </button>
          </Col>
        </Row>
        {/* {me.isAlive === true? */}
        {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}

        {/* 오른쪽 버튼 : 시민, 마피아 공용 */}

        <ChatComponent className="z-index2000" />
        <MissionComponent />

        {/* 왼쪽 버튼 : 마피아 전용 */}


      </div>

    </>
  );
};

export default ImageButton;