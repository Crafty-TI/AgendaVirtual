import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Rutas from './Rutas';
import Menu from './componentes/Menu/';



export const App = () => {
  return (
    <div className="App">
        <Rutas></Rutas>
    </div>

  );
}

export default App;



