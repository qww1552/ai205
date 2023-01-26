import { useState, useCallback } from 'react'
import { Modal, Button } from 'antd'
import 'styles/styles.css'
import VideoComponent from 'components/webchat/VideoComponent'

const ModalConference = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [setOpen])
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <>
      {/* 현재 게임 화면하단의 컴포넌트 + 회의때의 모달로 기능이 2가지로 분리되어 있는데도 불구,
      conference(회의)/modalConference 파일 하나에 2가지 기능이 몰려 있음
      -> redux를 이용해서 기능을 분화해야 함 */}
       <VideoComponent />
      {/* {check && <div>
        투표 화면
      </div>}
      {!check && <div>
        결과 화면
      </div>} */}

    </>
)
};

export default ModalConference;