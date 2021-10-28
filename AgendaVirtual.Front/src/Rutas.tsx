import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Roles } from "./Pantallas/Roles";
import { Usuario } from "./Pantallas/Usuario";
import  UsuariosLista from "./Pantallas/UsuariosLista/index";
import { Login } from "./Pantallas/Login/";

const Rutas:React.FC = ()=>{
    return (
    <Router>
        <Switch>
          <Route path="/usuarios" component={UsuariosLista}/>
          <Route path="/roles" component={Roles}/>
          <Route path="/editarusuario/:usuarioId" component={Usuario}/>
          <Route path="/crearusuario" component={Usuario}/>
          <Route path="/login" component={Login}/>
      </Switch>
  </Router>
    );
}
export default Rutas;