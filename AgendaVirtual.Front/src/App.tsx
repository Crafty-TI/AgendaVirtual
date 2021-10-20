import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Usuarios from './users'


export const App =() => {

  useEffect(()=> {
    // Make a request for a user with a given ID
    axios.get('http://localhost:3000/api/users')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[])

  return (
    <div className="App">
      <Usuarios/>
    </div>
  );
}

export default App;
