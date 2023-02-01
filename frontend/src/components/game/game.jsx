import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import GameCanvas from 'components/game/canvas/gameCanvas'
import MissionProgress from 'components/game/mission/missionProgress'
import MissionList from 'components/game/mission/missionList'
import ImageButton from 'components/game/button/imageButton'
import ModalMeeting from 'components/game/meeting/modalMeeting'
import LoadingSpinner from 'components/loadingSpinner'
import { action } from 'app/store'

const Game = () => {

    const ref = useRef();
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch();

    const onClickbtn = () => {
        setCheck(true)
        action('me/setPlayer',{id: ref.current.value, isVoted : false, isAlive : true})
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
                {/* 로딩 스피너 필요시 import 후 다음과 같이 사용하면 됩니다. */}
                <LoadingSpinner/>
                <input ref={ref} type="text" name="" id="" />
                <button onClick={onClickbtn}>확인</button>
            </div>}

        </>
    )

}

export default Game;