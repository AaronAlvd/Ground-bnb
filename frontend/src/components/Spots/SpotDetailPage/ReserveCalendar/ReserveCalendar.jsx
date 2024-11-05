import './ReserveCalendar.css';
import { useState, useEffect } from 'react';

export default function ReserveCalendar() {
  const calendarDays = new Array(35).fill(null);

  return (
    <div>
      <div className='ResrverCalendar-div-month'>

      </div>
      <div className='ReserveCalendar-div-days'>
        {calendarDays.map((_, index) => {
          return (
            <div className='ReserveCalendar-div-box'></div>
          )
        })}
      </div>
    </div>
  )
}