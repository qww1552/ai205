import { Button } from "antd";
import { useState } from "react";
import { action } from "app/store"
const TimerMission = ({setComplete}) => {

  const [loading, setLoading] = useState(false)
  
  const waitAndClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true)
    }, 5000);
  }

  return ( <>

    <div>아래 버튼을 누르고 기다리면 5초 뒤 미션이 완료됩니다.</div>
    <Button
      key="submit"
      type="primary"
      loading={loading}
      onClick={waitAndClose}
    >
      미션 수행하기
    </Button>
     <Button id="closeMission" onClick={() => {
        action('gameInfo/setMissionModalOpen', false)
      }}>미션 포기</Button>
  </>)
}

export default TimerMission;