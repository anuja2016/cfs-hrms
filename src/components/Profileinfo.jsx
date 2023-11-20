import { useState, useEffect } from 'react';
import { getEmployee, updateEmployee } from '../Utility/EmployeeService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { formatDate, parseDate } from '../Utility/DateUtils';
import { useNavigate } from "react-router-dom";
import Base from '../components/Base';


const Profileinfo = () => {
  const navigate = useNavigate();
  const { empId } = useParams();

  // Define departments and roles here
  const [departments, setDepartments] = useState([]); // You can initialize with an empty array or fetch data from an API
  const [roles, setRoles] = useState([]); // You can initialize with an empty array or fetch data from an API

  // Rest of your code

  const [employee, setEmployee] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    dateOfMarriage: '',
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
  const [editedDateOfConfirmation, setEditedDateOfConfirmation] = useState('');
  const [editedDateOfMarriage, setEditedDateOfMarriage] = useState('');

  useEffect(() => {
    // Fetch the employee data from the API
    getEmployee(empId)
      .then((data) => {
        const formattedData = {
          ...data,
          dateOfJoining: formatDate(data.dateOfJoining),
          dateOfBirth: formatDate(data.dateOfBirth),
          dateOfConfirmation: formatDate(data.dateOfConfirmation),
          dateOfMarriage: formatDate(data.dateOfMarriage),
        };
        setEmployee(formattedData);
        setEditedDateOfBirth(formattedData.dateOfBirth);
        setEditedDateOfJoining(formattedData.dateOfJoining);
        setEditedDateOfConfirmation(formattedData.dateOfConfirmation);
        setEditedDateOfMarriage(formattedData.dateOfMarriage);
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
    } else if (name === 'dateOfConfirmation') {
      setEditedDateOfConfirmation(value);
    } else if (name === 'dateOfMarriage') {
      setEditedDateOfMarriage(value);
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
      dateOfConfirmation: parseDate(editedDateOfConfirmation),
      dateOfMarriage: parseDate(editedDateOfMarriage),
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
        gender: '',
        maritalStatus: '',
        dateOfMarriage: '',
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
        <h2 className="mb-4">Profile {employee.firstName} {employee.lastName}</h2>
        <form className='border rounded row g-3 w-50 shadow-box' onSubmit={handleSubmit}>

          <div className="col-6">
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

          <div className="col-6">
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

          <div className="col-6">
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

          <div className="col-6">
            <label htmlFor="dateOfBirth" className="form-label">
              Date Of Birth
            </label>
            <input
              type="text"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder=""
              autoComplete="off"
              value={employee.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              placeholder="Enter Gender"
              autoComplete="off"
              value={employee.gender}
              onChange={handleInputChange}
            />
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

              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid Employee Status.
            </div>
          </div>

          {employee.maritalStatus === "Married" && (
            <div className="col-6">
              <label htmlFor="dateOfMarriage" className="form-label">
                Date Of Marriage
              </label>
              <input
                type="text"
                className="form-control"
                id="dateOfMarriage"
                name="dateOfMarriage"
                placeholder=""
                autoComplete="off"
                value={editedDateOfMarriage}
                onChange={handleInputChange}
              />
            </div>
          )}


          <div className="col-6">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <div className="form-control" id="userName">
              {employee.userName}
            </div>
          </div>

          <div className="col-6">
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

          <div className="col-6">
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


          <div className="col-6">
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



          <div className="col-6">
            <label htmlFor="dateOfJoining" className="form-label">
              Date of Joining
            </label>
            <input
              type="text"
              className="form-control"
              id="dateOfJoining"
              name="dateOfJoining"
              placeholder=""
              autoComplete="off"
              value={employee.dateOfJoining}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="departmentId" className="form-label">
              Department
            </label>
            <div className="form-control" id="departmentId">
              {employee.departmentId}
            </div>
          </div>

          <div className="col-6">
            <label htmlFor="roleId" className="form-label">
              Role
            </label>
            <div className="form-control" id="roleId">
              {employee.roleId}
            </div>
          </div>


          <div className="col-md-6">
            <label htmlFor="baldays" className="form-label">
              Balance Leave
            </label>
            <div className="form-control" id="baldays">
              {employee.baldays}
            </div>
          </div>


          <div className="col-md-6">
            <label htmlFor="reportingManager" className="form-label">
              Reporting Manager Name
            </label>
            <div className="form-control" id="reportingManager">
              {employee.reportingManager}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="reportingManagerMail" className="form-label">
              Reporting Manager Email
            </label>
            <div className="form-control" id="reportingManagerMail">
              {employee.reportingManagerMail}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="shift_code" className="form-label">
              Shift Code
            </label>
            <div className="form-control" id="shift_code">
              {employee.shift_code}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="businessUnit" className="form-label">
              Business Unit
            </label>
            <div className="form-control" id="businessUnit">
              {employee.businessUnit}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <div className="form-control" id="location">
              {employee.location}
            </div>
          </div>

          <div className="col-6">
            <label htmlFor="typeOfEmployment" className="form-label">
              typeOfEmployment
            </label>
            <div className="form-control" id="typeOfEmployment">
              {employee.typeOfEmployment}
            </div>
          </div>

          <div className="col-6">
            <label htmlFor="employeeStatus" className="form-label">
              Employee Status
            </label>
            <div className="form-control" id="employeeStatus">
              {employee.employeeStatus}
            </div>
          </div>


          <div className="col-6">
            <label htmlFor="dateOfConfirmation" className="form-label">
              Date of Confirmation
            </label>
            <input
              type="text"
              className="form-control"
              id="dateOfConfirmation"
              name="dateOfConfirmation"
              placeholder=""
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

export default Profileinfo