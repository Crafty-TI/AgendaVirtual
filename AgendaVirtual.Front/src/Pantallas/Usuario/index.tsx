import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useConeccion } from "../../hooks/useConeccion";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Usuario: React.FC = () => {
    const history = useHistory();
    const {get, put, post} = useConeccion();
    //valores que se van a editar o insertar:
    let [form,  setForm] = useState<any>({});
    //*

    let { usuarioId }:any = useParams();
    const titulo = usuarioId ? "Editar Usuario ":"Crear Usuario" 

    useEffect(() => {
        get(`users/userEditList/${usuarioId}`).then((response) => {
            setForm(response.data[0])

        });
    },[])

    const updateUsuario = (id : number) => {
        put(`users/userUpdate/`,{
            ...form
        });
        history.push(`/usuarios`)
        alert("Usuario Editado")
    };

    const createUsuario = () =>{
        post(`users/userInsert/`,{
            ...form
        });
        alert("Usuario Agregado")
        // form = {};
        // window.location.reload();
    }
      
            return (
                <div>
                    <h1>{titulo}</h1>
                    <br />
                    <label >Nombre</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.nombre} onChange={(e) => {
                        setForm({...form,nombre:e.target.value})
                    }}/><br /><br />
                    <label >Apellido</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.apellido} onChange={(e) => {
                        setForm({...form,apellido:e.target.value})
                    }}/><br /><br />
                    <label >Mail</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.mail} onChange={(e) => {
                        setForm({...form,mail:e.target.value})
                    }}/><br /><br />
                    
                    <label >Password</label><br />
                    <TextField type="password" id="standard-basic" variant="standard" value={form?.password} onChange={(e) => {
                        setForm({...form,password:e.target.value})
                    }}/><br /><br />

                    <label >Telefono</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.tel} onChange={(e) => {
                        setForm({...form,tel:e.target.value})
                    }}/><br /><br />
                    <label >Rol</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.rol_id} onChange={(e) => {
                        setForm({...form,rol_id:e.target.value})
                    }}/><br /><br />

                        <Stack direction="row" spacing={2} style={{flex:1, justifyContent:"center"}}>
                            <Button variant="outlined" color="error" onClick={() => {
                                history.push(`/usuarios`)
                            }}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="success" onClick={usuarioId ?() => {
                                updateUsuario(form.id)
                            }:
                            () => {createUsuario()}}>
                                {usuarioId ? "Actualizar": "Insertar"}
                            </Button>
                        </Stack>
                </div>
            )
     

}