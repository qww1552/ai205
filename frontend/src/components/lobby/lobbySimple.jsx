import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LobbySimple = () => {
  const [playerName, setPlayerName] = useState('');

  const players = [
    "player1", "player2"
  ]

  useEffect(() => {
    document.title = `Waiting Room - ${players.length} players`;
  }, [players]);

  const handleChange = e => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!playerName) return;
    addPlayer(playerName);
  };

  const addPlayer = playerName => {
    // dispatch action to add player to store
  };

  return (
    <div className="waiting-room">
      <h1>Waiting Room</h1>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player}>{player}</li>
        ))}
      </ul>
      {players.length >= 2 && (
        <Link to='game'><button>Start Game</button></Link>
      )}
    </div>
  );
};

export default LobbySimple;