import 'styles/styles.css'
import ChatComponent from 'components/webchat/ChatComponent'
import MissionComponent from '../mission/missionComponent'
import { selectGameInfo } from "app/gameInfo"
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"
import { selectMe } from 'app/me'
const ImageButton = () => {

  const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn

  return (
    <>
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      {/* TODO : 임시로 설정 버튼에 미션 수행 기능을 배정했으며, 이후 통신 기능을 추가해서 행동 버튼에 통합해야 함 */}
      <button
        className="imgBtn floatingComponent"
        id="settingBtn"
        onClick={() => action('gameInfo/setMissionModalOpen', true)}
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
        className={"imgBtnNoHover floatingComponent " + (isAdjacentMeetingBtn ? "imgBtnReady" : "")}
        id="actBtn"
        onClick={isAdjacentMeetingBtn ? () => {action('START_MEETING_REQUEST')
      console.log('전송')} : undefined}
      >
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