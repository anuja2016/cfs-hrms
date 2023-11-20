import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLeave } from '../Utility/leaveService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail } from '../Auth';
import { sendmail } from '../Utility/emailService';
import { getAllHoliday } from '../Utility/HolidayService';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';


const RegulerizationForm = () => {
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

  const initialEmailData1 = {
    subject: 'Regularization Request Notification',
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
    now.setDate(now.getDate() - 1); // Set to the previous day
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
   
    'Present',
    'Work From Home'
    
  ];

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
    

        const newLeaveRequest = {
          leaveReason,
          reaquestType: 'Regularization',
          requesterName: employee.firstName + ' ' + employee.lastName,
          startDate,
          endDate: leaveDuration === 'SingleDay' ? startDate : endDate,
          leaveType,
          dayscount,
          employeeId: employee.id,
          requesterid: employee.emailId,
          manarepoid: employee.reportingManagerMail,
        };

        const response = await createLeave(newLeaveRequest);
        console.log('Regulerization request submitted:', response);

        

        toast.success('Regulerization request submitted successfully', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        clearFormFields();

        const emailMessage1 = `Hi, ${employee.userName} Submitted Regularization Request on date ${startDate}`;
        const updatedEmailData = {
          ...initialEmailData1,
          message: emailMessage1,
        };

        await sendmail(updatedEmailData);

       
      
    } catch (error) {
      // Handle errors when fetching employee details
      console.error('Error handling RegulerizationForm request:', error);
      const updatedEmployee = await getEmployee(employee.id);
      toast.error(updatedEmployee.excerror, {
        autoClose: 500, // Adjust the duration as needed
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  


  const clearFormFields = () => {
    setLeaveReason('');
    setStartDate('');
    setEndDate('');
    setLeaveType('');
    setDayscount('');
  };

  const getPreviousDate = () => {
    const now = new Date();
    now.setDate(now.getDate() - 1); // Set to the previous day
    return now.toISOString().split('T')[0];
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Regularization Form</h2>
      <form onSubmit={handleSubmit}>
        

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={getPreviousDate()} // Disable past and current dates
            required
          />
        </div>
        

        <div className="mb-3">
          <label htmlFor="leaveType" className="form-label">
            Requested Status
          </label>
          <select
            className="form-select"
            id="leaveType1"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Status
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
            Reason Remark
          </label>
          <input
            type="text"
            className="form-control"
            id="leaveReason1"
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

export default RegulerizationForm;
