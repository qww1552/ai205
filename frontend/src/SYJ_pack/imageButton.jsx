import './styles.css'

const imageButton = () => {
  return (
    <>
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      <button className="imgBtn floatingComponent" id="imgBtnFirst"><img className="imgBtnIcon" src="/btnIcons/iconSetting1.png" alt="설정"/></button>
      <button className="imgBtn floatingComponent" id="imgBtnSecond"><img className="imgBtnIcon" src="/btnIcons/iconMission1.png" alt="미션"/></button>
      <button className="imgBtn floatingComponent" id="imgBtnThird"><img className="imgBtnIcon" src="/btnIcons/iconAct1.png" alt="행동"/></button>
      <button className="imgBtn floatingComponent" id="imgBtnForth"><img className="imgBtnIcon" src="/btnIcons/iconKill1.png" alt="살해"/></button>
    </>
  );
};

export default imageButton;