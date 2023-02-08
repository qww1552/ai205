import React, { useEffect } from "react";
const Teachable = (props) => {
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
