import { useEffect, useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button, message } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"
import TimerMission from './timerMission';
import MoveMission from './moveMission';
import DragMission from './dragMission';
import './style.css'
// Todo: 죽었을때, 회의시작할때, 게임이 끝났을때 모달 닫는것 작성 
const MissionComponent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '미션완료!',
      duration: 0.2,
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };

  const [complete, setComplete] = useState(false)
  
  const isMissionModalOpen = useSelector(selectGameInfo).isMissionModalOpen
  useEffect(()=>{
    if (complete===true) {
      setTimeout(() => {
        success()
        action('MISSION_REQUEST', { id: isMissionModalOpen })
        setComplete(false)
      }, 200);

    }
  },[complete])


  return (
    <Modal
      open={isMissionModalOpen}
      closable={false}
      footer={[
        // <button onClick={()=>{action('gameInfo/setMissionModalOpen', false)}}>임시버튼</button>
    ]}>
      {contextHolder}
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
    </Modal>
  )
};

export default MissionComponent