import VideoComponent from 'components/webchat/VideoComponent'
import { selectGameInfo } from "app/gameInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"
// import { useState } from "react"
import { Row, Col, Button, Modal, Progress } from "antd"

const ModalMeeting = () => {

  // const [toggle, setToggle] = useState(false)

  const isInMeeting = useSelector(selectGameInfo).isInMeeting

  return (
    <>
      {/* 현재 게임 화면하단의 컴포넌트 + 회의때의 모달로 기능이 2가지로 분리되어 있는데도 불구,
      meeting(회의)/modalMeeeting 파일 하나에 2가지 기능이 몰려 있음
      -> redux를 이용해서 기능을 분화해야 함 */}
      {/* <VideoComponent /> */}
      <Modal
        title="킬러는 누구인가?"
        open={isInMeeting}
        centered
        width={1920}
        closable={false}
        footer={[
          // 추후 닫기 버튼을 제거하고 회의 완료 요청을 받으면 action이 수행되도록 수정 필요
          // <Button key="submit" onClick={()=> [action('gameInfo/setInMeeting', false), setToggle(true)]}>
          //   작은 모달 열기
          // </Button>,
          <Button key="back" onClick={() => action('gameInfo/setInMeeting', false)}>
            닫기
          </Button>
        ]}
      >
        <Progress percent={80} success={{ percent: 50 }} showInfo={false} strokeWidth={20}/>
        <p> 회의 </p>
        
      </Modal>
      {/* <Modal
        title="작아진 모달 테스트"
        open={toggle}
        onOk={() => setToggle(false)}
        onCancel={() => setToggle(false)}
      >
        미니미니한 모달
      </Modal> */}
    </>
)
};

export default ModalMeeting;