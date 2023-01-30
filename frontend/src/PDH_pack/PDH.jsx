import Game from '../components/game/canvas/gameCanvas'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setPlayer } from 'app/me'


const PDH = () => {

    const ref = useRef();
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch();

    const onClickbtn = () => {
        setCheck(true)
        dispatch(setPlayer({id: ref.current.value}))
    }

    return (
        <>
            {check && <Game/>}
            <div>
                <input ref={ref} type="text" name="" id="" />
                <button onClick={onClickbtn}>확인</button>
            </div>
        </>
    )

}

export default PDH;