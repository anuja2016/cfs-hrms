import React, { useState, useEffect } from 'react';
import { getAttendanceReportList } from '../Utility/AttendanceService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AttendanceReportPage = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [filteredAttendanceList, setFilteredAttendanceList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString()); // Default to current year
  const [filterMonth, setFilterMonth] = useState((new Date().getMonth() + 1).toString()); // Default to current month

  useEffect(() => {
    // Fetch attendance data from the backend API
    getAttendanceReportList()
      .then(data => {
        setAttendanceList(data);
        setFilteredAttendanceList(data); // Initially set filtered list to the entire list
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  // Function to handle filter changes and update the attendance list
  useEffect(() => {
    // Apply filters to the attendance list (Name, Year, and Month)
    const filteredList = attendanceList.filter(attendance => {
      const isNameMatch = filterName === '' || attendance.empName.toLowerCase().includes(filterName.toLowerCase());
      const isYearMatch = filterYear === '' || attendance.attendanceYear === filterYear;
      const isMonthMatch = filterMonth === '' || attendance.attendanceMonth === filterMonth;
      return isNameMatch && isYearMatch && isMonthMatch;
    });
    setFilteredAttendanceList(filteredList);
  }, [attendanceList, filterName, filterYear, filterMonth]);

  const handleSendReport = () => {
    // Prepare data for Excel
    const excelData = [
      ['Date', 'Name', 'Core Code', 'Present', 'Absent', 'Halfday', 'E Leave', 'M Leave', 'P Leave', 'Unknown', 'W Days', 'Paid Days'],
      ...filteredAttendanceList.map(attendance => [
        attendance.attendanceYear + " " + attendance.attendanceMonth,
        attendance.empName,
        attendance.empCoreCode,
        attendance.presentDays,
        attendance.workFromHome,
        attendance.halfDays,
        attendance.earnLeaves,
        attendance.maternityLeaves,
        attendance.paternityLeaves,
        attendance.unknownStatus,
        attendance.workingDays,
        attendance.totalCountDays
      ])
    ];
  
    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);
  
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
  
    // Save the workbook to a file
    const fileName = 'attendance_report.xlsx';
    XLSX.writeFile(wb, fileName);
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const filterContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
      <div style={containerStyle}>
        <h2>Attendance Report</h2>
        <div style={filterContainerStyle}>
          {/* Name filter */}
          <label htmlFor="nameFilter">Name:</label>
          <input
            type="text"
            id="nameFilter"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            placeholder="Enter name"
          />
          {/* Year filter */}
          <label htmlFor="yearFilter">Year:</label>
          <input
            type="text"
            id="yearFilter"
            value={filterYear}
            onChange={e => setFilterYear(e.target.value)}
            placeholder="Enter year"
          />
          {/* Month filter */}
          <label htmlFor="monthFilter">Month:</label>
          <select
            id="monthFilter"
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSendReport}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Send Report
        </button>

        {/* Table to display attendance data */}
        <table className="table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Name</th>
              <th>Core Code</th>
              <th>Present</th>
              <th>Work From Home</th>
              <th>Halfday</th>
              <th>Earned Leave</th>
              <th>Maternity Leave</th>
              <th>Paternity Leave</th>
              <th>Unknown</th>
              <th>Work Days</th>
              <th>Paid Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendanceList.map(attendance => (
              <tr key={attendance.attendanceId}>
                <td>{attendance.attendanceYear + " " + attendance.attendanceMonth}</td>
                <td>{attendance.empName}</td>
                <td>{attendance.empCoreCode}</td>
                <td>{attendance.presentDays}</td>
                <td>{attendance.workFromHome}</td>
                <td>{attendance.halfDays}</td>
                <td>{attendance.earnLeaves}</td>
                <td>{attendance.maternityLeaves}</td>
                <td>{attendance.paternityLeaves}</td>
                <td>{attendance.unknownStatus}</td>
                <td>{attendance.workingDays}</td>
                <td>{attendance.totalCountDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReportPage;