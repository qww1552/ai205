import SockJS from "sockjs-client"
import axios from "axios"
import { over } from "stompjs"

const BASE_URL = `http://localhost:8080/api/v1`
const PUBLISHER_URL = '/pub/room'

const connectClient = () => {
  const socket = new SockJS(`${BASE_URL}/ws`);
  const stompClient = over(socket);
  return new Promise((resolve, reject) => {
    stompClient.connect({}, () => {
      resolve(stompClient);
    }, error => {
      reject(error);
    });
  });
}



const send = (client, action, roomId, data) => {
  client.send(`${PUBLISHER_URL}/${roomId}/${action}`, {}, JSON.stringify(data));
}


const roomRequest = (roomId) => {
  return axios.get(`${BASE_URL}/rooms/${roomId}`);
}

export { send, connectClient, roomRequest };