
import React, { useEffect, useState } from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { selectMe } from 'app/me';
import { selectOhterPlayers } from 'app/others';

import { COLOR } from "config/texture";

const VoteResultFrom = (props) => {
  const mainuser = useSelector(selectMe);
  const others = useSelector(selectOhterPlayers)
  const [li, setLi] = useState({
    data:[]
  })
  useEffect(()=>{
    if (props.from){
    setLi((prevState)=>{
      return {...prevState,data:props.from.data}
    })}
    // console.log(li)
  },[props])

  const getColors=(name)=>{
    if (mainuser.player.id === name) {
      return(mainuser.player.color)   
  }else{
          for (let i =0; i<others.length; i++) {
        if (others[i].player.id === name) {
      return(others[i].player.color)
      break;
        }
      }
  }}
  return (

    <div>
    <Avatar.Group>
      {li.data.map((user) => {
        return(
      <Tooltip title={user} placement="top">
      <Avatar src={`/testImg/char_color/char_${COLOR[getColors(user)]}_mini.png`} />
      </Tooltip>)
      })}

    </Avatar.Group>

    </div>
  );
};

export default VoteResultFrom;
