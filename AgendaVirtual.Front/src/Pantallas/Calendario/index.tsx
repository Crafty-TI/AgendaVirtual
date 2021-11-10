import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import * as dates from './dates'
import moment from 'moment'
import { useEffect, useState } from "react";
import { useConeccion } from "../../hooks/useConeccion";

const now = new Date()
let myViews: any = Views
let allViews = Object.keys(myViews).map((k:any) => myViews[k])
const localizer = momentLocalizer(moment)


  export const Calendario : React.FC = () => {
    
    const ColoredDateCellWrapper = ({ children }:any) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
      },
    })
    const {get} = useConeccion();
    const [eventsList, setEventList]= useState([]);
    
        useEffect(() => {
            get('agenda/eventList').then((response) => {
              let lista = response.data.map((element : any) => {
                return{
                  id: element.id,
                  title: element.title,
                  allDay: element.allDay === 'true',
                  start: new Date(element.start),
                  end: new Date (element.end),
                }
              });
              console.table(lista)
                setEventList(lista)
    
            });
        },[])

      return(
      <Calendar style={{height:500}}
      events={eventsList}
      views={allViews}
      step={60}
      showMultiDayTimes
      min={dates.add(dates.startOf(new Date(), 'day'), 6, 'hours')}
      max={dates.add(dates.endOf(new Date(), 'day'), -2, 'hours')}
      defaultDate={new Date(2021, 10, 21)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
  />)
}
