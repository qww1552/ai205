import SockJS from "sockjs-client"
import { over } from "stompjs"

const BASE_URL = `http://${process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRESS : 'localhost'}:8080/api/v1/ws`
const SUBSCRIBE_URL = '/sub/room'
const PUBLISHER_URL = '/pub/room'

const createClient = () => {
  console.log("--createClient")
  const socket = new SockJS(BASE_URL);
  const stomp_client = over(socket);

  return stomp_client;
}

const connectClient = (client, roomId, callback) => {
  console.log("--connectClient")
  client.connect({}, () => {
    client.subscribe(`${SUBSCRIBE_URL}/${roomId}`, callback);
  })
}


const send = (client, action, roomId, data) => {
  client.send(`${PUBLISHER_URL}/${roomId}/${action}`, {}, JSON.stringify(data));
}

export { createClient, send, connectClient };