import React, { useCallback, useEffect, useRef } from "react";

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
    btn.setAttribute("onclick", "init("+ "/my_model/" +")");

    const btn2 = document.getElementById("teachable2")
    btn2.setAttribute("onclick", "init("+ "/heart_model/" +")")

  }, []);

  return (
    <>
      {/* <div>
        <video id="teachable" autoPlay={true} muted={props.mutedSound} ref={videoRef} />
      </div> */}
      <div/>
      <button id="teachable" type="button">
        Start
      </button>
      <button id="teachable2" type="button">
        Start2
      </button>

      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div id="label-container"></div>
    </>
  );
};

export default Teachable;
