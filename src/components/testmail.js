import React, { useState } from 'react';
import { sendmail } from '../Utility/emailService'; // Import sendmail from emailService

const EmailTest = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    to: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the sendmail function with emailData
    sendmail(emailData)
      .then((response) => {
        console.log(response);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to send email. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="to">Recipient Email:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Send Email</button>
        </div>
      </form>
    </div>
  );
};

export default EmailTest;
