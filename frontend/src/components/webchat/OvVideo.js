import React, {useCallback, useEffect, useRef} from "react";
export default function OpenViduVideoComponent(props) {
  const videoRef = useRef();

  const makeStyle = useCallback(() => {
    return { display: props.mutedVideo ? "none" : "block" };
  }, [props.mutedVideo]);

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props.streamManager]);

  return (
    <div style={makeStyle()}>
      <video autoPlay={true} muted={props.mutedSound} ref={videoRef} />
    </div>
  );
}
