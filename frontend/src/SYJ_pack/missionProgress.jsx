import { Progress } from 'antd'

const missionProgress = () => {
  return (
    <>
      <Progress percent={90} strokeColor="green" trailColor="silver" strokeWidth="15px" showInfo={false}/>
    </>
  );
};

export default missionProgress;