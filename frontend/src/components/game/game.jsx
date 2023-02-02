import { useState,useRef,useEffect } from 'react'
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux'
import GameCanvas from 'components/game/canvas/gameCanvas'
import MissionProgress from 'components/game/mission/missionProgress'
import MissionList from 'components/game/mission/missionList'
import ImageButton from 'components/game/button/imageButton'
import ModalMeeting from 'components/game/meeting/modalMeeting'
import LoadingSpinner from 'components/loadingSpinner'
import { action } from 'app/store'
import createUser from 'components/webchat/user-model';


import {
    setMySessionId,
    setMyUserName,
    addMainUser,
    deleteVideoUsers, addVideoUsers,removeMainUser,
    setIsSpeakingFalse,setIsSpeakingTrue,
  } from "app/videoInfo";
  
  import {
    selectMySessionId,
    selectMyUserName,
    selectMainUser
  } from "app/videoInfo";
import { selectMe } from 'app/me';

  const APPLICATION_SERVER_URL = "http://localhost:8080/api/v1/";
const Game = () => {

    const ref = useRef();
    const dispatch = useDispatch();
    const stateMe = useSelector(selectMe);



    const mySessionId = useSelector(selectMySessionId);
    const myUserName = useSelector(selectMyUserName);
    const mainUser = useSelector(selectMainUser);

    let OV;

    const onClickbtn = () => {
        action('me/setPlayer',{id: ref.current.value, isVoted : false, isAlive : true})
        joinSession(ref.current.value);
    }

     //비디오
     const onbeforeunload = (event) => {
        leaveSession();
    };


    const joinSession = (name) => {
        window.addEventListener("beforeunload", onbeforeunload);
    
        OV = new OpenVidu();
        const res = OV.initSession();
        var mySession = res;



        const localUser = new createUser();
        localUser.setNickname(name);
        getToken().then((token) => {
      
        mySession
            .connect(token, { clientData: localUser.getNickname()})
            .then(async () => {
        
            let publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
            });

            mySession.publish(publisher);
            
            
            localUser.setConnectionId(mySession.connection.connectionId);
            localUser.setScreenShareActive(false);
            localUser.setStreamManager(publisher);
            localUser.setSession(mySession)
            dispatch(addMainUser(localUser));


            })
            .catch((error) => {
            console.log("There was an error connecting to the session:", error.code, error.message);
            });



        });

        mySession.on("streamCreated", (event) => {
            var subscriber =  mySession.subscribe(event.stream, undefined);
            const newUser = new createUser();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            // 발언자 표시를 나타내는 변수를 추가한다
            newUser.isSpeaking=false
            dispatch(addVideoUsers(newUser));
             
        });

      
        mySession.on("streamDestroyed",  (event) => {
            dispatch(deleteVideoUsers(event.stream)); 
        });
        

        mySession.on("exception", (exception) => {
            console.warn(exception);
        });

        // 여기서부터 발언자표시 시험
        mySession.on("publisherStartSpeaking", (event) => {
            dispatch(setIsSpeakingTrue(event.connection.connectionId))
            // for (let i = 0; i < ref.current.children.length; i++) {
            //   if (
            //     JSON.parse(event.connection.data).clientData ===
            //     ref.current.children[i].innerText
            //   ) {
            //     ref.current.children[i].style.borderStyle = "solid";
            //     ref.current.children[i].style.borderColor = "#1773EA";
            //   }
            // }
            // console.log(
            //   "User " + event.connection.connectionId + " start speaking"
            // );
          });
  
        mySession.on("publisherStopSpeaking", (event) => {
            dispatch(setIsSpeakingFalse(event.connection.connectionId))
        // console.log(
        //     "User " + event.connection.connectionId + " stop speaking"
        // );
        // for (let i = 0; i < ref.current.children.length; i++) {
        //     if (
        //     JSON.parse(event.connection.data).clientData ===
        //     ref.current.children[i].innerText
        //     ) {
        //     ref.current.children[i].style.borderStyle = "none";
        //     }
        // }
        });
        // 여기까지
  
    };

    const leaveSession = () => {
        window.removeEventListener("beforeunload", onbeforeunload);
        const mySession = mainUser;
        
        if (mySession) {
        mySession.disconnect();
        }

        OV = null;
        dispatch(removeMainUser());
        dispatch(setMySessionId("SessionA"));
        dispatch(setMyUserName("Participant" + Math.floor(Math.random() * 100)));
    };


    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    };


    const createSession = async (sessionId) => {
        const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions",
        { customSessionId: sessionId },
        {
            headers: { "Content-Type": "application/json" },
        }
        );
        return response.data; // The sessionId
    };


    const createToken = async (sessionId) => {
        const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
        {},
        {
            headers: { "Content-Type": "application/json" },
        }
        );
        return response.data; // The token
    };

    useEffect(() => {
        // action('me/setPlayer',{id: ref.current.value, isVoted : false, isAlive : true})
        joinSession(stateMe.player.id);
    }, [])


    useEffect(() => {
        
        return () => {
        leaveSession();
        };
    }, []);
        

    return (
        <>
            <div>
                <GameCanvas/>
                <div className="missionComponent floatingComponent">
                    <MissionProgress/>
                    <MissionList/>
                </div>
                {/* joinSession을 실행하는데 시간이 오래 걸려서, openVidu와 관련된 컴포넌트를 먼저 렌더링하려고 시도하면
                mainUser에 아직 값이 없어 에러가 발생함 */}
                {mainUser!==undefined &&(<ImageButton/>)}
                {mainUser!==undefined &&(<ModalMeeting/>)}
            </div>
            {
            // !check && <div>
            //     {/* 로딩 스피너 필요시 import 후 다음과 같이 사용하면 됩니다. */}
            //     <LoadingSpinner/>
            //     <input ref={ref} type="text" name="" id="" />
            //     <button onClick={onClickbtn}>확인</button>
            // </div>
            }

        </>
    )

}

export default Game;