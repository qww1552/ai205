import 'styles/styles.css'
import ChatComponent from 'components/webchat/ChatComponent'
import { selectGameInfo } from "app/gameInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"

const ImageButton = () => {
  
  const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn

  return (
    <>
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      <button
        className="imgBtn floatingComponent"
        id="settingBtn"
      >
          <img className="imgBtnIcon" src="/btnIcons/iconSetting1.png" alt="설정"/>
      </button>
      <button
        className="imgBtn floatingComponent"
        id="chatBtn"
        onClick={() => action('gameInfo/setChatOpen', true)}
      >
          <img className="imgBtnIcon" src="/btnIcons/iconChat1.png" alt="채팅"/>
      </button>
      <ChatComponent/>
      <button
        className={"imgBtnNoHover floatingComponent " + (isAdjacentMeetingBtn ? "imgBtnReady" : "")}
        id="actBtn"
        onClick={isAdjacentMeetingBtn ? () => action('gameInfo/setInMeeting', true) : undefined}
      >
        <img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동"/>
      </button>
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