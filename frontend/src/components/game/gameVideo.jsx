import WebchatMeetingcomponent from 'components/game/meeting/webchatMeetingComponent';
import { Row, Col, } from "antd"
import { selectOhterPlayers } from 'app/others';
import { useSelector } from 'react-redux';
import { selectMe } from 'app/me';
import React from 'react'
import UserVideoComponent from 'components/webchat/UserVideoComponent';

const GameVideo = (props) =>{
    const otherPlayers = useSelector(selectOhterPlayers);
    const me = useSelector(selectMe);
    return (
      <div>
        <Row type="flex" justify="center" align="middle" style={{backgroundColor:'black'}}>

        <Col span = {4}>
       <UserVideoComponent user={me}/>
        </Col>
        {otherPlayers.map((sub,i) => {     
          return (<>{sub.streamManager!==undefined && (<Col span={4}>
            {/* Todo: 지금은 isAlive, isVoted 값이 초기화가 안된상태라 작동이 안됨... */}
            <UserVideoComponent  user={sub}/>
          </Col>) }</>)    
        })}
        </Row>
      </div>

    );
}

export default GameVideo