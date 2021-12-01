import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Roles } from "./Pantallas/Roles";
import { Usuario } from "./Pantallas/Usuario";
import UsuariosLista from "./Pantallas/UsuariosLista/index";

import { Calendario } from "./Pantallas/Calendario/";
import { Eventos } from "./Pantallas/Eventos/";
import Menu from "./componentes/Menu";
import { Login } from "./Pantallas/Login/";
const Rutas: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="*" component={Menu} />
      </Switch>
    </Router>
  );
}
export default Rutas;