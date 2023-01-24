const SockJS = require("sockjs-client")
const Stomp = require("stompjs")

var roomName = "roomA";
var roomId = 3;
var username = "hwangyu";

console.log(roomName + ", " + roomId + ", " + username);

var sockJs = new SockJS("http://localhost:8080/stomp/chat");
//1. SockJS를 내부에 들고있는 stomp를 내어줌
var stomp = Stomp.over(sockJs);

//2. connection이 맺어지면 실행
stomp.connect({}, function () {
  console.log("STOMP Connection");

  //4. subscribe(path, callback)으로 메세지를 받을 수 있음
  stomp.subscribe("/sub/chat/room/" + roomId, function (chat) {
    var content = JSON.parse(chat.body);
    console.log(content);
  });

  //3. send(path, header, message)로 메세지를 보낼 수 있음
  stomp.send("/pub/chat/enter", {}, JSON.stringify({ roomId: roomId, writer: username }));

  send();
});

function send() {
  //4. message 보내기
  stomp.send(
    "/pub/chat/message",
    {},
    JSON.stringify({ roomId: roomId, message: "hello my name is hwangyu", writer: username })
  );
}
