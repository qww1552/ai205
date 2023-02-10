import { Link, Outlet } from "react-router-dom";

const MainSimple = () => {
    return (<>
        <div>
            <h1>MainPage</h1>
            <div>
            <Link to="rooms">rooms</Link>

            </div>
            <div>
                <Link to="test">test</Link>

            </div>
            <Outlet>
                
            </Outlet>
        </div>
    </>)
}

export default MainSimple;