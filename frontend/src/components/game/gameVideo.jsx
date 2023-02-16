import WebchatMeetingcomponent from 'components/game/meeting/webchatMeetingComponent';
import { Row, Col, Card} from "antd"
import { selectOhterPlayers } from 'app/others';
import { useSelector } from 'react-redux';
import { selectMe } from 'app/me';
import React from 'react'
import UserVideoComponent from 'components/webchat/UserVideoComponent';
import './mission/style.css'
import { COLOR } from "config/texture";
const { Meta } = Card;
const GameVideo = (props) =>{
    const otherPlayers = useSelector(selectOhterPlayers);
    const me = useSelector(selectMe);
    return (
      <div>
        <Row type="flex" justify="center" align="middle" style={{backgroundColor:'black'}}>
        <Col span = {4}>
        <Card
    cover={<UserVideoComponent user={me}/>}
    style={{backgroundColor: `${COLOR[me.player.color]}`, border: 0 }}
    bodyStyle={{backgroundColor: `${COLOR[me.player.color]}`, border: 0 }}
  >
    <Meta title="me" description="me" />
  </Card>
        </Col>
        
        {otherPlayers.map((sub,i) => {     
          return (<>{sub.streamManager!==undefined && sub.player.isAlive && sub.mutedVideo!==true && (<Col span={4}>
            {/* Todo: 지금은 isAlive, isVoted 값이 초기화가 안된상태라 작동이 안됨... */}
            <Card
    cover={<UserVideoComponent user={sub}/>}
    style={{backgroundColor: `${COLOR[sub.player.color]}`, border: 0 }}
    bodyStyle={{backgroundColor: `${COLOR[sub.player.color]}`, border: 0 }}
  >
    <Meta title="me" description="me" />
  </Card>
          </Col>) }</>)    
        })}
        </Row>
      </div>

    );
}

export default GameVideo