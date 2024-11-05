import './ReserveCalendar.css';
import { useState, useEffect } from 'react';

export default function ReserveCalendar() {
  const calendarDays = new Array(35).fill(null);
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDay();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayIndex = firstDayOfMonth.getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = [
    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
  ];
  return (
    <div className='ReserveCalendar-div'>
      <div className='ReserveCalendar-div-month'>
        <p className='ReserveCalendar-month'>{monthNames[month]}</p>
      </div>
      <div className='ReserveCalender-div-dayNames'>
        {dayNames.map((day) => {
          return (<p className='ReserveCalendar-dayName'>{day}</p>)
        })}
      </div>
      <div className='ReserveCalendar-div-days'>
        {calendarDays.map((_, index) => {
          return (
            <div className='ReserveCalendar-div-box'>
              {(() => {
                if ()
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}