import React from 'react';
import './App.css';
import Game from 'components/game/game';
import RoomList from 'components/lobby/roomList';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import router from 'router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
