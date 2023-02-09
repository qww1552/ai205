import React, { useCallback, useEffect, useRef } from "react";

const Teachable = (props) => {
  const videoRef = useRef();
  useEffect(() => {
    if (props && !!videoRef) {
     

      const canvas = document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');
      let canPlayState = false;

      ctx.textAlign = 'center';
      ctx.fillText('비디오 로딩 중..', 300, 200);

      const videoElem = document.querySelector('#teachable');
      videoElem.addEventListener('canplaythrough', render);

      function render() {
        ctx.drawImage(videoElem, 0, 0, 600, 400);
        // 첫 번째 인자로 비디오를 넣어준다.
        requestAnimationFrame(render);
      }
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props.streamManager]);

  useEffect(() => {
    // const header1 = document.createElement("script");
    // header1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js";
    // document.head.appendChild(header1);

    // const header2 = document.createElement("script");
    // header2.src =
    //   "https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js";
    // document.head.appendChild(header2);

    // const script = document.createElement("script");
    // script.innerHTML = ``;
    // script.type = "text/javascript";
    // script.async = "async";
    const btn = document.getElementById("teachable");
    btn.setAttribute("onclick", "init()");



    // document.head.appendChild(script);
  }, []);


  
  return (
    <>
      <div>
        <video id="teachable" autoPlay={true} muted={props.mutedSound} ref={videoRef} />
      </div>
      <button id="teachable" type="button">
        Start
      </button>
      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div id="label-container"></div>
    </>
  );
};

export default Teachable;
