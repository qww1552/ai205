import Game from "components/game/game";
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
    path: "rooms/:roomId",
    loader: async () => {
      // return axios('http://localhost:8080/api/v1/rooms/0c827963-6661-5511-92f9-dd7d375b968d')
    },
    element: <LobbySimple/>
  },
  {
    path: "rooms/:roomId/game",
    element: <Game/>
  },
]);

export default router;