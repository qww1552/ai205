import { selectGameInfo } from 'app/gameInfo';
import React from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';

import UserVideoComponent from "components/webchat/UserVideoComponent";
import "./style.css"

const WebchatMeetingcomponent = (props) => {
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult

  return (
    // props.userinfo.key 로 가져온다
    <>
        {props.user.player.id && <Card title={props.user.player.id} size="small"
      extra={[
        <CheckSquareTwoTone twoToneColor='LimeGreen' style={{ fontSize: '20px' }} />, " ",
        <CustomerServiceTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px' }} />, " ",
        <AudioTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px' }} />, " ",
        <AlertTwoTone twoToneColor='Red' style={{ fontSize: '20px' }} />
      ]}>

      <UserVideoComponent user={props.user} />

    </Card>}
    </>


  );
};

export default WebchatMeetingcomponent;