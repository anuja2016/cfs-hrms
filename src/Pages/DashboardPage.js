import React, { useState, useEffect } from 'react';
import Base from '../components/Base';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { doLogout, isLoggedIn, getCurrentUserDetail } from '../Auth';
import RightPanelEmployeeList from '../components/RightPanelEmployeeList';
import AddEmployeePage from './AddEmployeePage';
import AttendanceForm from './AttendanceForm';
import Profileinfo from '../components/Profileinfo';
import AttendanceReportPage from './AttendanceReportPage';
import LeaveRequestForm from './LeaveRequestForm';
import RegulerizationForm from './RegulerizationForm';
import LeaveRequestList from './LeaveRequestList';
import SendRequestList from './SendRequestList';
import TeamSendRequestList from './TeamSendRequestList';
import HolidayFormPage from './HolidayFormPage';
import EventAndActivityList from './EventAndActivityList';
import EventAndActivityForm from './EventAndActivityForm';
import HolidayList from './HolidayList';
import BirthdayTable from '../components/BirthdayTable';
import AnniversaryTable from '../components/AnniversaryTable';
import FileUploadSlip from './FileUploadSlip';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewEmployeesVisible, setViewEmployeesVisible] = useState(false);
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const [viewEmployeesList, setViewEmployeesList] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [login, setLogin] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  const [showHolidayFormPage, setHolidayFormPageVisible] = useState(false);
  const [showFileUploadSlip, setFileUploadSlipVisible] = useState(false);
  const [showEventAndActivityForm, setEventAndActivityFormVisible] = useState(false);
  const [showLeaveRequestForm, setLeaveRequestFormVisible] = useState(false);
  const [showRegulerizationForm, setRegulerizationFormVisible] = useState(false);
  const [showLeaveRequestList, setLeaveRequestListVisible] = useState(false);
  const [showSendRequestList, setSendRequestListVisible] = useState(false);
  const [showTeamSendRequestList, setTeamSendRequestListVisible] = useState(false);
  const [showBirthdayTable, setshowBirthdayTable] = useState(false);
  const [showAnniversaryTable, setshowAnniversaryTable] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [anniversaries, setAnniversaries] = useState([]);



  const handleManageEmployees = () => {
    setViewEmployeesVisible(!viewEmployeesVisible);
    setAddEmployeeVisible(!addEmployeeVisible);
    setViewEmployeesList(false);
    setAddEmployee(false);
    setLeaveRequestListVisible(false);
    setShowAttendanceReport(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  };

  const handleViewEmployeesList = () => {
    setShowProfileInfo(false);
    setViewEmployeesList(true);
    setAddEmployee(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setEventAndActivityFormVisible(false);
    setTeamSendRequestListVisible(false);
    setFileUploadSlipVisible(false);
  }

  const handleAddEmployee = () => {
    setShowProfileInfo(false);
    setAddEmployee(true);
    setViewEmployeesList(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setLeaveRequestListVisible(false);
    setSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  }

  const handleRegularizationClick = () => {
    setRegulerizationFormVisible(true);
    setLeaveRequestFormVisible(true);
    setShowAttendanceReport(false);
    setShowProfileInfo(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  }

  const handleProfileClick = () => {

    setShowProfileInfo(true);
    setLeaveRequestFormVisible(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  }

  useEffect(() => {
    setLogin(isLoggedIn());
  }, [login])

  const handleDashboardClick = () => {
    setShowProfileInfo(false);
    setShowAttendanceForm(true);
    setshowAnniversaryTable(true);
    setshowBirthdayTable(true);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setShowAttendanceReport(false); // Hide the attendance report when returning to the dashboard
    setLeaveRequestListVisible(false);
    setSendRequestListVisible(false);
    setTeamSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);

  };

  const handleToggleAttendanceReport = () => {

    setShowAttendanceReport(true);
    setShowProfileInfo(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setLeaveRequestListVisible(false);
    setSendRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);

  };
  const handleToggleSendRequestList = () => {
    setShowProfileInfo(false);
    setSendRequestListVisible(true);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  };

  const handleToggleSalarySlip = () => {
    setFileUploadSlipVisible(true);
    setShowProfileInfo(false);
    setSendRequestListVisible(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
  };

  const handleToggleTeamSendRequestList = () => {
    setShowProfileInfo(false);
    setTeamSendRequestListVisible(true);
    setSendRequestListVisible(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setLeaveRequestListVisible(false);
    setHolidayFormPageVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);

  };

  const handleToggleLeaveRequestList = () => {
    setShowProfileInfo(false);
    setLeaveRequestListVisible(true);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setSendRequestListVisible(false); // Corrected function name
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setHolidayFormPageVisible(false);
    setTeamSendRequestListVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);
  };

  const handleToggleHolidayFormPage = () => {
    setShowProfileInfo(false);
    setHolidayFormPageVisible(true);
    setLeaveRequestListVisible(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setTeamSendRequestListVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setEventAndActivityFormVisible(false);
    setFileUploadSlipVisible(false);

  };

  const handleToggleEventAndActivityForm = () => {

    setEventAndActivityFormVisible(true);
    setShowProfileInfo(false);
    setHolidayFormPageVisible(false);
    setLeaveRequestListVisible(false);
    setShowAttendanceForm(false);
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
    setShowAttendanceReport(false);
    setAddEmployee(false);
    setViewEmployeesList(false);
    setTeamSendRequestListVisible(false);
    setLeaveRequestFormVisible(false);
    setRegulerizationFormVisible(false);
    setFileUploadSlipVisible(false);

  };





  useEffect(() => {
    setLogin(isLoggedIn());
  }, []);

  useEffect(() => {
    setAddEmployee(false);
    setViewEmployeesList(false);
    setShowAttendanceForm(true); // Display the AttendanceForm by default after login
    setshowAnniversaryTable(false);
    setshowBirthdayTable(false);
  }, [login]);





  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  }
  useEffect(() => {
    setLogin(isLoggedIn());
  }, []);

  useEffect(() => {
    setAddEmployee(false);
    setViewEmployeesList(false);
    setShowAttendanceForm(true); // Display the AttendanceForm by default after login
    setshowAnniversaryTable(true);
    setshowBirthdayTable(true);
  }, [login]);

  const isUserRoleOne = () => {
    const currentUser = getCurrentUserDetail();
    return currentUser && currentUser.roleId === 1;
  };

  const isUserRoleTwo = () => {
    const currentUser = getCurrentUserDetail();
    return currentUser && currentUser.roleId === 2;
  };

  const isUserRoleThree = () => {
    const currentUser = getCurrentUserDetail();
    return currentUser && currentUser.roleId === 3;
  };

  console.log("currentUserDetail:", getCurrentUserDetail());


  return (
    <Base>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
            {/* ... left panel code ... */}
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              {isUserRoleOne() ? (
                <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                  <span className="fs-5 fw-bolder d-none d-sm-inline">Admin</span>
                </a>
              ) : (
                <Link to="/employee/dashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle" onClick={handleDashboardClick}>
                  <i className="fs-4 bi-speedometer2"></i> <span className="fs-5 fw-bolder d-none d-sm-inline">Employee</span>
                </Link>
              )}
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li>
                  <Link to="/employee/dashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle" onClick={handleDashboardClick}>
                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                </li>
                <li>
                  {!isUserRoleOne() ? null : (
                    <Link
                      to="#"
                      className="nav-link px-0 align-middle text-white"
                      onClick={handleManageEmployees}
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Manage Employees</span>{" "}
                      {viewEmployeesVisible || addEmployeeVisible ? (
                        <i className="bi bi-caret-up-fill"></i>
                      ) : (
                        <i className="bi bi-caret-down-fill"></i>
                      )}
                    </Link>
                  )}
                  {isUserRoleOne() && (
                    <>
                      {viewEmployeesVisible && (
                        <li>
                          <Link
                            to="#"
                            className="nav-link px-0 align-middle text-white"
                            onClick={handleViewEmployeesList}
                          >
                            <i className="fs-4 bi-eye"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">View Employees</span>
                          </Link>
                        </li>
                      )}
                      {addEmployeeVisible && (
                        <li>
                          <Link
                            to="#"
                            className="nav-link px-0 align-middle text-white"
                            onClick={handleAddEmployee}
                          >
                            <i className="fs-4 bi-plus"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">Add Employee</span>
                          </Link>
                        </li>
                      )}
                    </>
                  )}
                </li>

                <li>
                  {(isUserRoleOne() || isUserRoleTwo()) && (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleAttendanceReport}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Attendance Report</span>
                    </Link>
                  )}
                </li>

                <li>
                  <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleRegularizationClick}>
                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Regularize/LeaveRequest
                    </span>
                  </Link>
                </li>


                <li>
                  {!isUserRoleOne() ? null : (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleLeaveRequestList}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Leave List</span>
                    </Link>
                  )}
                </li>
                <li>
                  {!isUserRoleTwo() ? null : (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleTeamSendRequestList}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Team Request List</span>
                    </Link>
                  )}
                </li>
                <li>

                  <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleSendRequestList}>
                    <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Self Request List</span>
                  </Link>

                </li>
                <li>
                  {(isUserRoleOne() || isUserRoleTwo()) && (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleSalarySlip}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Salary Slip</span>
                    </Link>
                  )}
                </li>
                <li>
                  {!isUserRoleOne() ? null : (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleHolidayFormPage}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Add Holiday</span>
                    </Link>
                  )}
                </li>

                <li>
                  {!isUserRoleOne() ? null : (
                    <Link to="#" className="nav-link text-white px-0 align-middle" onClick={handleToggleEventAndActivityForm}>
                      <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Event And  Activity</span>
                    </Link>
                  )}
                </li>


              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <Outlet />
            <div className="d-flex flex-wrap">
              {login && (
                <>
                  {/* Display Profile */}
                  {showProfileInfo && (
                    <div style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                      <Profileinfo />
                    </div>
                  )}


                  {/* Display AnniversaryTable with a gap */}
                  {showAnniversaryTable && (
                    <div style={{ marginBottom: '5px' }}>
                      <AnniversaryTable anniversaries={anniversaries} />
                    </div>
                  )}

                  {/* Display BirthdayTable with a gap */}
                  {showBirthdayTable && (
                    <div style={{ marginBottom: '5px' }}>
                      <BirthdayTable birthdays={birthdays} />
                    </div>
                  )}


                  {/* Display HolidayList */}
                  {showAttendanceForm && (
                    <div style={{ marginBottom: '5px' }}>
                      <EventAndActivityList />
                    </div>
                  )}


                  {/* Display HolidayList */}
                  {showAttendanceForm && (
                    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                      <HolidayList />
                    </div>
                  )}


                  {/* Display AttendanceForm */}
                  {showAttendanceForm && (
                    <AttendanceForm />
                  )}
                  {/* Display RegulerizationForm */}
                  {showRegulerizationForm && (
                    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                      <RegulerizationForm />
                    </div>
                  )}
                  {/* Display LeaveRequestForm */}
                  {showLeaveRequestForm && (
                    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                      <LeaveRequestForm />
                    </div>
                  )}

                </>
              )}
              {viewEmployeesList && <RightPanelEmployeeList />}
              {addEmployee && <AddEmployeePage />}
              {showAttendanceReport && <AttendanceReportPage />}
              {showLeaveRequestList && <LeaveRequestList />}
              {showSendRequestList && <SendRequestList />}
              {showTeamSendRequestList && <TeamSendRequestList />}
              {showHolidayFormPage && <HolidayFormPage />}
              {showFileUploadSlip && <FileUploadSlip />}
              {showEventAndActivityForm && <EventAndActivityForm />}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DashboardPage;