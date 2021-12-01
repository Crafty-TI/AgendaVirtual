import React, { Component } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import * as dates from './dates'
import moment from 'moment'
import { useEffect, useState } from "react";
import { useConeccion } from "../../hooks/useConeccion";
import { useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';

let myViews: any = Views
let allViews = Object.keys(myViews).map((k:any) => myViews[k])
const localizer = momentLocalizer(moment)


  export const Calendario : React.FC = () => {

    
    const [estudiante, setEstudiante] = useState<boolean>()
    const history = useHistory();
    const {get, put} = useConeccion();
    const [eventsList, setEventList]= useState([]);
    const [profesor, setProfesor]= useState <number>();
    const [selected, setSelected] = useState();
    const [listaProfesores, setListaProfesores] = useState <any>([])
    const titulo = estudiante ? "Estudiante" : "Profesor" 
    const ColoredDateCellWrapper = ({ children }:any) =>
    
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
      },
    })
    const handleChange = (profesorID : any)=>{
      setProfesor (profesorID)
    }

    const reservarEvento = (id : number) => {
      put(`agenda/eventoReservar`,{
        id
      })
    }

    const alerta = (event : any) =>{
    var opcion = window.confirm("Desea reservar esta sesión?");
    if (opcion == true) {
          reservarEvento(event.id)
          window.location.reload()
    } 
    }

    const handleSelectedEstudiante = (event:any) => {
      setSelected(event);
      if (event.reservado) {
        alert("La sesión ya está reservada")
      }
      else {
        console.info('[handleSelected - event]', event);
        if (estudiante) {
          alerta(event);
        }
      }
    };

    const handleSelectedProfesor = (event:any) => {
      history.push(`/editarEvento/${event.id}`)
    }

    
        useEffect(() => {
        
            get(`agenda/eventList/${profesor}`).then((response) => {
              let listaEventos = response?.data?.map((element : any) => {
                return{
                  id: element.id,
                  title: element.title,
                  start: new Date(element.start),
                  end: new Date (element.end),
                  reservado: element.reservado,
                }
              });
                setEventList(listaEventos)    
            });
        },[profesor])

        useEffect(() => {
          let usuario = JSON.parse(sessionStorage.getItem("usuario")??'')
          setEstudiante(usuario.estudiante)
          setProfesor(usuario.id)
          get('users/listaProfesores').then((response) => {
            setListaProfesores(response.data)
          })
        },[])



      return(
        <div>
          {estudiante?(
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"          
        >
          {listaProfesores.map((item : any) =>{
            return(
          <MenuItem value={item.id} onClick={() =>{
            handleChange(item.id)
          }
          }>{item.nombre} </MenuItem>
            )
          })
          }
        </Select>):
        null}

        <h1>{titulo}</h1>

      <Calendar style={{height:500, margin:65}}
      selected={selected}
      events={eventsList}
      step={60}
      showMultiDayTimes
      min={dates.add(dates.startOf(new Date(), 'day'), 6, 'hours')}
      max={dates.add(dates.endOf(new Date(), 'day'), -2, 'hours')}
      defaultDate={new Date()}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
      onSelectEvent={estudiante ? handleSelectedEstudiante : handleSelectedProfesor}

      defaultView="day"
      eventPropGetter={(event) => {
        const backgroundColor =  event.reservado ? 'red' : '' ;
        return { style: { backgroundColor } }
      }}
      
  />
  
  </div>
      )
}
