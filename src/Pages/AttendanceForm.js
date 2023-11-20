import React, { useState, useEffect } from 'react';
import { createAttendance, getAttendanceListByIdAndDate } from '../Utility/AttendanceService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail } from '../Auth';
import AttendanceDetailsPopup from './AttendanceDetailsPopup';
import Modal from 'react-modal'; // Import react-modal
import CalendarMonthListPopup from './CalendarMonthListPopup';
import ReactDOM from 'react-dom';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AttendanceForm = () => {
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present'); // Default to 'Present'
  const [employee, setEmployee] = useState(undefined);
  const [timeIn, setTimeIn] = useState('');
  const [isTimeInDisabled, setIsTimeInDisabled] = useState(false);
  const [isAttendanceSubmitted, setIsAttendanceSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAttendanceDetailsModalOpen, setIsAttendanceDetailsModalOpen] = useState(false);

  // Function to open the Attendance Details modal
  const openAttendanceDetailsModal = () => {
    setIsAttendanceDetailsModalOpen(true);
  };

  // Function to close the Attendance Details modal
  const closeAttendanceDetailsModal = () => {
    setIsAttendanceDetailsModalOpen(false);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    return currentDate;
  };

  useEffect(() => {
    setEmployee(getCurrentUserDetail());
    // Set default value of date to the current date
    setDate(getCurrentDate());

    // Check if the user has already submitted attendance for the current date
    checkAttendanceForCurrentUserAndDate();
  }, []);

  const checkAttendanceForCurrentUserAndDate = () => {
    // Ensure that employee is defined before accessing its properties
    if (employee && employee.id) {
      const currentUserId = employee.id;
      const currentDate = getCurrentDate();

      // Fetch the attendance record for the current user and date
      getAttendanceListByIdAndDate(currentUserId, currentDate)
        .then((attendance) => {
          if (attendance) {
            // If an attendance record exists, mark attendance as submitted
            setIsAttendanceSubmitted(true);
            // Set the attendance status to the status from the fetched record
            setAttendanceStatus(attendance.status);
          } else {
            // If no attendance record exists, setIsAttendanceSubmitted should remain false
            setIsAttendanceSubmitted(false);
          }
        })
        .catch((error) => {
          console.error('Error checking attendance:', error);
        });
    }
  };

  const handleSetCurrentTimeIn = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get HH:mm format
    setTimeIn(currentTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const employeeData = getCurrentUserDetail();
    console.log('login detail is saved to local storage');
  
    // Create attendance object with form data
    const attendance = {
      dateOfAttendance: date,
      status: attendanceStatus,
      remark: employee.userName,
      employeeId: employee.id,
      timeIn: timeIn,
      createdBy: 'Employee',
    };
  
    // Call createAttendance function to submit the attendance data
    createAttendance(attendance)
  .then(() => {
    // Display success message with a timeout of 500 milliseconds (0.5 seconds)
    toast.success('Attendance submitted successfully', {
      autoClose: 500,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setIsAttendanceSubmitted(true); // Mark attendance as submitted
  })
  .catch(async (error) => {
    // Display error message based on backend exception
    if (error.response && error.response.data) {
      // Use error.response.data.message if available
      toast.error(error.response.data.message || 'Unknown error occurred', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      // If no specific error message from the backend, display a generic error

      const updatedEmployee = await getEmployee(employee.id);
      toast.error(updatedEmployee.excerror, {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    console.log(error);
  });
};
  

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAttendanceListClick = () => {
    setIsPopupOpen(true); // Set isPopupOpen to true when the button is clicked
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Daily Attendance</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{date}</label>
        </div>

        {isAttendanceSubmitted ? (
          <p>
          You have marked today's <br />
          attendance as {attendanceStatus}
        </p>
        ) : (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Attendance Status:</label>
            <div>
              <input
                type="radio"
                id="present"
                name="attendanceStatus"
                value="Present"
                checked={attendanceStatus === 'Present'}
                onChange={() => setAttendanceStatus('Present')}
              />
              <label htmlFor="present">Present</label>
            </div>
            
            <div>
              <input
                type="radio"
                id="halfday"
                name="attendanceStatus"
                value="Halfday"
                checked={attendanceStatus === 'Halfday'}
                onChange={() => setAttendanceStatus('Halfday')}
              />
              <label htmlFor="halfday">Halfday</label>
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
              Mark
            </button>
          </div>
        )}
      </form>

      {/* Render the AttendanceDetailsPopup component in a modal */}
      <Modal
        isOpen={isAttendanceDetailsModalOpen}
        onRequestClose={closeAttendanceDetailsModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            background: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto',
            marginTop: '20px',
          },
        }}
      >
        <AttendanceDetailsPopup onClose={closeAttendanceDetailsModal} />
      </Modal>

      {/* Always display the AttendanceList button */}
      <button
        type="button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginTop: '20px',
        }}
        onClick={openAttendanceDetailsModal}
      >
        Attendance Details
      </button>
    </div>
  );
};

export default AttendanceForm;