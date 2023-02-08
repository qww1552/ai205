import { load } from "@tensorflow-models/posenet";
import { useEffect, useRef, useState } from "react";
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

const MotionAI = () => {
  const camera = useRef();
  const figures = useRef();
  const webcamElement = camera.current;
  // useEffect(() => {
  //   load({
  //     architecture: "MobileNetV1",
  //     outputStride: 16,
  //     inputResolution: { width: 640, height: 480 },
  //     multiplier: 1.0,
  //   }).then((model) => {
  //     setPoseModel(model);
  //   });
  // }, []);

  const run = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    
    const webcam = await tf.data.webcam(webcamElement, {
      resizeWidth: 220,
      resizeHeight: 227,
    });
    while (true) {
      const img = await webcam.capture();
      const poses = await detector.estimatePoses(img);

      // console.log(img)

      // console.log(img)

      // if (figures.current) {
      //   figures.current.innerText = `prediction : ${result[0].className} \n probability: ${result[0].probability}`;
      // }

      img.dispose();

      await tf.nextFrame();
    }
  };

  useEffect(() => {
    run();
  },[]);

  // const startBtn = () => {
  //   // const image = tf.browser.fromPixels(ref.current);
  //   // console.log(poseModel)
  //   poseModel
  //     .estimateSinglePose(ref.current, {
  //       flipHorizontal: false,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     });
  // };

  return (
    <>
      <div ref={figures}></div>
      <video
        autoPlay
        playsInline
        muted={true}
        ref={camera}
        width="870"
        height="534"
      />
    </>
  );
};

export default MotionAI;
