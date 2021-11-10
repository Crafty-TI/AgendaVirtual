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
      <a href={`/editarusuario/${987}`}>Editar Usuario</a>
      <br />
      <a href={`/crearusuario`}>Añadir Usuario</a>
      <br />
      <a href={`/login`}>Login</a>
      <br />
      <a href={`/calendario`}>Calendario</a>
      <Rutas></Rutas>
    </div>

  );
}

export default App;



