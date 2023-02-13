import 'styles/styles.css'
import ChatComponent from 'components/webchat/ChatComponent'
import MissionComponent from '../mission/missionComponent'
import { selectGameInfo } from "app/gameInfo"
import { selectMissionInfo } from "app/missionInfo"
import { useState, useRef, useEffect } from 'react'
import { useSelector } from "react-redux"
import { action } from "app/store"
import { selectMe } from 'app/me'
import { useKeyboardControls } from "@react-three/drei";
import { Progress,Badge } from 'antd'
import './style.css'
import { selectGameset } from 'app/gameSet'

const ImageButton = () => {
  
  const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const isAdjacentMissionBtn = useSelector(selectMissionInfo).isAdjacentMissionBtn
  const me = useSelector(selectMe).player
  const adjustPlayer = useSelector(selectMe).adjustPlayer
  const adjustBody = useSelector(selectMe).adjustBody
  const unReadMessage = useSelector(selectGameInfo).unReadMessage
  const missionList = useSelector(selectMe).player.missions

  const chatButtonActivate = () => {
    action('gameInfo/setChatModalOpen', true)
  }
  const actButtonActivate = () => {
    if (isAdjacentMeetingBtn) {
      action('START_MEETING_REQUEST')
      console.log('전송')
    } else if (isAdjacentMissionBtn) {
      console.log(missionList)
      for (let mission of missionList){
        console.log(mission)
        console.log(mission.id, isAdjacentMissionBtn)
        if ((Number(mission.id) === Number(isAdjacentMissionBtn))&&(mission.isComplete === false)){
          
          action('gameInfo/setMissionModalOpen', isAdjacentMissionBtn)
        }else{
          console.log('완료했거나 내 미션이 아닌경우')
        }
      }
      
    } 
  }
  const closeButtonActivate = () => {
    action('gameInfo/setChatModalOpen', false)
  }
  const killButtonActivate = () => {
    if(adjustPlayer)  {
      action('KILL_REQUEST', {to : adjustPlayer})
      action('me/setAdjustPlayer', null);
    }
  }
  const reportButtonActivate = () => {
    if(adjustBody) {
      action('START_MEETING_REQUEST')
      action('me/setAdjustBody', null);
    }
  }
  useEffect(()=>{console.log(unReadMessage)},[unReadMessage])
  // 게임 첫 시작의 쿨타임은 15초, 이후 10초로 설정
  const [killTimer, setKillTimer] = useState(-50)
  const killInterval = useRef(null) // 회의 interval과 충돌...?
  
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
    {me.isAlive===true?
    <>
      {/* {me.isAlive === true? */}
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      
      <button
        className="imgBtn floatingComponent"
        id="chatBtn"
        onClick={chatButtonActivate}
        ><Badge count = {unReadMessage}>
          <img className="imgBtnIcon" src="/btnIcons/iconChat1.png" alt="채팅"/>
          </Badge>
      </button>
      
      <ChatComponent className="z-index2000"/>
      {me.role === "MAFIA"?
      <button
        className={"imgBtnNoHover floatingComponent " + ((adjustPlayer && killTimer >= 100) ? "imgBtnReady" : "")}
        id="killBtn"
        onClick={
          (adjustPlayer && killTimer >= 100) ? () => {
          killButtonActivate()
          resetKillTimer()
        } : undefined}
      >
        <Progress strokeWidth={4} percent={killTimer} steps={10} showInfo={false} strokeColor="red"/>
        <p/>
        <img className="imgBtnIcon" src="/btnIcons/iconKill1.png" alt="살해"/>
        <p/>
        <Progress strokeWidth={4} percent={killTimer} steps={10} showInfo={false} strokeColor="red"/>
      </button>
      :<div></div>}
      <button
        className={"imgBtnNoHover floatingComponent " + ((adjustBody) ? "imgBtnReady" : "")}
        id="reportBtn"
        onClick={
          (adjustBody) ?
          reportButtonActivate
          : undefined}
        >
          <img className="imgBtnIcon" src="/btnIcons/iconReport1.png" alt="신고"/>
      </button>
      <MissionComponent/>
      <button
        className={"imgBtnNoHover floatingComponent " + ((isAdjacentMeetingBtn || (me.role!=="MAFIA" && isAdjacentMissionBtn)) ? "imgBtnReady" : "")}
        id="actBtn"
        onClick={
          (isAdjacentMeetingBtn || (me.role!=="MAFIA" && isAdjacentMissionBtn)) ?
          actButtonActivate
          : undefined}
        >
        <img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동"/>
      </button>
    </>
    :<></>}
    </>
  );
};

export default ImageButton;