import 'styles/styles.css'
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
        onClick={() => console.log("Setting")}
      >
          <img className="imgBtnIcon" src="/btnIcons/iconSetting1.png" alt="설정"/>
      </button>
      {/* 채팅 창을 열 수 있도록 준비 */}
      <button
        className="imgBtn floatingComponent"
        id="chatBtn"
        onClick={() => console.log("채팅 open")}
      >
          <img className="imgBtnIcon" src="/btnIcons/iconChat1.png" alt="채팅"/>
      </button>
      {/* 킬러 역할일 때만 버튼이 표시되도록 함. 버튼이 활성화되는 조건과, 눌렀을 때 수행할 동작 지정 필요 */}
      {true && <button
        className={"imgBtnNoHover floatingComponent " + (isAdjacentMeetingBtn ? "imgBtnReady" : "")}
        id="killBtn"
        onClick={isAdjacentMeetingBtn ? () => console.log("Kill") : undefined}
      >
        <img className="imgBtnIcon" src="/btnIcons/iconKill1.png" alt="살해"/>
      </button>}
      <button
        className={"imgBtnNoHover floatingComponent " + (isAdjacentMeetingBtn ? "imgBtnReady" : "")}
        id="actBtn"
        onClick={isAdjacentMeetingBtn ? () => action('gameInfo/setInMeeting', true) : undefined}
      >
        <img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동"/>
      </button>
    </>
  );
};


export default ImageButton;