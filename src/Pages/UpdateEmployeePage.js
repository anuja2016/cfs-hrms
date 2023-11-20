import { useState, useEffect } from 'react';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { formatDate, parseDate } from '../Utility/DateUtils';
import { useNavigate } from "react-router-dom";
import Base from '../components/Base';

const UpdateEmployeePage = () => {

  const navigate = useNavigate();
  const { empId } = useParams();

  const [employee, setEmployee] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    userName: '',
    emailId: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    dateOfJoining: '',
    baldays: '',
    reportingManager: '',
    reportingManagerMail: '',
    shift_code: '',
    businessUnit: '',
    location: '',
    typeOfEmployment: '',
    employeeStatus: '',
    dateOfConfirmation: '',
    departmentId: '',
    roleId: '',
  });

  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedDateOfJoining, setEditedDateOfJoining] = useState('');

  useEffect(() => {
    // Fetch the employee data from the API
    getEmployee(empId)
      .then((data) => {
        const formattedData = {
          ...data,
          dateOfJoining: formatDate(data.dateOfJoining),
          dateOfBirth: formatDate(data.dateOfBirth),
        };
        setEmployee(formattedData);
        setEditedDateOfBirth(formattedData.dateOfBirth);
        setEditedDateOfJoining(formattedData.dateOfJoining);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [empId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      setEditedDateOfBirth(value);
    } else if (name === 'dateOfJoining') {
      setEditedDateOfJoining(value);
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the formatted dates back to the original format
    const parsedEmployee = {
      ...employee,
      dateOfBirth: parseDate(editedDateOfBirth),
      dateOfJoining: parseDate(editedDateOfJoining),
    };
    try {
      await updateEmployee(empId, parsedEmployee);
      // Employee updated successfully
      toast.success('Employee updated successfully!', {
        autoClose: 500, // Set the desired timeout in milliseconds
        position: toast.POSITION.BOTTOM_RIGHT
      });
      // Reset the form
      setEmployee({
        firstName: '',
        secondName: '',
        lastName: '',
        userName: '',
        emailId: '',
        password: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        dateOfJoining: '',
        baldays: '',
        reportingManager: '',
        reportingManagerMail: '',
        shift_code: '',
        businessUnit: '',
        location: '',
        typeOfEmployment: '',
        employeeStatus: '',
        dateOfConfirmation: '',
        departmentId: '',
        roleId: '',
      });
      // navigate to employee view page
      navigate("/employee/dashboard");
    } catch (error) {
      console.error(error);
      // Handle the error
      alert(JSON.stringify(error.response.data))
    }
  };
  const handleCancel = () => {
    // navigate back to the View Employees dashboard
    navigate("/employee/dashboard");
  };

  return (
    <Base>
      <div className='d-flex flex-column align-items-center pt-4'>
        <h2 className="mb-4">Update Employee</h2>
        <form className='border rounded row g-3 w-50 shadow-box' onSubmit={handleSubmit}>

           <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    autoComplete="off"
                                    value={employee.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="secondName" className="form-label">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secondName"
                                    name="secondName"
                                    placeholder="Enter Middle Name"
                                    autoComplete="off"
                                    value={employee.secondName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    autoComplete="off"
                                    value={employee.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="dateOfBirth" className="form-label">
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    placeholder=""
                                    autoComplete="off"
                                    value={employee.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <select
                                    className="form-select"
                                    id="gender"
                                    name="gender"
                                    autoComplete="off"
                                    value={employee.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    </select>
                                <div className="invalid-feedback">
                                    Please select a valid Employee Status.
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="maritalStatus" className="form-label">
                                    Marital Status
                                </label>
                                <select
                                    className="form-select"
                                    id="maritalStatus"
                                    name="maritalStatus"
                                    autoComplete="off"
                                    value={employee.maritalStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    </select>
                                <div className="invalid-feedback">
                                    Please select a valid Employee Status.
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="dateOfMarriage" className="form-label">
                                    Date Of Marriage
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateOfMarriage"
                                    name="dateOfMarriage"
                                    placeholder=""
                                    autoComplete="off"
                                    value={employee.dateOfMarriage}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="userName" className="form-label">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    placeholder="Enter User Name"
                                    autoComplete="off"
                                    value={employee.userName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="emailId" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailId"
                                    name="emailId"
                                    placeholder="Enter User Email"
                                    autoComplete="off"
                                    value={employee.emailId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter User Password"
                                    autoComplete="off"
                                    value={employee.password}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Enter User Phone Number"
                                    autoComplete="off"
                                    value={employee.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            

                            <div className="col-md-6">
                                <label htmlFor="dateOfJoining" className="form-label">
                                    Date Of Joining
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateOfJoining"
                                    name="dateOfJoining"
                                    placeholder=""
                                    autoComplete="off"
                                    value={employee.dateOfJoining}
                                    onChange={handleInputChange}
                                />
                            </div>



                                                        

                            <div className="col-md-6">
                                <label htmlFor="reportingManager" className="form-label">
                                    Reporting Manager Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reportingManager"
                                    name="reportingManager"
                                    placeholder="Enter Reporting Manager Name"
                                    autoComplete="off"
                                    value={employee.reportingManager}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="reportingManagerMail" className="form-label">
                                    Reporting Manager Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="reportingManagerMail"
                                    name="reportingManagerMail"
                                    placeholder="Enter Reporting Manager Email"
                                    autoComplete="off"
                                    value={employee.reportingManagerMail}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="baldays" className="form-label">
                                Assign Leave
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="baldays"
                                    name="baldays"
                                    placeholder="Enter No  Days"
                                    autoComplete="off"
                                    value={employee.baldays}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="shift_code" className="form-label">
                                    Shift Code
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="shift_code"
                                    name="shift_code"
                                    placeholder="Enter Shift Code"
                                    autoComplete="off"
                                    value={employee.shift_code}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="businessUnit" className="form-label">
                                    Business Unit
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="businessUnit"
                                    name="businessUnit"
                                    placeholder="Enter Business Unit"
                                    autoComplete="off"
                                    value={employee.businessUnit}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="location" className="form-label">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="Enter Location"
                                    autoComplete="off"
                                    value={employee.location}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="typeOfEmployment" className="form-label">
                                    Type of Employment
                                </label>
                                <select
                                    className="form-select"
                                    id="typeOfEmployment"
                                    name="typeOfEmployment"
                                    autoComplete="off"
                                    value={employee.typeOfEmployment}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Type of Employment</option>
                                    <option value="Full Time Employee">Full Time Employee</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Contractor">Contractor</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid Type of Employment.
                                </div>
                            </div>









                            <div className="col-md-6">
                                <label htmlFor="employeeStatus" className="form-label">
                                    Employee Status
                                </label>
                                <select
                                    className="form-select"
                                    id="employeeStatus"
                                    name="employeeStatus"
                                    autoComplete="off"
                                    value={employee.employeeStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Employee Status</option>
                                    <option value="Probation">Probation</option>
                                    <option value="ProbationExtended">Probation Extended</option>
                                    <option value="Confirmed">Confirmed</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid Employee Status.
                                </div>
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="dateOfConfirmation" className="form-label">
                                    Date of Confirmation
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateOfConfirmation"
                                    name="dateOfConfirmation"
                                    autoComplete="off"
                                    value={employee.dateOfConfirmation}
                                    onChange={handleInputChange}
                                />
                            </div>

          <div className='col-6'>
            <button type='submit' className='btn btn-primary me-2'>
              Update
            </button>
            <button type='button' className='btn btn-secondary' onClick={handleCancel}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default UpdateEmployeePage;
