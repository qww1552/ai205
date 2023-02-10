import React, { useCallback, useEffect, useRef } from "react";
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
  
  useEffect(() => {
    const btn = document.getElementById("teachable");
    btn.setAttribute("onclick", `init("${props.myurl}")`);
  }, []);

  const getPoseResult = () => {
    setTimeout(() => {
      console.log(document.getElementById("poseResult").innerHTML)
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
      <Button id="teachable">
        카메라 테스트하기
      </Button>
      <div id="poseResult" style={{display:"none"}}> </div>
      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div id="label-container"></div>
      <Button onClick={getPoseResult}>
        미션 수행!
      </Button>
    </>
  );
};

export default Teachable;
