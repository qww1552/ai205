import { useEffect,useRef } from "react";
import * as posenet from '@tensorflow-models/posenet';
import './teach.css'
const Teachable = (props) =>{

  const videoRef = useRef();

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props.streamManager]);

const clicka = ()=>{
  const video = document.getElementById("teach");
  const canvas = document.getElementById("teach_canvas");
  const context = canvas.getContext("2d");

  
  posenet.load().then((model) => {
    // 이곳의 model과 아래 predict의 model은 같아야 한다.
    video.onloadeddata = (e) => {
        //비디오가 load된 다음에 predict하도록. (안하면 콘솔에 에러뜸)
        predict();
    };

    function predict() {
        //frame이 들어올 때마다 estimate를 해야하니 함수화 시킴
        model.estimateSinglePose(video).then((pose) => {
            canvas.width = video.width; //캔버스와 비디오의 크기를 일치시킴
            canvas.height = video.height;

            drawKeypoints(pose.keypoints, 0.6, context); //정확도 
            drawSkeleton(pose.keypoints, 0.6, context);
        });
        requestAnimationFrame(predict); //frame이 들어올 때마다 재귀호출
    }
  });
}

const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;

const toTuple = ({y, x}) => {
    return [y, x];
}

const drawPoint = (ctx, y, x, r, color) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

const drawSegment = ([ay, ax], [by, bx], color, scale, ctx) => {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

const drawSkeleton = (keypoints, minConfidence, ctx, scale = 1) => {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

    adjacentKeyPoints.forEach((keypoints) => {
        drawSegment(toTuple(keypoints[0].position), toTuple(keypoints[1].position), color, scale, ctx);
    });
}

const drawKeypoints = (keypoints, minConfidence, ctx, scale = 1) => {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];

        if (keypoint.score < minConfidence) {
            continue;
        }

        const {y, x} = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 3, color);
    }
}

const drawBoundingBox = (keypoints, ctx) => {
    const boundingBox = posenet.getBoundingBox(keypoints);

    ctx.rect(
        boundingBox.minX,
        boundingBox.minY,
        boundingBox.maxX - boundingBox.minX,
        boundingBox.maxY - boundingBox.minY
    );

    ctx.strokeStyle = boundingBoxColor;
    ctx.stroke();
}
  return (
  <>
    <video id="teach" width="640" height="480" ref={videoRef} autoPlay={true} playsInline></video>
    <canvas id="teach_canvas"></canvas>
    <button onClick={clicka}>확인</button>
  </>
  );
}

export default Teachable;