import { useEffect, useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button, message } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"
import TimerMission from './timerMission';
import MoveMission from './moveMission';
import DragMission from './dragMission';
import TeachableMission from './teachableMission';
import './style.css'
import CommonMission from './commonMission';

// Todo: 죽었을때, 회의시작할때, 게임이 끝났을때 모달 닫는것 작성 
const MissionComponent = () => {


  const [num, setNum] = useState(0)
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

  useEffect(() => {
    setNum(Math.floor(Math.random() * 2))
  }, [])

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
      destroyOnClose = {true}
      open={isMissionModalOpen}

    //   width={700}
    //   footer={null}
    //   closable={false}
    // >
      

      closable={false}
      footer={[
        // <button onClick={()=>{action('gameInfo/setMissionModalOpen', false)}}>임시버튼</button>
    ]}>
      {contextHolder}
      {/* 여기에 어떤 미션이 수행될것인지 상태에 따라 변경 */}
      {/* Todo: title이 mission 목록에 뜨도록 하기 */}
      {(() => {
        switch (isMissionModalOpen) {
        case '1':
          return <MoveMission  id="1" type="move" title="공터 정화기에 걸린 쓰레기를 꺼내세요" content="쓰레기를 잡고 옆으로 드래그해서 치우세요" setComplete={setComplete}/>;
        case '2':
          return <DragMission  id="2" type="drag" title="창고 보관함 안에 비품을 넣으세요" content="장비를 잡고 옆쪽 보관함에 넣으세요" setComplete={setComplete}/>;
        case '3':
          return <TimerMission  id="3" type="timer" title="연구실 안쪽 테이블에서 시약을 데우세요" content="핫플레이트 버튼을 클릭 후 기다리세요" setComplete={setComplete}/>;
        case '4':
          return <TeachableMission  id="4" type="lip_touch" title="식당에서 저녁메뉴의 맛을 보세요" content="입술에 손가락을 갖다대서 맛을 보세요" setComplete={setComplete}/>;
        case '5':
          return <TeachableMission  id="5" type="arm_updown" subType1="arm_up" subType2="arm_down" title="의무실 찬장에서 약품을 꺼내세요" content="찬장 위쪽으로 손을 뻗었다가 내리세요" setComplete={setComplete}/>;
        case '6':
          return <TeachableMission  id="6" type="jammin_punch" title="라운지 인터폰에 대고 벨튀를 혼내주세요" content="나가기 귀찮으니 펀치를 하려는 척만 해서 쫓아내세요" setComplete={setComplete}/>;
        case '7':
          return <TeachableMission  id="7" type="big_heart" title="휴게실에서 영상 메시지에 응답하세요" content="양팔로 하트모양을 만들어 사랑하는 마음을 전하세요" setComplete={setComplete}/>;
        case '8':
          return <TeachableMission  id="8" type="goblin_horn" title="연구실 위쪽 스크린에서 뇌파를 분석하세요" content="한 손가락으로 뒤통수에 뿔을 만들어 뇌파를 분석하세요" setComplete={setComplete}/>;
        case '9':
          return <TeachableMission id="9" type="cover_eye" title="라운지 현관문에서 바깥을 내다보세요" content="한쪽 눈을 가리고 현관문 구멍을 봐서 확인하세요" setComplete={setComplete}/>;
        case '10':
          return num===0? (<CommonMission  id="10" type="connect_wires" subType1="catch_wires" subType2="connect_wires" title="연결통로로 모여서 배전반을 복구하세요" content="배전반의 끊어진 전선을 이어주세요 (n회)"/>)
          :(<CommonMission id="10" type="screw_bolts" subType1="release_bolts" subType2="screw_bolts" title="연결통로로 모여서 배전반을 복구하세요" content="배전반의 거대 나사를 조여주세요 (n회)"/>)
      // case '11':
          // return <TeachableMission id="11" type="screw_bolts" subType1="release_bolts" subType2="screw_bolts" title="연결통로로 모여서 배전반을 복구하세요" content="배전반의 거대 나사를 조여주세요 (n회)" setComplete={setComplete}/>;
        default:
          return <div>미션id에서 오류발생</div>;                      
      }})()}
    </Modal>
  )
};

export default MissionComponent