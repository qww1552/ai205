import TeachablePos from 'components/teachable/teachablePose';
import { Link, Outlet } from "react-router-dom";
import { Modal, Button } from 'antd'
import { useState } from 'react'
import TeachablePose from 'components/teachable/teachablePose';

const MotionMission = () => {
  const [testModalOpen, setTestModalOpen] = useState(false)
  const [poseFileUrl, setPoseFileUrl] = useState("")
  const [poseInfo, setPoseInfo] = useState("")
  const [poseTarget, setPoseTarget] = useState("")

  // 모달창 끄고 켜는 것에 display none을 연동시키려 했지만 잘 안 됨

  // const teachableCanvas = document.getElementById("divCanvas")

  // const showCanvas = () => {
  //     setTimeout(() => {
  //         teachableCanvas.style.display = "block"
  //     }, 2000)
  // }
  // const hideCanvas = () => {
  //     setTimeout(() => {
  //         teachableCanvas.style.display = "none"
  //     }, 2000)
  // }

  return (<>
      <div>
          <h1>MainPage</h1>
          <Link to="rooms">rooms</Link>
          <Outlet>
              
          </Outlet>
          <br></br>
          {/* Teachable.js의 useEffect 구문에 [props] 추가함 */}
          <Button
              type="primary"
              onClick={() => {
                  // showCanvas()
                  setTestModalOpen(true)
                  setPoseFileUrl("/my_model/")
                  setPoseInfo("Class 2")
                  setPoseTarget("양 팔로 X자 만들기")
              }}
          >
              X자 모델 열기
          </Button>
          <Button
              type="primary"
              onClick={() => {
                  // showCanvas()
                  setTestModalOpen(true)
                  setPoseFileUrl("/heart_model/")
                  setPoseInfo("heartLeft")
                  setPoseTarget("왼쪽 팔 하트")
              }}
          >
              하트 모델 열기
          </Button>
          <Modal
              open={testModalOpen}
              footer={[
                  <Button
                      key="submit"
                      onClick={() => {
                          // hideCanvas()
                          setTestModalOpen(false)
                      }}
                  >
                      창 닫기
                  </Button>
          ]}>
              <h1> 당신의 미션은 {poseTarget}입니다! </h1>
              <h2> 먼저 아래 버튼을 눌러 카메라를 테스트하세요! </h2>    
              <TeachablePose myurl={poseFileUrl} poseInfo={poseInfo} poseTarget={poseTarget}/>
          </Modal>
      </div>
  </>)
};

export default MotionMission;