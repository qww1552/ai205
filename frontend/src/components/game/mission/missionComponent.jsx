import { useEffect, useState } from 'react'
// import { selectMissionInfo } from "app/missionInfo"
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { action } from "app/store"
import TimerMission from './timerMission';
import MoveMission from './moveMission';
import DragMission from './dragMission';
import TeachableMission from './teachableMission';
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
          return <TeachableMission type="lip_touch" title="식당에서 저녁메뉴의 맛을 보세요" content="입술에 손가락을 갖다대서 맛을 보세요" setComplete={setComplete}/>;
        case '2':
          return <TeachableMission type="arm_updown" title="의무실 찬장에서 약품을 꺼내세요" content="찬장 위쪽으로 손을 뻗었다가 내리세요" setComplete={setComplete}/>;
        case '3':
          return <TeachableMission type="cover_eye" title="라운지 현관문에서 바깥을 내다보세요" content="한쪽 눈을 가리고 현관문 구멍을 봐서 확인하세요" setComplete={setComplete}/>;
        case '4':
          return <TeachableMission type="big_heart" title="휴게실에서 영상 메시지에 응답하세요" content="양팔로 하트모양을 만들어 사랑하는 마음을 전하세요" setComplete={setComplete}/>;
        case '5':
          return <TeachableMission type="goblin_horn" title="연구실 위쪽 스크린에서 뇌파를 분석하세요" content="한 손가락으로 뒤통수에 뿔을 만들어 뇌파를 분석하세요" setComplete={setComplete}/>;
        case '6':
          return <TeachableMission type="jammin_punch" title="라운지 인터폰에 대고 벨튀를 혼내주세요" content="나가기 귀찮으니 펀치를 하려는 척만 해서 쫓아내세요" setComplete={setComplete}/>;
          // return <MoveMission setComplete={setComplete}/>;
        case '7':
          return <TeachableMission type="connect_wires" title="연결통로로 모여서 배전반을 복구하세요" content="배전반의 끊어진 전선을 이어주세요 (n회)" setComplete={setComplete}/>;
        case '8':
          return <TeachableMission type="screw_bolts" title="연결통로로 모여서 배전반을 복구하세요" content="배전반의 거대 나사를 조여주세요 (n회)" setComplete={setComplete}/>;
          // return <DragMission setComplete={setComplete}/>;
        default:
          return <div>미션id에서 오류발생</div>;                      
      }})()}
      {/* <MoveMission setComplete={setComplete}/> */}
      {/* <DragMission setComplete={setComplete}/> */}
    </Modal>
  )
};

export default MissionComponent