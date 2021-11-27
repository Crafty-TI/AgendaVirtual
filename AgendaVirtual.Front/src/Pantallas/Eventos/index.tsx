import { Button, IconButton, Stack, styled, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useConeccion } from "../../hooks/useConeccion";

export const Eventos: React.FC = () => {

      const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      }));
      

    const history = useHistory();
    const {post, put, get} = useConeccion();
    let [form,  setForm] = useState<any>({});

    let { eventoId }:any = useParams();
    const titulo = eventoId ? "Editar Evento ":"Crear Evento" 

    const createEvento = () =>{
        post(`Agenda/eventInsert/`,{
            ...form
        });
        alert("Evento Agregado")
        form = {};
        window.location.reload();
    }

    useEffect(() => {
        get(`agenda/eventoEditList/${eventoId}`).then((response) => {
            setForm(response.data[0])

        });
    },[])

    const updateEvento = (id : number) => {
        put(`agenda/eventoUpdate/`,{
            ...form
        });
        history.push(`/calendario`)
        alert("Evento Editado")
    };
    const eliminarEvento = () => {
        put(`agenda/eventoDelete`,{
            ...form
        })
        form ={}
        history.push('/calendario')
    }

    return(
        <div>
            <h1>{titulo}</h1>
                    <br />
                    <label >Título</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.title} onChange={(e) => {
                        setForm({...form,title:e.target.value})
                    }}/><br /><br />
                    <label >Día Completo</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.allDay} onChange={(e) => {
                        setForm({...form,allDay:e.target.value})
                    }}/><br /><br />
                    
                    <label >Inicio</label><br />
                    <TextField type="standard-basic" variant="standard" value={form?.start} onChange={(e) => {
                        setForm({...form,start:e.target.value})
                    }}/><br /><br />

                    <label >Fin</label><br />
                    <TextField id="standard-basic" variant="standard" value={form?.end} onChange={(e) => {
                        setForm({...form,end:e.target.value})
                    }}/><br /><br />

                        <Stack direction="row" spacing={2} style={{flex:1, justifyContent:"center"}}>
                            <Button variant="outlined" color="error" onClick={() => {
                                history.push(`/calendario`)
                            }}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="success" onClick={eventoId ?() => {
                                updateEvento(form.id)
                                }:
                                () => {createEvento()}}>
                                {eventoId ? "Actualizar": "Insertar"}
                            </Button>
                            
                            {eventoId?(
                                <Stack>
                                    <ColorButton variant="contained" onClick={()=>{
                                        eliminarEvento()
                                    }}>
                                    Eliminar</ColorButton>
                                </Stack>
                            ):
                            null}
                        </Stack>
                </div>
    )
}
