import CustomNavBar from '../components/CustomNavBar'
import Footer from './Footer';

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Base;