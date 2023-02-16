import { action, persistor } from "app/store";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./mainSimplestyle.css"

const MainSimple = () => {
    useEffect(()=>{
        action("dead/setInit",'')
        action("gameInfo/setInit",'')
        action("gameResult/setInit",'')
        action("gameSet/setInit",'')
        action("me/setInit",'')
        action("missionInfo/setInit",'')
        action("others/setInit",'')
        action("result/setInit",'')
        action("voteInfo/setInit",'')
        persistor.purge()
    })
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