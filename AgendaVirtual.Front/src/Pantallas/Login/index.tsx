import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useConeccion } from '../../hooks/useConeccion';

export const Login: React.FC = () => {
    const history = useHistory();
    const {put} = useConeccion();
    const [login, setLogin] = useState({})

    const validarLogin = () => {
        put(`users/login`,{
            ...login
        }).then((response) => {
            if (response?.data?.message?.length>0) {
                alert(response.data.message)
            }
            else{
                history.push(`/usuarios`)
            }
        })    
    }
    return (
    <div className="form">
        <h1>Inicio de Sesión</h1> 
        <label>Usuario</label><br /><br />
        <TextField onChange={(e)=>{setLogin({...login,mail:e.target.value})}}></TextField><br /><br />
        <label>Contraseña</label><br /><br />
        <TextField type="password" onChange={(e)=>{setLogin({...login,password:e.target.value})}}></TextField><br /><br />
        <Button variant="contained" onClick={() => {validarLogin()}}>
            Acceder</Button>
    </div>
    )
}

