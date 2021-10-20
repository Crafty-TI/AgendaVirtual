import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Roles } from "./Pantallas/Roles";
import { UsuariosLista } from "./Pantallas/UsuariosLista/index";

const Rutas:React.FC = ()=>{
    return (
    <Router>
        <Switch>
          <Route path="/usuarios" component={UsuariosLista}/>
          <Route path="/roles" component={Roles}/>
      </Switch>
  </Router>
    );
}
export default Rutas;