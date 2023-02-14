import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Progress } from 'antd'

const TeachableMission = (props) => {
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

  const [isVisible, setIsVisible] = useState(false);
  const [teachableProgress, setTeachableProgress] = useState("미션 수행하기!")
  let currentPoseTimer = 0
  let targetPoseTimer = 3 // 3초 유지

  
  useEffect(() => {
    if (!props.type) return
    console.log(props.type)
    const filePath = "/teachable_models/" + props.type + "_model/"
    const btn = document.getElementById("teachable");
    btn.setAttribute("onclick", `init("${filePath}")`);
    btn.addEventListener("click",getCurrentPose);
    // const btn1 = document.getElementById("off")
    // btn1.addEventListener("click",window.deleteCanvas);
    // btn1.setAttribute("onclick",`deleteCanvas()` )
  }, [props.type]);
  
  const getCurrentPose = () => {
    setIsVisible(true);
    setTeachableProgress("동작 시작");
    currentPoseTimer = 0;
    setTimeout(() => {
      let teachableTimer = setInterval(() => {
        let currentPose = document.getElementById("currentPose").innerHTML
        // console.log(currentPose);
        if (props.type !== currentPose) {
          currentPoseTimer = 0
          setTeachableProgress(props.type + " 동작이 감지되지 않았어요...")
        } else if (currentPoseTimer < targetPoseTimer) {
          currentPoseTimer += 1
          setTeachableProgress(props.type + " 동작을 " + currentPoseTimer + "초 동안 유지 중이에요!")
        } else {
          setTeachableProgress(props.type + " 동작 유지 미션 완료!")
          alert("미션완료");
          window.deleteCanvas();

          props.setComplete(true);
          setIsVisible(false);

          return clearInterval(teachableTimer)
        }
      }, 1000)
    }, 1000)
  }
  // try {
  //   // 일단 이러면 String의 형태로 오는 거 같긴 한데...
  //   console.log(document.getElementById("currentPose").innerHTML)
  // } catch (err) {
  //   console.log("아직 태그 생성이 안 됐어!")
  // }

  return (
    <>
      {/* <div>
        <video id="teachable" autoPlay={true} muted={props.mutedSound} ref={videoRef} />
      </div> */}
      {/* <Button id="off">
        삭제
      </Button> */}
      <Button id="teachable">
        미션 수행하기
      </Button>
      <div id="currentPose" style={{display:"none"}}> </div>
      <div id="divCanvas">
        
      </div>
      <div id="label-container"></div>
      {/* <Button onClick={getCurrentPose}>
        미션수행
      </Button> */}
      <div style={{display:isVisible?"block":"none"}}>{teachableProgress}</div>
    </>
  );
};

export default TeachableMission;
