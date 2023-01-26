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
      {/* button/imageButton에서부터 redux 기능으로 값 변경 정보를 받아와야 함... */}
      {/* <Button type="primary" onClick={handleOpen}>
        Launch Modal Webcam
      </Button>
      <Modal
        open={open}
        onCancel={handleClose}
        width={1000}
        footer={[
          <Button
            key="Close"
            type="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        ]}
      >
       
      </Modal> */}
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