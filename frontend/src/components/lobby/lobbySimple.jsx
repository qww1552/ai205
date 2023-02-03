import { useSelect } from '@react-three/drei';
import { roomRequest } from 'api';
import { selectGameInfo } from 'app/gameInfo';
import { action } from 'app/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate, useRouteLoaderData } from 'react-router-dom';


const LobbySimple = () => {

  let isInGame = useSelector(selectGameInfo).isInGame;

  const gameStartBtn = () => {
    action('GAME_START_REQUEST');
  }

  const [players, setPlayers] = useState([])
  const navigate = useNavigate();

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

  useEffect(() => {
    if(isInGame) {
      navigate(`/rooms/${roomId}/game`)
    }
  },[isInGame])

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
        <button onClick={gameStartBtn}>Start Game</button>
      )}
    </div>
  );
};

export default LobbySimple;