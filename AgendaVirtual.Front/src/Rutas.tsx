import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Roles } from "./Pantallas/Roles";
import { Usuario } from "./Pantallas/Usuario";
import UsuariosLista from "./Pantallas/UsuariosLista/index";
import { Login } from "./Pantallas/Login/";
import { Calendario } from "./Pantallas/Calendario/";
import { Eventos } from "./Pantallas/Eventos/";

const Rutas: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/usuarios" component={UsuariosLista} />
        <Route path="/roles" component={Roles} />
        <Route path="/editarusuario/:usuarioId" component={Usuario}/>
        <Route path="/crearusuario" component={Usuario} />
        <Route path="/login" component={Login} />
        <Route path="/calendario" component={Calendario} />
        <Route path="/eventos" component={Eventos} />
        <Route path="/editarEvento/:eventoId" component={Eventos} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}
export default Rutas;