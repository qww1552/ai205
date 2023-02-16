import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar, List, Input, Divider, Modal } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { selectMe } from "app/me";
import { action } from "app/store"
import InfiniteScroll from "react-infinite-scroll-component";
import { COLOR } from "config/texture";
import { selectOhterPlayers } from "app/others";


const App = () => {
  const isChatModalOpen = useSelector(selectGameInfo).isChatModalOpen
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const mainuser = useSelector(selectMe);
  const myUserName = useSelector(selectMe).player.id;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const chatScroll = useRef();
  const others = useSelector(selectOhterPlayers)
  const unReadMessagesRef = useRef(0)

  useEffect(()=>{
    if(isChatModalOpen) {
      // console.log('useEffect 0으로 초기화')
      action('gameInfo/setunReadMessage', true)
    }
  },[isChatModalOpen])

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
  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  };

  useEffect(() => {
    mainuser.streamManager.stream.session.on("signal:chat", (event) => {
      
      const data = JSON.parse(event.data);
      if (data.nickname !== mainuser.player.id) {
      if (!isChatModalOpen) {
        action('gameInfo/setunReadMessage')

      }}
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
    // console.log(message);
    if (mainuser.streamManager && message) {
      let newMessage = message.replace(/ +(?= )/g, "");
      if (newMessage !== "" && newMessage !== " ") {
        const data = {
          message: newMessage,
          nickname: myUserName,
          stream: mainuser.streamManager.stream.streamId,
        };
        if(isChatModalOpen === true) {
          action('gameInfo/setunReadMessage', unReadMessagesRef.current)
        };
        mainuser.streamManager.stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  return (
    // <div className="z-index10000">
    <Modal zIndex={10000} title="Chatting Modal" open={isChatModalOpen&&!isInVoteResult} onCancel={() => action('gameInfo/setChatModalOpen', false)} footer={[]}>
      <div
        ref={chatScroll}
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={messageList.length}
          // next={loadMoreData}
          hasMore={messageList.length < 50}
          // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List>
            {messageList.map((item, i) => (
              
              <List.Item key={item.nickname+i}>
                {/* {colors.size()!==0? */}
                <List.Item.Meta
                  avatar={<Avatar src={`/testImg/char_color/char_${COLOR[getColors(item.nickname)]}_mini.png`} />}
                  title={item.nickname}
                  // description={item.email}
                />
                {/* :<div></div>} */}
                <div>{item.message}</div>
                
              </List.Item>
           
            ))}
          </List>
        </InfiniteScroll>
      </div>
      <div id="messageInput">
        <Input
          placeholder="메세지 보내기"
          id="chatInput"
          value={message}
          onChange={handleChange}
          onKeyPress={handlePressKey}
        />
      </div>
    </Modal>
    // </div>
  );
};

export default App;
