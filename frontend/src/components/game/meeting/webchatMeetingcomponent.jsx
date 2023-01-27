import React from 'react';
import "./style.css"

const WebchatMeetingcomponent = (props) => {
  return (
    <div className='box'>
      {props.userinfo}
    </div>
  );
};

export default WebchatMeetingcomponent;