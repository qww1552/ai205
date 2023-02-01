import SockJS from "sockjs-client"
import axios from "axios"
import { over } from "stompjs"

const BASE_URL = `http://${process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRESS : 'localhost'}:8080/api/v1`
const SUBSCRIBE_URL = '/sub/room'
const PUBLISHER_URL = '/pub/room'

const createClient = () => {
  console.log("--createClient")
  const socket = new SockJS(`${BASE_URL}/ws`);
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


const roomRequest = (roomId) => {
  return axios.get(`${BASE_URL}/rooms/${roomId}`);
}

export { createClient, send, connectClient, roomRequest };