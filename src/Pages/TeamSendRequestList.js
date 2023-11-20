import React, { useState, useEffect } from 'react';
import { getLeaves, updateLeaveById, getLeaveById } from '../Utility/leaveService';
import LeaveDetailsPopup from './LeaveDetailsPopup';
import { getCurrentUserDetail } from '../Auth';
import { sendmail } from '../Utility/emailService';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';

const TeamSendRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [emailData, setEmailData] = useState({
        subject: '',
        message: '',
        to: '',
    });

    useEffect(() => {
        getLeaves()
            .then(data => setLeaveRequests(data))
            .catch(error => console.error('Error fetching leave requests data:', error));
    }, []);

    const handleRowClick = leave => {
        if (leave.leaveStatus === 'Pending') {
            setSelectedLeave(leave);
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        setEmployee(getCurrentUserDetail());
    }, []);


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
                manarepoid: selectedLeave.manarepoid,
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
            const subject = 'Leave Request Notification';
            const emailMessage = `Hi, Your Leave Request is Approved from ${startDatePart} to ${endDatePart}`;
            const subjectr = 'Regularization Request Notification';
            const emailMessager = `Hi, Your Regularization Request is Approved from ${startDatePart} to ${endDatePart}`;
            const messageto = selectedLeave.requesterid;
            const updatedEmailData = {
                ...emailData,
                subject: subject,
                message: emailMessage,
                to: messageto,
            };
            const updatedEmailData2 = {
                ...emailData,
                subject: subjectr,
                message: emailMessager,
                to: messageto,
            };
            // Check the request type and send the appropriate email
            if (selectedLeave.reaquestType === 'Regularization') {
                await sendmail(updatedEmailData2);
            } else {
                await sendmail(updatedEmailData);
            }
            // Send email with the updated emailData
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };


    const handleReject = async (leaveId) => {
        try {
            // Get the leave details including dayscount and employeeId
            const leaveDetails = await getLeaveById(leaveId);
            const { dayscount, employeeId } = leaveDetails;
    
            // Get the employee details
            const employee = await getEmployee(employeeId);
    
            // Update the leave status
            const updatedLeave = await updateLeaveById(leaveId, {
                leaveStatus: 'Rejected',
                leaveType: selectedLeave.leaveType,
                endDate: selectedLeave.endDate,
                leaveReason: selectedLeave.leaveReason,
                startDate: selectedLeave.startDate,
                createdBy: selectedLeave.userName,
                requesterid: selectedLeave.requesterid,
                manarepoid: selectedLeave.manarepoid,
            });
    
            // Update baldays in the user object
            const updatedBaldays = parseInt(employee.baldays, 10) + dayscount;
            const updatedEmployee = { ...employee, baldays: updatedBaldays.toString() };
    
            // Update baldays in the database using updateEmployee function
            await updateEmployee(employeeId, updatedEmployee);
    
            // Update the leaveRequests state
            const updatedLeaves = leaveRequests.map((leave) =>
                leave.leaveId === leaveId ? updatedLeave : leave
            );
            setLeaveRequests(updatedLeaves);
            closePopup();
    
            const startDatePart = selectedLeave.startDate.slice(0, 10);
            const endDatePart = selectedLeave.endDate.slice(0, 10);
            // Set email message based on leave approval and status
            const subject = 'Leave Request Notification';
            const emailMessage = `Hi, Your Leave Request is Rejected from ${startDatePart} to ${endDatePart}`;
            const subjectr = 'Regularization Request Notification';
            const emailMessager = `Hi, Your Regularization Request is Rejected from ${startDatePart} to ${endDatePart}`;
            const messageto = selectedLeave.requesterid;
            const updatedEmailData = {
                ...emailData,
                subject: subject,
                message: emailMessage,
                to: messageto,
            };
            const updatedEmailData2 = {
                ...emailData,
                subject: subjectr,
                message: emailMessager,
                to: messageto,
            };
            // Check the request type and send the appropriate email
            if (selectedLeave.reaquestType === 'Regularization') {
                await sendmail(updatedEmailData2);
            } else {
                await sendmail(updatedEmailData);
            }
            // Send email with the updated emailData
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };
    

    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    const closePopup = () => {
        setSelectedLeave(null);
        setIsPopupOpen(false);
    };

    const styles = {
        container: {
            margin: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        tableHead: {
            backgroundColor: '#f2f2f2',
        },
        tableRow: {
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        tableRowHighlighted: {
            backgroundColor: '#e0e0e0',
            fontWeight: 'bold',
        },
        tableCell: {
            padding: '12px',
            borderBottom: '1px solid #ddd',
            textAlign: 'left',
        },
        popupOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        popup: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Request List</h2>
            <table style={styles.table}>
                <thead style={styles.tableHead}>
                    <tr>
                        <th style={styles.tableCell}>Name</th>
                        <th style={styles.tableCell}>Request Type</th>
                        <th style={styles.tableCell}>Reason</th>
                        <th style={styles.tableCell}>Date</th>
                        <th style={styles.tableCell}>Request</th>
                        <th style={styles.tableCell}>Days</th>
                        <th style={styles.tableCell}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests
                        .filter(request => employee.emailId === request.manarepoid)
                        .map(request => (
                            <tr
                                key={request.leaveId}
                                onClick={() => handleRowClick(request)}
                                style={
                                    selectedLeave === request
                                        ? { ...styles.tableRow, ...styles.tableRowHighlighted }
                                        : styles.tableRow
                                }
                            >
                                <td style={styles.tableCell}>{request.requesterName}</td>
                                <td style={styles.tableCell}>{request.reaquestType}</td>
                                <td style={styles.tableCell}>{request.leaveReason}</td>
                                <td style={styles.tableCell}>
                                    {request.startDate === request.endDate
                                        ? formatDate(request.startDate)
                                        : (
                                            <>
                                                {formatDate(request.startDate)}
                                                <br />
                                                to {formatDate(request.endDate)}
                                            </>
                                        )}
                                </td>

                                <td style={styles.tableCell}>{request.leaveType}</td>
                                <td style={styles.tableCell}>{request.dayscount}</td>
                                <td style={styles.tableCell}>{request.leaveStatus}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {isPopupOpen && selectedLeave.leaveStatus === 'Pending' && (
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

export default TeamSendRequestList;
