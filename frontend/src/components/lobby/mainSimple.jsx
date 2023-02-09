import { Link, Outlet } from "react-router-dom";

const iframePoseHeart = () => {
    return {
        __html:
          '<iframe src="./missionPoseHeart.html" width="100%" height="700px"></iframe>'
    };
}

const MainSimple = () => {

    return (<>
        <div>
            <h1>MainPage</h1>
            <Link to="rooms">rooms</Link>
            <Outlet>
                
            </Outlet>
            <div dangerouslySetInnerHTML={iframePoseHeart()}/>
        </div>
    </>)
}

export default MainSimple;