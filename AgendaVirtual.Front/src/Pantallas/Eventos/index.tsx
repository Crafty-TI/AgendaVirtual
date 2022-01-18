import { Button, IconButton, Stack, styled, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useConeccion } from "../../hooks/useConeccion";


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export const Eventos: React.FC = () => {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    }));


    const history = useHistory();
    const { post, put, get } = useConeccion();
    let [form, setForm] = useState<any>({});
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const [fechaInputStart, setFechaInputStart] = useState(new Date().toISOString().split('.')[0]);
    const [fechaInputEnd, setFechaInputEnd] = useState(new Date().toISOString().split('.')[0]);

    let { eventoId }: any = useParams();
    const titulo = eventoId ? "Editar Evento " : "Crear Evento"

    useEffect(() => {
        if (eventoId) {
            get(`agenda/eventoEditList/${eventoId}`).then((response) => {
                setForm(response.data[0])
                formatDateStart(response.data[0].start)
                formatDateEnd(response.data[0].end)
            });
        }
    }, [])
    
    const createEvento = () => {
        let fechaInsertarStart = new Date(form.start)
        let formatted_dateStart = fechaInsertarStart.getFullYear() + "-" + (fechaInsertarStart.getMonth() + 1) + "-" + fechaInsertarStart.getDate() + " " + fechaInsertarStart.getHours() + ":" + fechaInsertarStart.getMinutes() + ":" + fechaInsertarStart.getSeconds();
        let fechaInsertarEnd = new Date(form.end)
        let formatted_dateEnd = fechaInsertarEnd.getFullYear() + "-" + (fechaInsertarEnd.getMonth() + 1) + "-" + fechaInsertarEnd.getDate() + " " + fechaInsertarEnd.getHours() + ":" + fechaInsertarEnd.getMinutes() + ":" + fechaInsertarEnd.getSeconds();
        
        post(`Agenda/eventInsert/`, {
            ...form, end: formatted_dateEnd, start: formatted_dateStart
        });
        alert(JSON.stringify(form))
        alert("Evento Agregado")
        form = {};
        window.location.reload();
    }

    const updateEvento = () => {
        let fechaInsertarStart = new Date(form.start)
        let formatted_dateStart = fechaInsertarStart.getFullYear() + "-" + (fechaInsertarStart.getMonth() + 1) + "-" + fechaInsertarStart.getDate() + " " + fechaInsertarStart.getHours() + ":" + fechaInsertarStart.getMinutes() + ":" + fechaInsertarStart.getSeconds();
        let fechaInsertarEnd = new Date(form.end)
        let formatted_dateEnd = fechaInsertarEnd.getFullYear() + "-" + (fechaInsertarEnd.getMonth() + 1) + "-" + fechaInsertarEnd.getDate() + " " + fechaInsertarEnd.getHours() + ":" + fechaInsertarEnd.getMinutes() + ":" + fechaInsertarEnd.getSeconds();

        put(`agenda/eventoUpdate/`, {
            ...form, end: formatted_dateEnd, start: formatted_dateStart
        });
        history.push(`/calendario`)
        alert("Evento Editado")

        alert(JSON.stringify(form))

    };
    const eliminarEvento = () => {
        put(`agenda/eventoDelete`, {
            ...form
        })
        form = {}
        history.push('/calendario')
    }

    const handleChange = (newValue: any) => {
        setValue(newValue);
    };


    //retorna una fecha que acepta el textField
    const formatDateStart = (fecha: any) => {
        if (fecha) {
            const date: Date = new Date(fecha);
            //const formatted_date1 = date.toISOString().split('.')[0];
            const formatted_date1 = new Date(new Date(date).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
            setFechaInputStart(formatted_date1);
        }
    }
    const formatDateEnd = (fecha: any) => {
        if (fecha) {
            const date: Date = new Date(fecha);
            //const formatted_date1 = date.toISOString().split('.')[0];
            const formatted_date1 = new Date(new Date(date).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
            setFechaInputEnd(formatted_date1);
        }
    }

    useEffect(() => {
        console.log("Se ejecutó ")
    }, [fechaInputStart, fechaInputEnd])


    return (
        <div>
            <h1>{titulo}</h1>
            <br />
            <label >Título</label><br />
            <TextField id="standard-basic" variant="standard" value={form?.title} onChange={(e) => {
                setForm({ ...form, title: e.target.value })
            }} /><br /><br />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={1}>
                    <DateTimePicker
                        label="Date&Time picker"
                        value={form?.start}
                        onChange={(e) => {
                            setForm({ ...form, start: e })
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider><br /><br />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={1}>
                    <DateTimePicker
                        label="Date&Time picker"
                        value={form?.end}
                        onChange={(e) => {
                            setForm({ ...form, end: e })
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider><br /><br />



            <Stack direction="row" spacing={2} style={{ flex: 1, justifyContent: "center" }}>
                <Button variant="outlined" color="error" onClick={() => {
                    // formatDate()
                    history.push(`/calendario`)
                }}>
                    Cancelar
                </Button>
                <Button variant="contained" color="success" onClick={eventoId ? () => {
                    updateEvento()
                } :
                    () => { createEvento() }}>
                    {eventoId ? "Actualizar" : "Insertar"}
                </Button>

                {eventoId ? (
                    <Stack>
                        <ColorButton variant="contained" onClick={() => {
                            eliminarEvento()
                        }}>
                            Eliminar</ColorButton>
                    </Stack>
                ) :
                    null}
            </Stack>
        </div>
    )
}
