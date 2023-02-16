import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default function UserVideoComponent(props) {
  return (
    <div>
      {props.user.streamManager !== undefined ? (
        // <div className="streamcomponent">
          <OpenViduVideoComponent
            mutedSound={props.user.mutedSound}
            mutedVideo={props.user.mutedVideo}
            streamManager={props.user.streamManager}
          />
          
      ) : null}
    </div>
  );
}
