import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setPlayer } from 'app/me'
import GameCanvas from 'components/game/canvas/gameCanvas'
import MissionProgress from 'components/game/mission/missionProgress'
import MissionList from 'components/game/mission/missionList'
import ImageButton from 'components/game/button/imageButton'
import ModalMeeting from 'components/game/meeting/modalMeeting'
import WebchatMeeting from './meeting/webchatMeeting'


const Game = () => {

    const ref = useRef();
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch();

    const onClickbtn = () => {
        setCheck(true)
        dispatch(setPlayer({name: ref.current.value}))
    }

    return (
        <>
            {check && <div>
                <GameCanvas/>
                <div className="missionComponent floatingComponent">
                    <MissionProgress/>
                    <MissionList/>
                </div>
                <ImageButton/>
                <ModalMeeting/>
            </div>}
            {!check && <div>
                <input ref={ref} type="text" name="" id="" />
                <button onClick={onClickbtn}>확인</button>
            </div>}
            <WebchatMeeting/>

        </>
    )

}

export default Game;