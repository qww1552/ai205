import { action } from "app/store";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RegistSimple = () => {

    const ref = useRef();
    const nav = useNavigate();

    const onClickbtn = () => {
        // action('me/setPlayer',{id: ref.current.value, isVoted : false, isAlive : true})
        // action('SOCKET_CONNECT_REQUEST')
        nav("../lobby")
    }

    return (<>
        <div className="waiting-room">
            <h1>Regist</h1>
            <input ref={ref} type="text" name="" id="" />
            <button onClick={onClickbtn}>로비 접속</button>
        </div>
    </>)
}

export default RegistSimple;