import SockJS from "sockjs-client"
import { over } from "stompjs"

const createClient = () => {
    console.log("--createClient")
    const url = "http://70.12.246.114:8080/api/v1/ws"
    const socket = new SockJS(url);
    const stomp_client = over(socket);

    return stomp_client;
}

const connectClient = (client) => {
    console.log("--connectClient")

    client.connect({}, () => {
        client.subscribe("/sub/room/1", function (res) {
            console.log("--- subscribe ---")
            const content = JSON.parse(res.body);
            console.log(content);
          });
    })
}


const send = ([client, location]) => {
    console.log("--send")
    const data = {
        player : { 
                name : "player1" 
            },	
        location
    }
    client.send("/pub/room/1/move", {}, JSON.stringify(data));
}

export {createClient, connectClient, send};