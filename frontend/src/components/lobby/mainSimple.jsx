import { Link, Outlet } from "react-router-dom";
import "./style.css"
const MainSimple = () => {
    return (<>

            <div>
            <h1>MainPage</h1>
            <div>
                <Link to="rooms">rooms</Link>
            </div>
            <Outlet>
                
            </Outlet>
            </div>

    </>)
}

export default MainSimple;