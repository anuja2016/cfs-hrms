import React, { useState } from 'react';
import { generateSalarySlip } from '../Utility/EmployeeService';


const FileUploadSlip = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please choose a file');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      // Assuming you have an uploadSalarySlip method in your service
      await generateSalarySlip(formData);
  
      alert('Salary slips generated successfully!');
    } catch (error) {
      console.error('Error generating salary slips:', error);
      alert('Error generating salary slips. Please try again.');
    }
  };

  

  return (
    <div>
      <h2>Upload Salary Slip</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choose a file:
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Generate Salary Slip</button>
      </form>
    </div>
  );
};

export default FileUploadSlip;
