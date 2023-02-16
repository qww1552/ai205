import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Progress } from 'antd'
import { action } from "app/store"

// let teachableTimer;

const TeachableMission = (props) => {

  const [start, setStart] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const [teachableProgress, setTeachableProgress] = useState("미션 수행하기!")
  const [poseGuideFirst, setPoseGuideFirst] = useState("")
  const [poseGuideSecond, setPoseGuideSecond] = useState("")

  const teachableTimer = useRef(null);


  useEffect(() => {
    if (!props.type) return
    // console.log(props.type)
    const filePath = "/teachable_models/" + props.type + "_model/"
    // 동작이 2가지인 미션일 경우
    if (props.id === "5" || props.id === "10" || props.id === "11") {
      setPoseGuideFirst(filePath + "/" + props.subType1 + "_guide.jpg")
      setPoseGuideSecond(filePath + "/" + props.subType2 + "_guide.jpg")
    } else { // 동작이 1개인 미션일 경우
      setPoseGuideFirst(filePath + "/" + props.type + "_guide.jpg")
      setPoseGuideSecond("")
    }
    const btn = document.getElementById("teachable");
    btn.setAttribute("onclick", `init("${filePath}")`);
    btn.addEventListener("click",getCurrentPose);
  }, [props.type]);
  

  useEffect(() => {
    if(start) {


      let currentPoseTimer = 0
      let targetPoseTimer = 3 // 3초 유지
      let secondPoseToggle = false

      teachableTimer.current = setInterval(() => {
        let currentPose = document.getElementById("currentPose").innerHTML
        // 동작이 2가지인 미션일 경우
        if (props.id === "5" || props.id === "10" || props.id === "11") {
          // 1번째 동작
          if (!secondPoseToggle) {
            if (props.subType1 !== currentPose) {
              currentPoseTimer = 0
              setTeachableProgress(props.motion1 + " 동작이 감지되지 않았어요...")
            } else if (currentPoseTimer < targetPoseTimer) {
              currentPoseTimer += 1
              setTeachableProgress(props.motion1 + " 동작을 " + currentPoseTimer + "초 동안 유지 중이에요!")
            } else {
              setTeachableProgress("좋아요! 다음은 " + props.motion2 + " 동작을 취해주세요!")
              secondPoseToggle = true
              currentPoseTimer = 0
            }    
          } else { // 2번째 동작
            if (props.subType2 !== currentPose) {
              currentPoseTimer = 0
              setTeachableProgress(props.motion2 + " 동작이 감지되지 않았어요...")
            } else if (currentPoseTimer < targetPoseTimer) {
              currentPoseTimer += 1
              setTeachableProgress(props.motion2 + " 동작을 " + currentPoseTimer + "초 동안 유지 중이에요!")
            } else {
              setTeachableProgress(" 동작 유지 미션 완료!")
              secondPoseToggle = false
              currentPoseTimer = 0
            
              window.deleteCanvas();
              props.setComplete(true);
              setIsVisible(false);
              clearInterval(teachableTimer.current)
              
            }
          }
        } else { // 동작이 1개인 미션일 경우
          if (props.type !== currentPose) {
            currentPoseTimer = 0
            setTeachableProgress(props.motion1 + " 동작이 감지되지 않았어요...")
          } else if (currentPoseTimer < targetPoseTimer) {
            currentPoseTimer += 1
            setTeachableProgress(props.motion1 + " 동작을 " + currentPoseTimer + "초 동안 유지 중이에요!")
          } else {
            setTeachableProgress(" 동작 유지 미션 완료!")
            currentPoseTimer = 0
          
            window.deleteCanvas();
            props.setComplete(true);
            setIsVisible(false);
            clearInterval(teachableTimer.current)
          }    
        }
      }, 1000)
    }
    return () => {
      clearInterval(teachableTimer.current)
    }
  },[start])
 
  const getCurrentPose = () => {
    setIsVisible(true);
    setTeachableProgress("동작 시작");
    
    setTimeout(() => {
      setStart(true)
    },1000)
  }

  // 1. 이미지 가이드는 넣었는가? OK
  // 2. 동작에 대한 설명은 들어갔는가? OK
  // 3. 2개 이상의 동작에 대한 로직이 완성되었는가?
  return (
   
    <>
      <h1> {props.content} </h1>
      <div>
        <img src={poseGuideFirst} style={{width:"300px", height:"200px", display:poseGuideFirst?"inline":"none"}} alt="가이드1"/>
        <img src={poseGuideSecond} style={{width:"300px", height:"200px", display:poseGuideSecond?"inline":"none"}} alt="가이드2"/>
      </div>
      <Button id="teachable">
        미션 수행하기
      </Button>
      <div id="currentPose" style={{display:"none"}}> </div>
      <div id="divCanvas">
        
      </div>
      <div id="label-container"></div>
      <div style={{ display: isVisible ? "block" : "none" }}>{teachableProgress}</div>
      
      <Button id="closeMission" onClick={() => {
        setIsVisible(false);
        window.deleteCanvas();
        action('gameInfo/setMissionModalOpen', false)
      }}>미션 포기</Button>
    </>
  );
};

export default TeachableMission;
