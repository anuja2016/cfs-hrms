import React, { useState, useEffect } from 'react';
import { getLeaves, updateLeaveById } from '../Utility/leaveService';
import LeaveDetailsPopup from './LeaveDetailsPopup';
import { sendmail } from '../Utility/emailService'; // Import sendmail from emailService

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: 'Leave Request Notification',
    message: '', // Provide a default message or leave it empty
    to: '',
  });

  // Fetching leave requests from the backend
  useEffect(() => {
    // Fetch leave requests data from the backend API
    getLeaves()
      .then(data => {
        setLeaveRequests(data);
      })
      .catch(error => {
        console.error('Error fetching leave requests data:', error);
      });
  }, []);

  const handleRowClick = (leave) => {
    setSelectedLeave(leave);
    setIsPopupOpen(true);
  };

  const handleApprove = async (leaveId) => {
    try {
      const updatedLeave = await updateLeaveById(leaveId, {
        leaveStatus: 'Approved',
        leaveType: selectedLeave.leaveType,
        endDate: selectedLeave.endDate,
        leaveReason: selectedLeave.leaveReason,
        startDate: selectedLeave.startDate,
        createdBy: selectedLeave.userName,
        requesterid: selectedLeave.requesterid,
      });

      // Update the leave requests array with the updated leave
      const updatedLeaves = leaveRequests.map((leave) =>
        leave.leaveId === leaveId ? updatedLeave : leave
      );
      setLeaveRequests(updatedLeaves);
      closePopup();

      const startDatePart = selectedLeave.startDate.slice(0, 10);
      const endDatePart = selectedLeave.endDate.slice(0, 10);
      // Set email message based on leave approval and status
      const emailMessage = `Hi, Your Leave Request is Approved from ${startDatePart} to ${endDatePart}`;
      const messageto = selectedLeave.requesterid;
      const updatedEmailData = {
        ...emailData,
        message: emailMessage,
        to: messageto
      };

      // Send email with the updated emailData
      await sendmail(updatedEmailData);
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };


  const handleReject = async (leaveId) => {
    try {
      const updatedLeave = await updateLeaveById(leaveId, {
        leaveStatus: 'Rejected',
        leaveType: selectedLeave.leaveType,
        endDate: selectedLeave.endDate,
        leaveReason: selectedLeave.leaveReason,
        startDate: selectedLeave.startDate,
        createdBy: selectedLeave.userName,
        requesterid: selectedLeave.requesterid,
      });

      // Update the leave requests array with the updated leave
      const updatedLeaves = leaveRequests.map((leave) =>
        leave.leaveId === leaveId ? updatedLeave : leave
      );
      setLeaveRequests(updatedLeaves);
      closePopup();

      const startDatePart = selectedLeave.startDate.slice(0, 10);
      const endDatePart = selectedLeave.endDate.slice(0, 10);
      // Set email message based on leave approval and status
      const emailMessage = `Hi, Your Leave Request is Rejected from ${startDatePart} to ${endDatePart}`;
      const messageto = selectedLeave.requesterid;
      const updatedEmailData = {
        ...emailData,
        message: emailMessage,
        to: messageto
      };

      // Send email with the updated emailData
      await sendmail(updatedEmailData);
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };




  const closePopup = () => {
    setSelectedLeave(null);
    setIsPopupOpen(false);
  };

  const styles = {
    container: {
      margin: '20px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
    },
    highlightRow: {
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    highlighted: {
      backgroundColor: '#e0e0e0', // Initial background color
      fontWeight: 'bold', // Make the text bold
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Leave Request List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Leave Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Leave Status</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr
              key={request.leaveId}
              onClick={() => handleRowClick(request)}
              style={
                selectedLeave === request
                  ? { ...styles.highlightRow, ...styles.highlighted }
                  : styles.highlightRow
              }
            >
              <td>{request.leaveId}</td>
              <td>{request.leaveReason}</td>
              <td>{new Date(request.startDate).toISOString().slice(0, 10)}</td>
              <td>{new Date(request.endDate).toISOString().slice(0, 10)}</td>
              <td>{request.leaveType}</td>
              <td>{request.leaveStatus}</td>
              <td>{request.employeeId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ... (other JSX code) */}
      {isPopupOpen && (
        <LeaveDetailsPopup
          leave={selectedLeave}
          onClose={closePopup}
          onApprove={() => handleApprove(selectedLeave.leaveId)}
          onReject={() => handleReject(selectedLeave.leaveId)}
        />
      )}
    </div>
  );
};

export default LeaveRequestList;

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
};