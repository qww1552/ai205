import { roomRequest } from 'api';
import { action } from 'app/store';
import React, { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

const LobbySimple = () => {
  const [playerName, setPlayerName] = useState('');

  // const players = [
  //   { id : "player1" },
  //   { id : "player2" }, 
  // ]


  const [players, setPlayers] = useState([])

  const roomId = useRouteLoaderData("lobby");

  useEffect(()=> {
    action('SOCKET_CONNECT_REQUEST', {roomId})
  },[])

  useEffect(() => {
    document.title = `Waiting Room - ${players.length} players`;
  }, [players]);

  useEffect(() => {
    const timer = setInterval(() => {
      roomRequest(roomId).then(res =>  {

        const players = res.data.data.players.filter(v => v.id != 'master')
        setPlayers(players);
        for(const player of players) {
          action('others/setOtherPlayer', {player, location : {x : 0, y: 0}})
        }
      });
    }, 2000)
    return () => clearInterval(timer);
  },[]);

  return (
    <div className="waiting-room">
      <h1>Waiting Room</h1>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.id}</li>
        ))}
      </ul>
      {players.length >= 2 && (
        <Link to={`/rooms/${roomId}/game`}><button>Start Game</button></Link>
      )}
    </div>
  );
};

export default LobbySimple;
