import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import ServicesPage from './Pages/ServicesPage';
import ContactPage from './Pages/ContactPage';
import SignupPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Privateroute from './components/Privateroute';
import DashboardPage from './Pages/DashboardPage';
import Profileinfo from './components/Profileinfo';
import RightPanelEmployeeList from './components/RightPanelEmployeeList';
import UpdateEmployeePage from './Pages/UpdateEmployeePage';
import AttendanceReportPage from './Pages/AttendanceReportPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />

        <Route path="/employee/*" element={<Privateroute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="view" element={<RightPanelEmployeeList />} />
          <Route path=":empId" element={<UpdateEmployeePage />} />
          <Route path="profile-info/:empId" element={<Profileinfo />} /> {/* Moved here */}
        </Route>

        <Route path="/attendance-report" element={<AttendanceReportPage />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
