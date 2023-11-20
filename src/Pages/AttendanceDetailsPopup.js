import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAttendanceListByIdAndDate } from '../Utility/AttendanceService';

const AttendanceDetailsPopup = ({ onClose }) => {
  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const currentUserId = 'currentUserId'; // Replace with the actual user ID

  useEffect(() => {
    // Fetch attendance data for the current user from the backend API
    getAttendanceListByIdAndDate(currentUserId)
      .then(data => {
        const currentUserDates = data.map(attendance => new Date(attendance.dateOfAttendance));
        setMarkedDates(currentUserDates);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });

    // Function to get an array of dates for the current month
    const getDatesForCurrentMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const dates = [];

      let currentDate = startDate;
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    };

    // Set the current month dates
    setCurrentMonthDates(getDatesForCurrentMonth());
  }, []);

  const popupContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
  };

  const calendarStyle = {
    width: '100%',
    height: '400px',
    border: '2px solid #ccc',
    borderRadius: '10px',
  };

  return (
    <div style={popupContentStyle}>
      <span style={closeIconStyle} onClick={onClose}>
        &times;
      </span>

      <h2>Current Month Dates</h2>

      {/* Display the calendar with marked dates */}
      <Calendar
        value={currentMonthDates}
        style={calendarStyle}
        tileContent={({ date }) => {
          // Check if the date is in the markedDates array
          const isMarked = markedDates.some(markDate => markDate.toDateString() === date.toDateString());
          return isMarked ? <div style={{ background: 'red', borderRadius: '50%', height: '100%', width: '100%' }}></div> : null;
        }}
      />

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AttendanceDetailsPopup;
