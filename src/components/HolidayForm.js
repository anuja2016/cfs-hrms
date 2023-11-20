import React, { Component } from 'react';
import { addHoliday } from '../Utility/HolidayService';

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  background: '#f9f9f9',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #d9d9d9',
  borderRadius: '5px',
  fontSize: '14px',
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const successMessageStyle = {
  color: 'green',
  marginTop: '10px',
  fontSize: '14px',
};

const errorMessageStyle = {
  color: 'red',
  marginTop: '10px',
  fontSize: '14px',
};

class HolidayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      year: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, date, year } = this.state;

    // Validate the data (add your validation logic here)

    // Send the data to the backend
    addHoliday({ name, date, year })
      .then((data) => {
        // Clear the form and show a success message
        this.setState({
          name: '',
          date: '',
          year: '',
          successMessage: 'Holiday added successfully.',
          errorMessage: '', // Clear any previous error messages
        });
      })
      .catch((error) => {
        // Show an error message to the user
        this.setState({
          errorMessage: 'An error occurred. Please try again later.',
          successMessage: '', // Clear any previous success messages
        });
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle} htmlFor="name">
              Holiday Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="date">
              Date:
            </label>
            <input
              style={inputStyle}
              type="date"
              id="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              required
            />
          </div>
         
          <div>
            <button style={buttonStyle} type="submit">
              Submit
            </button>
          </div>
        </form>
        {this.state.successMessage && (
          <p style={successMessageStyle}>{this.state.successMessage}</p>
        )}
        {this.state.errorMessage && (
          <p style={errorMessageStyle}>{this.state.errorMessage}</p>
        )}
       
      </div>
    );
  }
}

export default HolidayForm;
