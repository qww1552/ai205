import { roomRequest } from "api";
import Game from "components/game/game";
import RegistSimple from "components/game/regist/registSImple";
import LobbySimple from "components/lobby/lobbySimple";
import RoomList from "components/lobby/roomList";
import { createBrowserRouter, Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>MainPage</h1>
        <Link to="rooms">rooms</Link>
      </div>
    ),
  },
  {
    path: "rooms",
    element: <RoomList />,
  },
  {
    path: "rooms/:roomId/regist",
    id: "rooms",
    element: <RegistSimple/>,
    loader: async ({params}) => {
      return params.roomId;
      // return roomRequest(params.roomId);
    },
  },
  {
    path: "rooms/:roomId/lobby",
    element: <LobbySimple/>,
    loader: async ({params}) => {
      return params.roomId;
    }
  },
  {
    path: "rooms/:roomId/game",
    element: <Game/>,
  },
]);

export default router;