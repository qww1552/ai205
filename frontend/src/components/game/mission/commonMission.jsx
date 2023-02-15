import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Progress,Row,Col } from 'antd'
import { action } from "app/store"
import {selectOhterPlayers} from "app/others"
import { useSelector } from 'react-redux';
import UserVideoComponent from "components/webchat/UserVideoComponent";
const CommonMission = (props)=>{
 
  const [start, setStart] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const [teachableProgress, setTeachableProgress] = useState("미션 수행하기!")
  const [poseGuideFirst, setPoseGuideFirst] = useState("")
  const [poseGuideSecond, setPoseGuideSecond] = useState("")
  const otherPlayers = useSelector(selectOhterPlayers);

  const teachableTimer = useRef(null);

  useEffect(() => {
    if (!props.type) return
   
    const filePath = "/teachable_models/" + props.type + "_model/"
    // 동작이 2가지인 미션일 경우
    setPoseGuideFirst(filePath + "/" + props.subType1 + "_guide.jpg")
    setPoseGuideSecond(filePath + "/" + props.subType2 + "_guide.jpg")

    const btn = document.getElementById("teachable");
    btn.setAttribute("onclick", `init("${filePath}")`);
    btn.addEventListener("click",getCurrentPose);
  }, [props.type]);

  useEffect(() => {

    if(start) {
      let secondPoseToggle = false
      let isFinish = true;

      teachableTimer.current = setInterval(() => {
        console.log("수행중")
        let currentPose = document.getElementById("currentPose").innerHTML
        // 동작이 2가지인 미션일 경우
        if (isFinish) {
          // 1번째 동작
          if (!secondPoseToggle) {
           
            if (props.subType1 !== currentPose) {
            
              setTeachableProgress(props.subType1 + " 동작이 감지되지 않았어요...")
            } else  {
              console.log("첫번쨰 동작 @!!!!!!!!!!!!!!!!!!!!!")
              secondPoseToggle = true
              setTeachableProgress("첫번째 동작 성공!")
            } 
            // else {
            //   setTeachableProgress("좋아요! 다음은 " + props.subType2 + " 동작을 취해주세요!")
            //   secondPoseToggle = true
            //   currentPoseTimer = 0
            // }    
          } else { // 2번째 동작
           
            if (props.subType2 !== currentPose) {
              setTeachableProgress(props.subType2 + " 동작이 감지되지 않았어요...")
            } else  {
              setTeachableProgress("두번째 동작 성공!")
              console.log("두번쨰 동작 @!!!!!!!!!!!!!!!!!!!!!")

              // console.log("리퀘스트 요청!!!!!!!!!!!!!!!!!!!!1")
              //카운팅 요청 들어가야됨
              secondPoseToggle = false; 
            }
            //  else {
            //   setTeachableProgress(props.type + " 동작 유지 미션 완료!")
            //   secondPoseToggle = false
            //   currentPoseTimer = 0
            //   alert("미션완료");
            //   window.deleteCanvas();
            //   props.setComplete(true);
            //   setIsVisible(false);
            //   return clearInterval(teachableTimer)
              
            // }
          }
        } else { 
            // 미션이 종료 되었을때 수행
            setTeachableProgress(props.type + " 동작 유지 미션 완료!")
            secondPoseToggle = false
            alert("미션완료");
            window.deleteCanvas();
            props.setComplete(true);
            setIsVisible(false);
            clearInterval(teachableTimer.current)
        }
      }, 1000)
    }

      return () => clearInterval(teachableTimer.current)

  },[start])
  
 
  const getCurrentPose = () => {
    setIsVisible(true);
    setTeachableProgress("동작 시작");
    
    document.getElementById("currentPose").innerHTML = "";
    setTimeout(() => {
      setStart(true)
    }, 1000)
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
      <div>
        <Row type="flex" justify="center" align="middle" style={{backgroundColor:'black'}}>
        {otherPlayers.map((sub,i) => {     
          return (<>{sub.streamManager!==undefined && sub.player.isAlive && sub.mutedVideo!==true && (<Col span={4}>
            {/* Todo: 지금은 isAlive, isVoted 값이 초기화가 안된상태라 작동이 안됨... */}
            <UserVideoComponent  user={sub}/>
          </Col>) }</>)    
        })}
        </Row>
      </div>
      <Button id="closeMission" onClick={() => {
        setIsVisible(false);
        window.deleteCanvas();
        action('gameInfo/setMissionModalOpen', false)
      }}>미션 포기</Button>
    </>
  );
}


export default CommonMission;