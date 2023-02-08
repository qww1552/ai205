import MotionAI from "components/tensorflow/motionAI";
import { Link, Outlet } from "react-router-dom";

const MainSimple = () => {
    return (<>
        <div>
            <h1>MainPage</h1>
            <Link to="rooms">rooms</Link>
            <Outlet>
                
            </Outlet>
            <MotionAI/>
        </div>
    </>)
}

export default MainSimple;