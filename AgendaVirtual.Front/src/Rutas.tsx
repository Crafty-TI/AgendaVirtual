import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Roles } from "./Pantallas/Roles";
import { UsuariosLista } from "./Pantallas/UsuariosLista";
import { Usuario } from "./Pantallas/Usuario"; 


const Rutas:React.FC = ()=>{ 
    return (
    <Router>
        <Switch>
          <Route path={`/usuario/:usuarioId`} component={Usuario}/>
          <Route path="/usuarioslista" component={UsuariosLista}/>
          <Route path="/roles" component={Roles}/>
      </Switch>
  </Router>
    );
} 
export default Rutas;