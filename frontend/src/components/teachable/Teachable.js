import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Progress } from 'antd'

const Teachable = (props) => {
  // const videoRef = useRef();
  // useEffect(() => {
  //   if (props && !!videoRef) {
     

  //     const canvas = document.querySelector('#canvas');
  //     const ctx = canvas.getContext('2d');
  //     let canPlayState = false;

  //     ctx.textAlign = 'center';
  //     ctx.fillText('비디오 로딩 중..', 300, 200);

  //     const videoElem = document.querySelector('#teachable');
  //     videoElem.addEventListener('canplaythrough', render);

  //     function render() {
  //       ctx.drawImage(videoElem, 0, 0, 600, 400);
  //       // 첫 번째 인자로 비디오를 넣어준다.
  //       requestAnimationFrame(render);
  //     }
  //     props.streamManager.addVideoElement(videoRef.current);
  //   }
  // }, [props.streamManager]);
  
  const [teachableProgress, setTeachableProgress] = useState("미션 수행하기!")
  // let currentPose = ""
  // 비교용 변수를 만들어서 원하는 동작이 맞는 지 체크
  let missionPose = props.poseInfo
  let currentPoseTimer = 0
  let missionPoseTimer = 3 // 3초 유지

  
  useEffect(() => {
    const btn = document.getElementById("teachable");
    // 이 버튼 onclick에 setTeachableProgress를 또 넣을 수 있을까?
    btn.setAttribute("onclick", `init("${props.myurl}")`);
    const btn1 = document.getElementById("off")
    btn1.setAttribute("onclick",`deleteCanvas()` )
  }, [props]);

  const getPoseResult = () => {
    setTimeout(() => {
      let teachableTimer = setInterval(() => {
        let poseResult = document.getElementById("poseResult").innerHTML
        if (missionPose !== poseResult) {
          currentPoseTimer = 0
          setTeachableProgress(missionPose + " 동작이 감지되지 않았어요...")
        } else if (currentPoseTimer < missionPoseTimer) {
          currentPoseTimer += 1
          setTeachableProgress(missionPose + " 동작을 " + currentPoseTimer + "초 동안 유지 중이에요!")
        } else {
          setTeachableProgress(missionPose + " 동작 유지 미션 완료!")
          return clearInterval(teachableTimer)
        }
      }, 1000)
    }, 1000)
  }
  // try {
  //   // 일단 이러면 String의 형태로 오는 거 같긴 한데...
  //   console.log(document.getElementById("poseResult").innerHTML)
  // } catch (err) {
  //   console.log("아직 태그 생성이 안 됐어!")
  // }

  return (
    <>
      {/* <div>
        <video id="teachable" autoPlay={true} muted={props.mutedSound} ref={videoRef} />
      </div> */}
      <Button id="off">
        삭제
      </Button>
      <Button id="teachable">
        동작 정보 불러오기
      </Button>
      <div id="poseResult" style={{display:"none"}}> </div>
      <div id="divCanvas">
        
      </div>
      <div id="label-container"></div>
      <Button onClick={getPoseResult}>
        {teachableProgress}
      </Button>
    </>
  );
};

export default Teachable;
