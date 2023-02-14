import { useState, useRef, useEffect } from 'react'
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
import { addPlayerVideo, removePlayerVideo, setMyIsSpeakingFalse, setMyIsSpeakingTrue } from 'app/me'
import { KeyboardControls } from "@react-three/drei";
import GameResult from 'components/game/gameResult'
import GameVideo from './gameVideo';
  import {
    selectMySessionId,
  } from "app/videoInfo";
import { selectMe,setMySoundOff,setMyVideoOff} from 'app/me';
import { setOtherPlayerVideoInfo,setIsSpeakingFalse,setIsSpeakingTrue,removeOtherPlayerVideoInfo , setOtherVideoOff,setOtherSoundOff} from 'app/others'
import { selectGameInfo } from 'app/gameInfo';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import gameResult from 'app/gameResult';
  const APPLICATION_SERVER_URL = `http://${ process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRES : 'localhost'}:8080/api/v1/`;

const Game = () => {

    const ref = useRef();
    const dispatch = useDispatch();
    const stateMe = useSelector(selectMe);
    const roomId = useRouteLoaderData("lobby");


    const mySessionId = useSelector(selectMySessionId);
    let isInGame = useSelector(selectGameInfo).isInGame;
    const navigate = useNavigate();
    
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
            
            // dispatch(setConnectionId(mySession.connection.connectionId))
            // dispatch(setStreamManager(publisher))
            // dispatch(setSession(mySession))
            localUser.setConnectionId(mySession.connection.connectionId);
            localUser.setScreenShareActive(false);
            localUser.setStreamManager(publisher);
            localUser.setSession(mySession)
            
            dispatch(addPlayerVideo(localUser));
            //   dispatch(setMySoundOff(localUser.getNickname()))
            // dispatch(setMyVideoOff(localUser.getNickname()));

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
            newUser.isSpeaking = false
            dispatch(setOtherPlayerVideoInfo(newUser));
            // dispatch(setOtherSoundOff(newUser.getNickname()))
            // dispatch(setOtherVideoOff(newUser.getNickname()));
            // dispatch(addVideoUsers(newUser));
             
        });

      
        mySession.on("streamDestroyed",  (event) => {
            const nick = event.stream.connection.data.split('%')[0];
            const data = {
                nickname: JSON.parse(nick).clientData
            };
            
            dispatch(removeOtherPlayerVideoInfo(data));
            // dispatch(deleteVideoUsers(event.stream)); 
        });
        

        mySession.on("exception", (exception) => {
            console.warn(exception);
        });

        // 여기서부터 발언자표시 시험
        mySession.on("publisherStartSpeaking", (event) => {
            if (mySession.connection.connectionId === event.connection.connectionId) {
                dispatch(setMyIsSpeakingTrue())
            }
            else {
            dispatch(setIsSpeakingTrue())
            }
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
            if (mySession.connection.connectionId === event.connection.connectionId) {
                dispatch(setMyIsSpeakingFalse())
            }
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
        const mySession = stateMe.player.session;
        
        if (mySession) {
        mySession.disconnect();
        }

        OV = null;
        dispatch(removePlayerVideo());
        // dispatch(removeMainUser());
        // dispatch(setMySessionId("SessionA"));
        // dispatch(setMyUserName("Participant" + Math.floor(Math.random() * 100)));
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
    // ※isInGame이 false 가 되면 gameResult 컴포넌트로 이동
    // useEffect(() => {
    //     leaveSession();
    //     if(isInGame === false) {
    //         navigate(`/rooms/${roomId}/gameresult`)
    //       }
    // },[isInGame])
    // 여기까지
    return (
        <KeyboardControls
        map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "mapKey", keys: ["Tab"] },
            { name: "chatKey", keys: ["C", "c"] },
            { name: "reportKey", keys: ["R", "r"] },
            { name: "killKey", keys: ["Q", "q"] },
            { name: "actKey", keys: ["E", "e", "Space"] },
            { name: "escKey", keys: ["Esc"] },
        ]}>
            {stateMe.streamManager!==undefined &&(<GameVideo/>)}
            <div id="parent" style={{position : "relative", height:"75vh"}}>
                <GameCanvas/>
                <div className="missionComponent floatingComponent">
                    <MissionProgress/>
                    <MissionList/>
                </div>
                {/* joinSession을 실행하는데 시간이 오래 걸려서, openVidu와 관련된 컴포넌트를 먼저 렌더링하려고 시도하면
                mainUser에 아직 값이 없어 에러가 발생함 */}
                {stateMe.streamManager!==undefined &&(<ImageButton/>)}
                {stateMe.streamManager!==undefined &&(<ModalMeeting/>)}
                {stateMe.streamManager!==undefined &&(<GameResult/>)}
            </div>
            {
            // !check && <div>
            //     {/* 로딩 스피너 필요시 import 후 다음과 같이 사용하면 됩니다. */}
            //     <LoadingSpinner/>
            //     <input ref={ref} type="text" name="" id="" />
            //     <button onClick={onClickbtn}>확인</button>
            // </div>
            }
            {/* <button onClick={() => action('gameInfo/setInGame', false)}>게임최종결과</button> */}

        </KeyboardControls>
    )
}

export default Game;