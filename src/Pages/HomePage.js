import React from 'react';
import Base from '../components/Base';
import backgroundImageHome from "../Assets/Coreflex-background.jpeg"

const HomePage = () => {

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageHome})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white', // Set the font color to white
  };

  const headingStyle = {
    color: 'red', // Set the font color of the h1 tag to red
    fontWeight: 'bold',
  };

  const paragraphStyle = {
    color: '#800080', // Set the font color of the p tags to blue
    fontWeight: 'bold',
  };

  return (
    <Base>
  <div style={backgroundStyle}>
    <h1 style={{ ...headingStyle, color: 'black' }}>Welcome to HR Management System</h1>
    <p style={{ ...paragraphStyle, color: 'red' }}>We are a leading organization in providing quality services.</p>
    <p style={{ ...paragraphStyle, color: 'red' }}>Join us and explore new opportunities!</p>
  </div>
</Base>

  );
};

export default HomePage;
