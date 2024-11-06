import './ReserveCalendar.css'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

export default function ReserveCalendar() {
  const today = new Date();
  const oneYearFromNow = new Date(today); // Clone the current date
  oneYearFromNow.setFullYear(today.getFullYear() + 1); 

  return (
    <div className='ReserveCalendar-div'>
      <Calendar calendarType='gregory' minDate={today} maxDate={oneYearFromNow}/>
    </div>
  )
}