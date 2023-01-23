import SockJS from "sockjs-client"
import { over } from "stompjs"


const url = "http://192.168.219.102:8080/api/v1/ws"

const createClient = () => {
    console.log("--createClient")
    const socket = new SockJS(url);
    const stomp_client = over(socket);

    return stomp_client;
}

const connectClient = (client) => {
    console.log("--connectClient")
    client.connect({}, () => {
        // console.log(client, url)
        // client.subscribe(url, callback);
    })
}



const send = (client, data) => {
    console.log("--send")
    client.send("/pub/room/1/move", {}, JSON.stringify(data));
}

export {createClient, connectClient, send};