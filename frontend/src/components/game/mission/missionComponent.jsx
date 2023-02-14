import { useEffect, useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"
import TimerMission from './timerMission';
import MoveMission from './moveMission';
import DragMission from './dragMission';
import './style.css'
// Todo: 죽었을때, 회의시작할때, 게임이 끝났을때 모달 닫는것 작성 
const MissionComponent = () => {

  const [complete, setComplete] = useState(false)
  
  const isMissionModalOpen = useSelector(selectGameInfo).isMissionModalOpen
  useEffect(()=>{
    if (complete===true) {
      // console.log('미션완료 사가를 호출')
      // console.log(isMissionModalOpen)
      action('MISSION_REQUEST', { id: isMissionModalOpen })
      setComplete(false)
    }
  },[complete])
  const mssionBtn = () => {
    
    // TODO: 이 부분에 미션 완료 요청이 들어가야 함!
    // action('missionInfo/setMissionById', {id : "missionId", solved : true}))
    action('gameInfo/setMissionModalOpen', false)
  }
  useEffect(() => {
    if(isMissionModalOpen) {
      console.log(isMissionModalOpen)
    }
  }, [isMissionModalOpen])
  
  return (
    <Modal
      open={isMissionModalOpen}
      closable={false}
      footer={[
        <button onClick={()=>{action('gameInfo/setMissionModalOpen', false)}}>임시버튼</button>
    ]}>
      {/* 여기에 어떤 미션이 수행될것인지 상태에 따라 변경 */}
      {/* Todo: 컴포넌트 수정하기 */}
      {(() => {switch (isMissionModalOpen) {
        case '1':
          return <TimerMission setComplete={setComplete}/>;
        case '2':
          return <TimerMission setComplete={setComplete}/>;
        case '3':
          return <TimerMission setComplete={setComplete}/>;
        case '4':
          return <TimerMission setComplete={setComplete}/>;  
        case '5':
          return <TimerMission setComplete={setComplete}/>;
        case '6':
          return <MoveMission setComplete={setComplete}/>;
        case '7':
          return <DragMission setComplete={setComplete}/>;
        case '8':
          return <DragMission setComplete={setComplete}/>;
        default:
          return <div>미션id에서 오류발생</div>;                      
      }})()}
      {/* <MoveMission setComplete={setComplete}/> */}
      {/* <DragMission setComplete={setComplete}/> */}
    </Modal>
  )
};

export default MissionComponent