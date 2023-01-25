import { useState, useCallback } from 'react'
import { Modal, Button } from 'antd'
import 'styles/styles.css'

const ModalConference = () => {

  const [open, setOpen] = useState(false);
  const [userMedia, setUserMedia] = useState(false);

  const handleShow = useCallback(() => setOpen(true), [setOpen]);

  const handleClose = useCallback(
    () => {
      setOpen(false);
      setUserMedia(false);
    },
    [setOpen, setUserMedia]
  );

  // const handleOnUserMedia = useCallback(() => setUserMedia(true), [
  //   setUserMedia
  // ]);

  return (
    <>
      <Button type="primary" onClick={handleShow}>
        Launch Modal Webcam
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
        <h1> 웹캠 화면 넣을 곳 </h1>
        
      </Modal>
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