import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar, List, Input, Divider, Modal } from "antd";
import { selectGameInfo } from "app/gameInfo"
import { selectMyUserName, selectMainUser } from "app/videoInfo";
import { selectMe } from "app/me";
import { action } from "app/store"
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const isChatModalOpen = useSelector(selectGameInfo).isChatModalOpen
  const mainuser = useSelector(selectMe);
  const myUserName = useSelector(selectMe).player.id;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const chatScroll = useRef();

  useEffect(() => {}, []);

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
          stream: mainuser.streamManager.stream.streamId,
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
    <Modal title="Chatting Modal" open={isChatModalOpen} onCancel={() => action('gameInfo/setChatModalOpen', false)} footer={[]}>
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
              <List.Item key={item.nickname}>
                <List.Item.Meta
                  avatar={<Avatar src={'/testImg/mychar.PNG'} />}
                  title={item.nickname}
                  // description={item.email}
                />
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
  );
};

export default App;
