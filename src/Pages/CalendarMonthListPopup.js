import React from 'react';

const CalendarMonthListPopup = ({ leave, onClose, onApprove, onReject }) => { // Added onApprove and onReject props
  const popupContainerStyle = {
 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const popupContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={popupContainerStyle}>
      <div style={popupContentStyle}>
        <h2>Leave Details</h2>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CalendarMonthListPopup;
