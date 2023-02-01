import { roomRequest } from "api";
import App from "App";
import Game from "components/game/game";
import RegistSimple from "components/game/regist/registSImple";
import LobbySimple from "components/lobby/lobbySimple";
import MainSimple from "components/lobby/mainSimple";
import RoomList from "components/lobby/roomList";
import { createBrowserRouter, Link, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "rooms",
        element: <RoomList />,
      },
      {
        path: "rooms/:roomId/lobby",
        element: <LobbySimple/>,
        id: "lobby",
        loader: async ({params}) => {
          return params.roomId;
        }
      },
      {
        path: "rooms/:roomId/regist",
        id: "regist",
        element: <RegistSimple/>,
        loader: async ({params}) => {
          return params.roomId;
          // return roomRequest(params.roomId);
        },
      },
      {
        path: "rooms/:roomId/game",
        element: <Game/>,
      },
    ]
  },
]);

export default router;