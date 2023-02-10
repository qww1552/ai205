import Teachable from "components/teachable/Teachable";
import { Modal, Button } from 'antd';
import { selectGameInfo } from 'app/gameInfo';
import { useSelector } from "react-redux";
import { action } from "app/store"

const MissionComponentTeachable = () => {

  const isMissionModalOpen = useSelector(selectGameInfo).isMissionModalOpen
  return (
    <Modal
      open={isMissionModalOpen}
      closable={false}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => action('gameInfo/setMissionModalOpen', false)}
        >
          창 닫기
        </Button>
    ]}>
      <h1> 당신의 미션은 팔 한쪽 하트 만들기입니다! </h1>
      <h2> 아래 버튼을 눌러 미션을 시작하세요! </h2>
      <Teachable myurl="/heart_model/" />
    </Modal>
  );
};

export default MissionComponentTeachable;