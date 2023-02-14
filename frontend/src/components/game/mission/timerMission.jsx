import { Button } from "antd";
import { useState } from "react";

const TimerMission = ({content, setComplete}) => {

  const [loading, setLoading] = useState(false)
  
  const waitAndClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true)
    }, 5000);
  }

  return (<>
    <h1> {content} </h1>
    <Button
      key="submit"
      type="primary"
      loading={loading}
      onClick={waitAndClose}
    >
      미션 수행하기
    </Button>
  </>)
}

export default TimerMission;