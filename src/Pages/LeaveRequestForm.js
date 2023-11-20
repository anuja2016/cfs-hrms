import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLeave } from '../Utility/leaveService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail } from '../Auth';
import { sendmail } from '../Utility/emailService';
import { getAllHoliday } from '../Utility/HolidayService';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';

const LeaveRequestForm = () => {
  const navigate = useNavigate();

  const [leaveReason, setLeaveReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [employee, setEmployee] = useState(null);
  const [dayscount, setDayscount] = useState(0);
  const [date, setDate] = useState('');
  const [leaveDuration, setLeaveDuration] = useState('SingleDay'); // Default to 'SingleDay'
  const [holidays, setHolidays] = useState([]);

  const initialEmailData = {
    subject: 'Leave Request Notification',
    message: '',
    to: employee?.reportingManagerMail || '',
  };

  // Fetch holidays when the component mounts
  useEffect(() => {
    getAllHoliday()
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
  }, []);

  const calculateDayscount = (start, end) => {
    const startDateObj = new Date(start);

    // Check if enddate is null
    if (!end) {
      return 1;
    }

    const endDateObj = new Date(end);
    let daysDifference = 0;

    while (startDateObj <= endDateObj) {
      const dayOfWeek = startDateObj.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = holidays.some(
        (holiday) => new Date(holiday.date).toDateString() === startDateObj.toDateString()
      );

      if (!isWeekend && !isHoliday) {
        daysDifference++;
      }
      startDateObj.setDate(startDateObj.getDate() + 1);
    }

    return daysDifference;
  };



  useEffect(() => {
    if (startDate && endDate) {
      if (startDate === endDate) {
        const days = 1;
        setDayscount(days);
      } else {
        const days = calculateDayscount(startDate, endDate);
        setDayscount(days);
      }
    }
  }, [startDate, endDate]);


  const getCurrentDate = () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    return currentDate;
  };

  useEffect(() => {
    setEmployee(getCurrentUserDetail());
    setStartDate(getCurrentDate());
  }, []);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  useEffect(() => {
    setEmployee(getCurrentUserDetail());
    setDate(getCurrentDate());
  }, []);

  const leaveTypeOptions = [

    'Earned Leave',

  ];


  if (
    employee?.gender === 'Female' &&
    employee?.maritalStatus === 'Married' &&
    new Date(employee?.dateOfMarriage) <= thirtyDaysAgo
  ) {
    leaveTypeOptions.push('Maternity leave');
  }

  if (
    employee?.gender === 'Male' &&
    employee?.maritalStatus === 'Married' &&
    new Date(employee?.dateOfMarriage) <= thirtyDaysAgo
  ) {
    leaveTypeOptions.push('Paternity leave');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch employee details before submitting the leave request
      const updatedEmployee = await getEmployee(employee.id);

      // Convert baldays to an integer
      const baldaysInt = parseInt(updatedEmployee.baldays, 10);

      // Calculate dayscount based on the selected dates
      const calculatedDayscount = calculateDayscount(startDate, endDate);

      // Check if there are sufficient leave days
      if (calculatedDayscount <= baldaysInt) {
        // Proceed with leave request submission

        const newLeaveRequest = {
          leaveReason,
          reaquestType: 'Leave',
          requesterName: employee.firstName + ' ' + employee.lastName,
          startDate,
          endDate: leaveDuration === 'SingleDay' ? startDate : endDate,
          leaveType,
          dayscount: leaveDuration === 'SingleDay' ? 1 : calculatedDayscount,
          employeeId: employee.id,
          requesterid: employee.emailId,
          manarepoid: employee.reportingManagerMail,
        };

        const response = await createLeave(newLeaveRequest);
        console.log('Leave request submitted:', response);

       // Update baldays after leave request submission
       const updatedBaldays = baldaysInt - calculatedDayscount;
       // Convert back to String
       const updatedBaldaysString = updatedBaldays.toString();

       // Update baldays in the user object
       setEmployee({ ...updatedEmployee, baldays: updatedBaldaysString });

       // Update baldays in the database
       await updateEmployee(updatedEmployee.id, {
         ...updatedEmployee,
         baldays: updatedBaldaysString,
       });

        toast.success('Leave request submitted successfully', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        clearFormFields();

        const emailMessage = `Hi, ${employee.userName} Submitted Leave Request from ${startDate} to ${leaveDuration === 'SingleDay' ? startDate : endDate
          }`;
        const updatedEmailData = {
          ...initialEmailData,
          message: emailMessage,
        };

        await sendmail(updatedEmailData);
      } else {
        // Display an error message if there are insufficient leave days
        toast.error('No Sufficient Leave Balance', {
          autoClose: 500, // Adjust the duration as needed
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      // Handle errors when fetching employee details
      console.error('Error handling leave request:', error);
      const updatedEmployee = await getEmployee(employee.id);
      toast.error(updatedEmployee.excerror, {
        autoClose: 500, // Adjust the duration as needed
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const getJanuaryFirstDate = () => {
    const currentYear = new Date().getFullYear();
    const januaryFirstDate = `${currentYear}-01-01`;
    return januaryFirstDate;
  };
  const calculateMinDate = () => {
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based
    const daysInJanuary = 31; // Assuming April has 30 days

    if (currentMonth === 1) {
      // If the current month is April, allow selecting backdates up to 31 days
      const thirtyOneDaysAgo = new Date();
      thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - daysInJanuary);
      return thirtyOneDaysAgo.toISOString().split('T')[0];
    }

    // For other months, set the minimum date to April 1st
    return getJanuaryFirstDate();
  };




  const clearFormFields = () => {
    setLeaveReason('');
    setStartDate('');
    setEndDate('');
    setLeaveType('');
    setDayscount('');
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Leave Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="leaveDuration" className="form-label">
            Leave Duration
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="singleDayRadio"
              name="leaveDuration"
              value="SingleDay"
              checked={leaveDuration === 'SingleDay'}
              onChange={() => setLeaveDuration('SingleDay')}
              required
            />
            <label className="form-check-label" htmlFor="singleDayRadio">
              Single Day
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="moreThanOneDayRadio"
              name="leaveDuration"
              value="MoreThanOneDay"
              checked={leaveDuration === 'MoreThanOneDay'}
              onChange={() => setLeaveDuration('MoreThanOneDay')}
              required
            />
            <label className="form-check-label" htmlFor="moreThanOneDayRadio">
              More than 1 Day
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={calculateMinDate()} // Set minimum date to April 1st of the current year
            max="2030-12-31" // Set maximum date to some future date
            required
          />
        </div>
        {leaveDuration === 'MoreThanOneDay' && (
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={calculateMinDate()} // Set minimum date to April 1st of the current year
              max="2030-12-31" // Set maximum date to some future date
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="leaveType" className="form-label">
            Leave Type
          </label>
          <select
            className="form-select"
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Leave Type
            </option>
            {leaveTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {leaveDuration === 'MoreThanOneDay' && (
          <div className="mb-3">
            {/* This is where you display the "Total Days" field */}
            <label htmlFor="dayscount" className="form-label">
              Total Days: {dayscount}
            </label>
          </div>
        )}


        <div className="mb-3">
          <label htmlFor="leaveReason" className="form-label">
            Leave Remark
          </label>
          <input
            type="text"
            className="form-control"
            id="leaveReason"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
