import { useRef, useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import useScript from "./useScript"
import * as tf from '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose';

const MainSimple = () => {

    const [loading, error] = useScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js", "https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js");
    if (error) console.log("에러 발생");
    if (loading) console.log("로드 중...");

    const URL = "https://teachablemachine.withgoogle.com/models/Y9Ln5KVkH/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // let model, webcam, ctx, labelContainer, maxPredictions;
    // let labelContainer;
    const requestRef = useRef(0)
    const canvasRef = useRef();

    const [start, setStart] = useState(false)

    const [model, setModel] = useState(null)
    const [webcam, setWebcam] = useState(null)
    const [ctx, setCtx] = useState(null)
    const [labelContainer, setLabelContainer] = useState(null)
    const [maxPredictions, setMaxPredictions] = useState(null)

    useEffect(() => {
        tmPose.load(modelURL, metadataURL).then((data) => {
            console.log("model load")
            setModel(data)
            setCtx(canvasRef.current.getContext('2d'))
        })
    },[])

    useEffect(() => {
        if(model) {
            console.log("set predictions")
            setMaxPredictions(model.getTotalClasses())
            const size = 200;
            const flip = true; // whether to flip the webcam
            setWebcam(new tmPose.Webcam(size, size, flip))
        }
    },[model])

    useEffect(() => {
        if(webcam) {
            async function temp() {
                console.log("webcam setup and start")
                await webcam.setup()
                webcam.play();
            }
            temp();
        }
    },[webcam])


    async function init() {


        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)

        // model = await tmPose.load(modelURL, metadataURL);
        // setModel(tmPose.load(modelURL, metadataURL))
        // maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam

        // webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        // await webcam.setup(); // request access to the webcam
        // webcam.play();

        console.log(webcam, model, ctx)
        setStart(true)


        // setCtx(canvasRef.current.getContext('2d'))

        // await webcam.play();
        // windowRender()
        // window.requestAnimationFrame(loop); // 첫 렌더링

        // append/get elements to the DOM
        // const canvas = document.getElementById("canvas");
        // canvas.width = size; canvas.height = size;
        // ctx = canvas.getContext("2d");
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }

    }

    const loop = async () => {
        if(webcam) {
            console.log(webcam.canvas)
            webcam.update();
            ctx.drawImage(webcam.canvas, 0, 0);

        }
        // if(model) {
        //     await predict();
        // }
        requestRef.current = requestAnimationFrame(loop);
    }

    useEffect(() => {
        if(start) {
            requestRef.current = requestAnimationFrame(loop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    },[start])

    // const windowRender = timestamp => {
    //     requestRef.current = requestAnimationFrame(loop)
    // }

    // async function loop(timestamp) {
    //     webcam.update(); // update the webcam frame
    //     await predict();
    //     // windowRender()
    //     window.requestAnimationFrame(loop);
    // }
    
    // useEffect(() => {
    //     if (webcam) {
    //         requestRef.current = requestAnimationFrame(loop)
    //         return () => cancelAnimationFrame(requestRef.current)
    //     }
    // }, [])

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        // console.log(webcam.canvas)
        console.log(model)
        console.log(webcam)
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }

    return (<>
        <div>
            <h1>MainPage</h1>
            <Link to="rooms">rooms</Link>
            <Outlet>
                
            </Outlet>
            <div>Teachable Machine Pose Model</div>
            <button type="button" onClick={init}>Start</button>
            <div><canvas ref={canvasRef} style={{width : 200, height : 200}} id="canvas"></canvas></div>
            <div id="label-container"></div>
        </div>
    </>)
}

export default MainSimple;