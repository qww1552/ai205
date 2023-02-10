import { useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"
import TimerMission from './timerMission';
import MoveMission from './moveMission';
import DragMission from './dragMission';

const MissionComponent = () => {

  const [complete, setComplete] = useState(false)
  
  const isMissionModalOpen = useSelector(selectGameInfo).isMissionModalOpen
  const mssionBtn = () => {

    // TODO: 이 부분에 미션 완료 요청이 들어가야 함!
    // action('missionInfo/setMissionById', {id : "missionId", solved : true}))
    action('gameInfo/setMissionModalOpen', false)
  }

  return (
    <Modal
      open={isMissionModalOpen}
      closable={true}
      onCancel={() => {
        action('gameInfo/setMissionModalOpen', false)
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          disabled={complete ? false : true}
          onClick={mssionBtn}
        >
          미션 완료
        </Button>
    ]}>
      {/* 여기에 어떤 미션이 수행될것인지 상태에 따라 변경 */}
      <TimerMission setComplete={setComplete}/>
      {/* <MoveMission setComplete={setComplete}/> */}
      {/* <DragMission setComplete={setComplete}/> */}
    </Modal>
  )
};

export default MissionComponent