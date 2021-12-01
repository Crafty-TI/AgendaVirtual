import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Roles } from "../../Pantallas/Roles";
import { Usuario } from "../../Pantallas/Usuario";
import UsuariosLista from "../../Pantallas/UsuariosLista/index";

import { Calendario } from "../../Pantallas/Calendario/";
import { Eventos } from "../../Pantallas/Eventos/";


const drawerWidth = 240

const RutasEstudiante = [
    {
        nombreRuta: 'calendario',
        texto: 'calendario',
        icono: PeopleAltIcon,
    }
]
const RutasProfesor = [
    {
        nombreRuta: 'eventos',
        texto: 'eventos',
        icono: PeopleAltIcon,
    }
]

const RutasAdmin = [
    {
        nombreRuta: 'usuarios',
        texto: 'usuarios',
        icono: PeopleAltIcon,
    },
    {
        nombreRuta: 'login',
        texto: 'logOut',
        icono: LoginIcon,
    },
    {
        nombreRuta: 'calendario',
        texto: 'calendario',
        icono: DescriptionIcon,
    },
    {
        nombreRuta: 'eventos',
        texto: 'eventos',
        icono: DescriptionIcon,
    },
]
const Menu = ({ children }: any) => {
    const history = useHistory();
    const [logueado, setLogueado] = useState(true)
    const [rutas, setRutas] = useState<any[]>([])


    useEffect(() => {
        if(sessionStorage.length>0){
            setLogueado(true)
            let usuario = JSON.parse(sessionStorage.getItem("usuario")??'')
            if (usuario.admin) {
                setRutas(RutasAdmin)
            }
            else if (usuario.estudiante) {
                setRutas(RutasEstudiante)
            }
            else{
                setRutas(RutasProfesor)
            }
        }else{
            history.push(`/login`)
        }

    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Agenda
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {rutas.map((item, index) => (
                                <ListItem button key={`/${item.texto}`}>
                                    <ListItemIcon>
                                        <item.icono />
                                    </ListItemIcon>
                                    <a href={`/${item.nombreRuta}`}><ListItemText primary={`${item.texto}`} ></ListItemText> </a>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />

                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Route path="/roles" component={Roles} />
        <Route path="/editarusuario/:usuarioId" component={Usuario}/>
        <Route path="/crearusuario" component={Usuario} />
        <Route path="/usuarios" component={UsuariosLista} />
        <Route path="/calendario" component={Calendario} />
        <Route path="/eventos" component={Eventos} />
        <Route path="/editarEvento/:eventoId" component={Eventos} />
                </Box>              
        </Box>
    );
}

export default Menu