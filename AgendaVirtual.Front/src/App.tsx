import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Rutas from './Rutas';



export const App = () => {

  return (
    <div className="App">
      <a href="/usuarios">usuarios</a>
      <br />
      <a href="/roles">roles</a>
      <br />
      <a href={`/editarusuario/${987}`}>usuario editar Con ID</a>
      <br />
      <a href={`/crearusuario`}>usuario agregar Con ID</a>
      <Rutas></Rutas>
    </div>

  );
}

export default App;



