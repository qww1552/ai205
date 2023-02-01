import React from 'react';
import './App.css';
import { BrowserRouter, Link, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
