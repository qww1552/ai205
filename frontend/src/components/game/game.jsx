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
    deleteVideoUsers, addVideoUsers,removeMainUser
  } from "app/videoInfo";
  
  import {
    selectMySessionId,
    selectMyUserName,
    selectMainUser
  } from "app/videoInfo";

  const APPLICATION_SERVER_URL = "http://localhost:8080/api/v1/";
const Game = () => {

    const ref = useRef();
    const dispatch = useDispatch();


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
            dispatch(addVideoUsers(newUser));
             
        });

      
        mySession.on("streamDestroyed",  (event) => {
            dispatch(deleteVideoUsers(event.stream)); 
        });
        

        mySession.on("exception", (exception) => {
            console.warn(exception);
        });
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
                <ImageButton/>
                <ModalMeeting/>
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