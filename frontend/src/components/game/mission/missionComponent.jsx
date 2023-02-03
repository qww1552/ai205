import { useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"

const MissionComponent = () => {
  
  const isMissionModalOpen = useSelector(selectGameInfo).isMissionModalOpen
  const [loading, setLoading] = useState(false)
  const waitAndClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      action('gameInfo/setMissionModalOpen', false)
    }, 5000);
  }

  return (
    <Modal
      open={isMissionModalOpen}
      closable={false}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={waitAndClose}
        >
          미션 수행하기
        </Button>
    ]}>
      아래 버튼을 누르고 기다리면 5초 뒤 미션이 완료됩니다.
    </Modal>
  )
};

export default MissionComponent