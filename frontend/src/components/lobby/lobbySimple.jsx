import { roomRequest } from 'api';
import { selectMe } from 'app/me';
import { action } from 'app/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteLoaderData } from 'react-router-dom';

const LobbySimple = () => {

  const [otherPlayers, setotherPlayers] = useState([])
  const roomId = useRouteLoaderData("lobby");
  const me = useSelector(selectMe);

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
        const otherPlayers = players.filter(v => (v.id !== 'master')&&(v.id !== me.player.id))
        setotherPlayers(otherPlayers);

        for(const player of otherPlayers) {
          action('others/setOtherPlayer', {player, location : {x : 0, y: 0}})
        }
      }).catch((e) => {
        setotherPlayers([]);
      });
    }, 2000)
    return () => clearInterval(timer);
  },[]);

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
        <Link to={`/rooms/${roomId}/game`}><button>Start Game</button></Link>
      )}
    </div>
  );
};

export default LobbySimple;
