import React, { useEffect, useState } from 'react';
import { getAllHoliday } from '../Utility/HolidayService';

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // Fetch all holidays when the component mounts
    getAllHoliday()
      .then((data) => {
        // Filter out past holidays before setting the state
        const currentDate = new Date();
        const upcomingHolidays = data.filter((holiday) => new Date(holiday.date) >= currentDate);
        setHolidays(upcomingHolidays);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });

  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'teal' }}>Holiday List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid teal' }}>
        <thead>
          <tr style={{ backgroundColor: 'teal', color: 'white' }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday) => (
            <tr key={holiday.id} style={tableRowStyle}>
              <td style={{ ...tableCellStyle, backgroundColor: '#f2f2f2', color: '#333' }}>{holiday.name}</td>
              <td style={{ ...tableCellStyle, backgroundColor: '#f2f2f2', color: '#333' }}>{holiday.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define styles as objects
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
};

const tableRowStyle = {
  borderBottom: '1px solid teal',
};

const tableCellStyle = {
  padding: '10px',
};

export default HolidayList;
