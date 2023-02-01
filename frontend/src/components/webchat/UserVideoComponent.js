import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default function UserVideoComponent(props) {
  return (
    <div>
      {props.user.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent
            mutedSound={!props.user.audioActive}
            mutedVideo={!props.user.videoActive}
            streamManager={props.user.streamManager}
          />
          <div>
            <p>{props.user.nickname}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
