import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyUserName, selectMainUser } from "app/videoInfo";
// import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';
// import HighlightOff from '@material-ui/icons/HighlightOff';
// import Send from '@material-ui/icons/Send';

import "./ChatComponent.css";
// import { Tooltip } from "@material-ui/core";

export default function ChatComponent(props) {
  const mainuser = useSelector(selectMainUser);
  const myUserName = useSelector(selectMyUserName);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  const chatScroll = React.createRef();

  useEffect(() => {
    mainuser.getStreamManager().stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      const document = window.document;

      setTimeout(() => {
        const userImg = document.getElementById("userImg-" + (messageList.length - 1));
        const video = document.getElementById("video-" + data.streamId);
        const avatar = userImg.getContext("2d");
        avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);

        this.props.messageReceived();
      }, 50);

      setMessageList((messageList) => [
        ...messageList,
        {
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        },
      ]);
      scrollToBottom();
    });
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    console.log(message);
    if (mainuser.streamManager && message) {
      let newMessage = message.replace(/ +(?= )/g, "");
      if (newMessage !== "" && newMessage !== " ") {
        const data = {
          message: newMessage,
          nickname: myUserName,
          stream: mainuser.getStreamManager().stream.streamId,
        };

        mainuser.streamManager.stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  };

  const close = () => {
    props.close(undefined);
  };

  const styleChat = { display: props.chatDisplay };

  return (
    <div id="chatContainer">
      <div id="chatComponent" style={styleChat}>
        <div id="chatToolbar">
          <span>{mainuser.streamManager.stream.session.sessionId} - CHAT</span>
          {/* <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton> */}
        </div>
        <div className="message-wrap" ref={chatScroll}>
          {messageList.map((data, i) => (
            <div
              key={i}
              id="remoteUsers"
              className={
                "message" +
                (data.connectionId !==
                mainuser.streamManager.stream.session.connection.connectionId
                  ? " left"
                  : " right")
              }
            >
              <canvas id={"userImg-" + i} width="60" height="60" className="user-img" />
              <div className="msg-detail">
                <div className="msg-info">
                  <p> {data.nickname}</p>
                </div>
                <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{data.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="messageInput">
          <input
            placeholder="Send a messge"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          {/* <Tooltip title="Send message">
               <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                <Send />
              </Fab> 
            </Tooltip> */}
          <button id="sendButton" onClick={sendMessage}>
            메세지 전송
          </button>
        </div>
      </div>
    </div>
  );
}
