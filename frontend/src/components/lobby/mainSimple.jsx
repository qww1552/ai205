import GameCanvas from "components/game/canvas/gameCanvas";
import { Link, Outlet } from "react-router-dom";

const MainSimple = () => {
    return (<>
        <div>
            <h1>MainPage</h1>
            <Link to="rooms">rooms</Link>
            <Outlet>
                
            </Outlet>
            <GameCanvas/>
        </div>
    </>)
}

export default MainSimple;