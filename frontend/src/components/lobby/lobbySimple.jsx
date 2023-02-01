import { roomRequest } from 'api';
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

  useEffect(() => {
    document.title = `Waiting Room - ${players.length} players`;
  }, [players]);

  useEffect(() => {
    const timer = setInterval(() => {
      roomRequest(roomId).then(res =>  {
        const data = res.data.data
        setPlayers(data.players);
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
        <Link to='game'><button>Start Game</button></Link>
      )}
    </div>
  );
};

export default LobbySimple;