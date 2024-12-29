import './ReserveCalendar.css'
import { useState, useEffect } from 'react';
import { useModal } from '../../../../context/modal';
import Calendar from 'react-calendar';

export default function ReserveCalendar() {
  const { closeModal } = useModal();
  const today = new Date();
  const oneYearFromNow = new Date(today); // Clone the current date
  oneYearFromNow.setFullYear(today.getFullYear() + 1); 

  const [selectedDate, setSelectedDate] = useState(today); // Default to today's date

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date when a user selects a date
  };

  return (
    <div className='ReserveCalendar-div'>
      <Calendar calendarType='gregory' minDate={today} maxDate={oneYearFromNow}
       onChange={handleDateChange} value={selectedDate}/>
      <div className='ReserveCalendar-div-button'>
        <button className='ReserveCalendar-button' onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}