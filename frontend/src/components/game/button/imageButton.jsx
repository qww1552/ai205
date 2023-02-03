import 'styles/styles.css'
import ChatComponent from 'components/webchat/ChatComponent'
import MissionComponent from '../mission/missionComponent'
import { selectGameInfo } from "app/gameInfo"
import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"

const ImageButton = () => {
  
  const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn
  const isAdjacentMissionBtn = useSelector(selectMissionInfo).isAdjacentMissionBtn

  return (
    <>
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      <button
        className="imgBtn floatingComponent"
        id="settingBtn"
        onClick={undefined}
      >
          <img className="imgBtnIcon" src="/btnIcons/iconSetting1.png" alt="설정"/>
      </button>
      <button
        className="imgBtn floatingComponent"
        id="chatBtn"
        onClick={() => action('gameInfo/setChatModalOpen', true)}
      >
          <img className="imgBtnIcon" src="/btnIcons/iconChat1.png" alt="채팅"/>
      </button>
      <ChatComponent/>
      <button
        className={"imgBtnNoHover floatingComponent " + ((isAdjacentMeetingBtn || isAdjacentMissionBtn) ? "imgBtnReady" : "")}
        id="actBtn"
        onClick={
          isAdjacentMeetingBtn ?
          () => {action('START_MEETING_REQUEST')
          console.log('전송')
        } : (
          isAdjacentMissionBtn ?
          () => action('gameInfo/setMissionModalOpen', true) :
          undefined
      )}>
        <img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동"/>
      </button>
      <MissionComponent/>
      <button
        className="imgBtn floatingComponent"
        id="killBtn"
      >
        <img className="imgBtnIcon" src="/btnIcons/iconKill1.png" alt="살해"/>
      </button>
    </>
  );
};


export default ImageButton;