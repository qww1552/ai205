import { selectGameInfo, setInVote, setInVoteResult } from "app/gameInfo"
import { useDispatch, useSelector } from "react-redux"
import { action } from "app/store"
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import VoteMeeting from './voteMeeting'
import { useEffect, useRef } from 'react'
import ResultMeeting from './resultMeeting'
import { useState } from 'react'
import { setInMeeting } from 'app/gameInfo'
import NoticeMeeting from './noticeMeeting'


const ModalMeeting = () => {
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const isInVote = useSelector(selectGameInfo).isInVote
  const [seeNextResult,setSeeNextResult] = useState(false)
  const [completeNoticeMeet, setCompleteNoticeMeet] = useState(false)
  const isChatModalOpen = useSelector(selectGameInfo).isChatModalOpen


  useEffect(() => {
    if (isInMeeting &&(isInVoteResult)) {
      setTimeout(()=>{setSeeNextResult(true);
        setTimeout(()=>{
          action('gameInfo/setInMeeting', false)
        },5000)}, 8000)

    }
  },[isInMeeting,isInVoteResult])

  useEffect(() => {
    if (isChatModalOpen === true&& isInVoteResult === true) {
      action('gameInfo/setChatModalOpen', false)
    }
  })
  

  // 대충 미팅시작할때랑 끝날때 변수를 변화시키는 내용
  // isInMeeting에 연결되었기때문에 문제생길수 있을듯...?
  useEffect(() => {
    // 모달창이 닫히면 변수를 모두 초기화한다
    if (isInMeeting === false) {
      // console.log('미팅창 비활성화')
      action('gameInfo/setInVoteResult', false)
      action('gameInfo/setInVote', false)
      setCompleteNoticeMeet(false)
      setSeeNextResult(false)
    }
    if (isInMeeting === true) {
      // console.log('미팅창 활성화')
      setTimeout(()=>setCompleteNoticeMeet(true),5000)
      action('gameInfo/setInVoteResult', false)
      action('gameInfo/setInVote', false)
      setCompleteNoticeMeet(false)
      setSeeNextResult(false)
    }
  },[isInMeeting])
  return (
    <>
      {/* 현재 게임 화면하단의 컴포넌트 + 회의때의 모달로 기능이 2가지로 분리되어 있는데도 불구,
      meeting(회의)/modalMeeeting 파일 하나에 2가지 기능이 몰려 있음
      -> redux를 이용해서 기능을 분화해야 함 */}
      {/* <VideoComponent /> */}

      <Modal 
        title="MimicBot은 누구인가?"
        open={isInMeeting}
        width={1920}
        closable={false}
        footer={[

        ]}
      className = 'g'>
        {completeNoticeMeet === false?<NoticeMeeting/>:isInMeeting &&(!seeNextResult)?<VoteMeeting/>:<ResultMeeting/>}
      </Modal>
      
    </>
)
};

export default ModalMeeting;
