import { Link, Outlet } from "react-router-dom";
import "./mainSimplestyle.css"
const MainSimple = () => {
    return (<>
            <Link to="rooms">
            <div className="image">

            {/* <div>
                rooms
            </div> */}
            <Outlet>
                
            </Outlet>
            </div></Link>



    </>)
}

export default MainSimple;