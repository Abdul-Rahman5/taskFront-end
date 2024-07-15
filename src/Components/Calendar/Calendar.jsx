import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {

  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };



  return <>
  
  
  
  <div className="container mt-5">
      <h2>Simple Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
     
    </div>
  </>
}
