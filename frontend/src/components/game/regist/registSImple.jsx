import { Button, message, Input, Row } from "antd";
import { roomRequest } from "api";
import { action } from "app/store";
import { useState, useRef } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Link} from 'react-router-dom';

const RegistSimple = (props) => {
    const [userName, setUserName] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const ref = useRef();
    const nav = useNavigate();
    const userNameHandler = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
      };
    const success = () => {
        messageApi.open({
          type: 'warning',
          content: '중복된 이름입니다! 다른 이름을 입력해주세요',
          duration: 2.0,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      };
    const warnigMessage = () => {
        messageApi.open({
            type: 'warning',
            content: '생성할수 없는 이름입니다! 다른 이름을 입력해주세요',
            duration: 2.0,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });

    }

    const roomId = props.roomId.data
    const NameMake = () => {
        if (userName === "" || userName === "skip") {
            warnigMessage()
        }else{
            let isIn = true
            roomRequest(roomId)
            .then((res)=>{
                const players = res.data.data.players
                for (let idx in players) {
                    if (players[idx].id === userName) {
                        success()
                        isIn = false
                        break;
                    } 
                }
                if(isIn) {
                    action('me/setPlayer',{id: userName})
                    nav(`/rooms/${roomId}/lobby`)
                }
    
            }).catch((e) =>{
                console.log('실패!')
                console.log(e)
            })
        }
 
    }
        
    const onClickbtn = () => {
        action('me/setPlayer',{id: userName})
        nav(`/rooms/${roomId}/lobby`)
    }
    
    return (<>
        {contextHolder}
        <div className="waiting-room">
            <h1>Regist</h1>
            <div style={{marginBottom: '5%'}}>
            <Input value={userName} onChange={userNameHandler} placeholder='NickName'></Input>
            </div>
            {/* <Input ref={ref} type="text" name="" id="" /> */}
            <Row justify="center">
                <Button type="primary" ghost onClick={NameMake}>로비 접속</Button>
</Row>
        </div>
    </>)
}

export default RegistSimple;