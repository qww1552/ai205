import './styles.css'

const imageButton = () => {
  return (
    <>
      {/* 버튼의 가로세로 비율은 8:5로 지정할 것 (원본 560x350px) */}
      <button className="btn" style={{position: "absolute", right:"10px", top:"10px"}}><img src="/btnIcons/iconSetting1.png" alt="설정" style={{width:"160px", height:"100px"}}/></button>
      <button className="btn" style={{position: "absolute", right:"10px", top:"130px"}}><img src="/btnIcons/iconMission1.png" alt="미션" style={{width:"160px", height:"100px"}}/></button>
      <button className="btn" style={{position: "absolute", right:"10px", top:"250px"}}><img src="/btnIcons/iconAct1.png" alt="행동" style={{width:"160px", height:"100px"}}/></button>
      <button className="btn" style={{position: "absolute", right:"10px", top:"370px"}}><img src="/btnIcons/iconKill1.png" alt="살해" style={{width:"160px", height:"100px"}}/></button>
    </>
  );
};

export default imageButton;