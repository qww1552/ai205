import VideoComponent from 'components/webchat/VideoComponent'
import { selectGameInfo, setInVote, setInVoteResult } from "app/gameInfo"
import { useDispatch, useSelector } from "react-redux"
import { action } from "app/store"
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import VoteMeeting from './voteMeeting'
import { useEffect, useRef } from 'react'
import ResultMeeting from './resultMeeting'
import { useState } from 'react'
import { setInMeeting } from 'app/gameInfo'
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';


const ModalMeeting = () => {
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const isInVote = useSelector(selectGameInfo).isInVote
  const [seeNextResult,setseeNextResult] = useState(false)
  
  useEffect(() => {
    if (!isInVoteResult && !isInMeeting) {
      Modal.destroyAll()
    }
  },[isInVoteResult, isInMeeting])
  
  // 대충 누가 투표했는지 5초정도 보이기 위해서 띄움
  useEffect(() => {
    if (isInMeeting &&(isInVoteResult)) {
      setTimeout(()=>setseeNextResult(true), 5000)
    }
  },[isInMeeting,isInVoteResult])
  
  const votetest = () => {
    console.log('votetest실행')
    action('gameInfo/setInVote', !isInVote)
    // setTimeout(() => action('gameInfo/setInVote', !isInVote),5000); 
  }


  return (
    <>
      {/* 현재 게임 화면하단의 컴포넌트 + 회의때의 모달로 기능이 2가지로 분리되어 있는데도 불구,
      meeting(회의)/modalMeeeting 파일 하나에 2가지 기능이 몰려 있음
      -> redux를 이용해서 기능을 분화해야 함 */}
      {/* <VideoComponent /> */}7

      <Modal 
        title="AI는 누구인가?"
        open={isInMeeting}
        width={1000}
        closable={false}
        footer={[
          // 추후 닫기 버튼을 제거하고 회의 완료 요청을 받으면 action이 수행되도록 수정 필요
          <Button key="back" onClick={() => action('gameInfo/setInMeeting', !isInMeeting)}>
            닫기
          </Button>
        ]}
      >
        {isInMeeting &&(!seeNextResult)?<VoteMeeting/>:<ResultMeeting/>}
        
        {/* ※시험용으로 만둘어둔 버튼 나중에 지우기 */}
        <Button key="test1" onClick={() => action('gameInfo/setInVoteResult', !isInVoteResult)}>
            결과창띄우기
        </Button>
        <Button key="test2" onClick={() => votetest()}>
            투표시작
        </Button>
        {/* ※여기까지 */}
      </Modal>
      
    </>
)
};

export default ModalMeeting;