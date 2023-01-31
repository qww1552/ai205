import 'styles/styles.css'
import { selectGameInfo } from "app/gameInfo"
import { useSelector } from "react-redux"
import { action } from "app/store"
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';

const VideoCards = () => {
  const userIds = ["유저 1", "유저 2", "유저 3", "유저 4", "유저 5"]
  return(<>
  {
      userIds.map((name, idx) =>
      <Col span={6}>
        <Card
          title={name}
          size="small"
          extra={[
            <CheckSquareTwoTone twoToneColor='LimeGreen' style={{ fontSize: '20px'}}/>," ",
            <CustomerServiceTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px'}}/>," ",
            <AudioTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px'}}/>, " ",
            <AlertTwoTone twoToneColor='Red' style={{ fontSize: '20px'}}/>
        ]}>
          <div className="blackBox"/>
        </Card>
      </Col>)
  }
  </>)
}

const ModalMeeting = () => {

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
          <Button key="back" onClick={() => action('gameInfo/setInMeeting', false)}>
            닫기
          </Button>
        ]}
      >
        {/* 거터는 가로, 세로 여백을 px 단위로 지정 */}
        <Row gutter={[8, 8]}>
          <Col span={22}>
            <Progress percent={80} success={{ percent: 50 }} showInfo={false} strokeWidth={20}/>
          </Col>
          <Col span={1}>  
            <Button id="chatBtnIcon" onClick={() => console.log("채팅 open")}>
              <MessageTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
            </Button>
          </Col>
          <Col span={1}>  
            <Button id="settingBtnIcon" onClick={() => console.log("채팅 open")}>
              <SettingTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
            </Button>
          </Col>
          {/* Ant Design의 Grid System은 n/24 기반임. 예를 들어 span={8}이면 창 가로 길이의 8/24 = 1/3만큼 차지함 */}
          <VideoCards/>
          <Col span={24}>
            <Card size="small">
              <Button id="voteSkipIcon" onClick={() => console.log("투표 skip")}>
                <DeleteTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
              </Button>
              {"   유저 1, 유저 13"}
            </Card>
          </Col>
        </Row>
        
      </Modal>
    </>
)
};

export default ModalMeeting;