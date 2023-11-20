import React, { useState, useEffect } from 'react';
import { getLeaves, deleteLeaveById, getLeaveById } from '../Utility/leaveService';
import { getCurrentUserDetail } from '../Auth';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';


const SendRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const currentUser = getCurrentUserDetail();

    useEffect(() => {
        // Fetch leave requests data from the backend API
        getLeaves()
            .then(data => {
                // Filter leave requests for the logged-in user based on employee ID
                const userLeaveRequests = data.filter(request => request.employeeId === currentUser.id);
                setLeaveRequests(userLeaveRequests);
            })
            .catch(error => {
                console.error('Error fetching leave requests data:', error);
            });
    }, [currentUser.id]);

    const handleDelete = async (leaveId) => {
        try {
            // Get the leave details including dayscount and employeeId
            const leaveDetails = await getLeaveById(leaveId);
            const { dayscount, employeeId } = leaveDetails;

            // Get the employee details
            const employee = await getEmployee(employeeId);

            // Update baldays in the user object
            const updatedBaldays = parseInt(employee.baldays, 10) + dayscount;
            const updatedEmployee = { ...employee, baldays: updatedBaldays.toString() };

            // Update baldays in the database using updateEmployee function
            await updateEmployee(employeeId, updatedEmployee);

            // Check if the leave status is "Pending" before deleting
            const leaveToDelete = leaveRequests.find(request => request.leaveId === leaveId);
            if (leaveToDelete && leaveToDelete.leaveStatus === 'Pending') {
                await deleteLeaveById(leaveId);

                // Remove the deleted leave from the state
                const updatedLeaves = leaveRequests.filter(request => request.leaveId !== leaveId);
                setLeaveRequests(updatedLeaves);
            } else {
                console.error('Leave can only be deleted if the status is "Pending".');
            }
        } catch (error) {
            console.error('Error deleting leave:', error);
        }
    };

    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
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
        deleteButton: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Sent Request List</h2>
            <table style={styles.table}>
                <thead style={styles.tableHead}>
                    <tr>
                        <th style={styles.tableCell}>Request Type</th>
                        <th style={styles.tableCell}>Request</th>
                        <th style={styles.tableCell}>Date</th>
                        <th style={styles.tableCell}>Reason</th>
                        <th style={styles.tableCell}>Status</th>
                        <th style={styles.tableCell}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request) => (
                        <tr
                            key={request.leaveId}
                            style={
                                styles.tableRow
                            }
                        >
                            <td style={styles.tableCell}>{request.reaquestType}</td>
                            <td style={styles.tableCell}>{request.leaveType}</td>
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

                            <td style={styles.tableCell}>{request.leaveReason}</td>
                            <td style={styles.tableCell}>{request.leaveStatus}</td>
                            <td style={styles.tableCell}>
                                {request.leaveStatus === 'Pending' && (
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDelete(request.leaveId)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SendRequestList;
