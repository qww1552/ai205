import Game from './game/game'
import { useSelector } from 'react-redux';
import { selectMe } from 'app/me';

const PDH = () => {

    const meState = useSelector(selectMe)

    return (
        <>
            <Game/>
            <div>x : {meState.location.x}</div>
            <div>y : {meState.location.y}</div> 
        </>
    )

}

export default PDH;