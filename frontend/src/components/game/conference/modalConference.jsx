import VideoComponent from 'components/webchat/VideoComponent'
import { selectGameInfo } from "app/gameInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"
import { Row, Col, Button, Modal } from "antd"

const ModalConference = () => {

  const isInMeeting = useSelector(selectGameInfo).isInMeeting

  return (
    <>
      {/* 현재 게임 화면하단의 컴포넌트 + 회의때의 모달로 기능이 2가지로 분리되어 있는데도 불구,
      conference(회의)/modalConference 파일 하나에 2가지 기능이 몰려 있음
      -> redux를 이용해서 기능을 분화해야 함 */}
      {/* <VideoComponent /> */}
      {/* <Modal
        open={this.state.open}
        onCancel={this.handleClose}
        width={1000}
        footer={[
          <Button key="Close" type="primary" onClick={this.handleClose}>
            Close
          </Button>,
        ]}
      >
        TEST
      </Modal>
      {!this.state.open ? (<div></div>) : null} */}

    </>
)
};

export default ModalConference;