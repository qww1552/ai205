import { roomRequest } from 'api';
import { selectGameInfo } from 'app/gameInfo';
import { selectMe } from 'app/me';
import { action } from 'app/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';

const LobbySimple = () => {

  const [otherPlayers, setotherPlayers] = useState([])
  const roomId = useRouteLoaderData("lobby");

  const me = useSelector(selectMe);
  const navigate = useNavigate();
  let isInGame = useSelector(selectGameInfo).isInGame;

  useEffect(()=> {
    action('SOCKET_CONNECT_REQUEST', {roomId})
  },[])

  useEffect(() => {
    document.title = `Waiting Room - ${otherPlayers.length} otherPlayers`;
  }, [otherPlayers]);

  useEffect(() => {
    const timer = setInterval(() => {
      roomRequest(roomId).then(res =>  {
        const players = res.data.data.players
        const otherPlayers = players.filter(v => v.id !== me.player.id)
        setotherPlayers(otherPlayers);
      }).catch((e) => {
        setotherPlayers([]);
      });
    }, 2000)
    return () => clearInterval(timer);
  },[]);

  useEffect(() => {
    if(isInGame) {
      navigate(`/rooms/${roomId}/game`)
    }
  },[isInGame])

  const gameStartBtn = () => {
    action('GAME_START_REQUEST');
  }

  return (
    <div className="waiting-room">
      <h1>Waiting Room</h1>
      <h2>Me</h2>
        {me.player.id}
      <h2>OtherPlayers</h2>
      <ul>
        {otherPlayers.map((player, i) => (
          <li key={`${player.id}${i}`}>{player.id}</li>
        ))}
      </ul>
      {otherPlayers.length >= 1 && (
        <button onClick={gameStartBtn}>Start Game</button>
        // <Link to={`/rooms/${roomId}/game`}><button>Start Game</button></Link>
      )}
    </div>
  );
};

export default LobbySimple;
