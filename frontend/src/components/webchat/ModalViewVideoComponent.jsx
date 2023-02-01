import React, {  } from "react";
import "./VideoComponent.css"
import UserVideoComponent from "./UserVideoComponent";
import { Row, Col } from "antd";
import {  useSelector,useDispatch } from "react-redux";



import {
  selectMainUser,
  selectVideoUsers,mutedSound,mutedVideo
} from "app/videoInfo";

export default function ModalViewVideoComponent() {
  const videoUsers = useSelector(selectVideoUsers);
  const  mainUser = useSelector(selectMainUser);
  const dispatch = new useDispatch();

  const handleSound = (user) => {
    console.log("handleSound~~!")
    dispatch(mutedSound(user));
    dispatch(mutedVideo(user))
  }

  const handleVideo = (user) => {
    console.log("handleVideo!!")
   
  }
 
  return (
    <>
        <div className="container">
          {mainUser.session !== undefined ? (
            <div id="session">
              <div id="video-container" className="col-md-24">
                <Row>
                  <Col md={18} offset={3}>
                    <Row gutter={(8, 8)}>
                      {mainUser.streamManager !== undefined ? (
                        <Col md={3}>
                          <div
                            className="stream-container col-md-4 col-xs-4"
                            onClick={() => handleSound(mainUser)}
                          >
                            <UserVideoComponent user={mainUser} />
                          </div>
                        </Col>
                      ) : null}
                      {videoUsers.map((sub, i) => (
                        <Col md={3}>
                          <div
                            className="stream-container col-md-4 col-xs-4"
                             onClick={() => handleSound(sub)}
                          >
                            <UserVideoComponent  user={sub} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          ) : null}
        </div>
    </>
  );

}