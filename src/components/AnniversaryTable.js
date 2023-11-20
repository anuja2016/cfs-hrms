import React, { useEffect, useState } from 'react';

import { getEmployeeAnniversaries } from '../Utility/EmployeeService';

import styled, { keyframes } from 'styled-components';

 

const fadeInOut = keyframes`

  0% {

    opacity: 0;

  }

  10%, 90% {

    opacity: 1;

  }

  100% {

    opacity: 0;

  }

`;

 

const Container = styled.div`

  display: flex;

  flex-direction: column;

  align-items: center;

  margin: 20px;

  width: 400px;

  overflow: hidden;

  background-color: #ffffff;

  border: 1px solid #ddd;

  border-radius: 5px;

  padding: 20px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition: color 0.3s; /* Smooth transition for text color */

 

  &:hover, &:focus {

    color: #007acc; /* Change text color when hovering or in focus */

  }

`;

 

const CalendarTitle = styled.h2`

  color: #007acc;

  font-size: 24px;

  font-weight: bold;

  margin-bottom: 20px;

`;

 

const CalendarContainer = styled.div`

  display: flex;

  flex-direction: column;

  align-items: center;

  border: 2px solid #007acc;

  border-radius: 10px;

  padding: 20px;

  background-color: #f0f0f0;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

 

const CalendarEvent = styled.div`

  padding: 10px;

  display: ${(props) => (props.active ? 'block' : 'none')};

  background-color: white;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  border-radius: 5px;

  animation: ${(props) => (props.active ? fadeInOut : 'none')} 6s linear infinite;

`;

 

const CalendarEventName = styled.div`

  font-size: 15px;

  font-weight: bold;

  white-space: nowrap; // Prevent employee names from wrapping

  overflow: hidden; // Hide any overflow

  text-overflow: ellipsis; // Show ellipsis (...) for very long names

`;

 

function AnniversaryTable() {

  const [anniversaries, setAnniversaries] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

 

  function formatDate(dateString) {

    const options = { day: '2-digit', month: 'short' };

    return new Date(dateString).toLocaleDateString(undefined, options);

  }

 

  useEffect(() => {

    getEmployeeAnniversaries()

      .then((data) => {

        setAnniversaries(data);

      })

      .catch((error) => {

        console.error(error.message);

      });

  }, []);

 

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentIndex((prevIndex) => (prevIndex + 1) % anniversaries.length);

    }, 3000); // 3 seconds

 

    return () => {

      clearInterval(timer);

    };

  }, [anniversaries]);

 

  return (

    <Container>

      <CalendarTitle>Upcoming Work Anniversaries</CalendarTitle>

      {anniversaries && anniversaries.length > 0 ? (

        <CalendarContainer>

          {anniversaries.map((employee, index) => (

            <CalendarEvent key={employee.id} active={index === currentIndex}>

              <CalendarEventName title={employee.firstName}>

                {`${employee.firstName} ${employee.lastName} on ${formatDate(

                  employee.dateOfJoining

                )}`}

              </CalendarEventName>

            </CalendarEvent>

          ))}

        </CalendarContainer>

      ) : (

        <div>No upcoming anniversaries</div>

      )}

    </Container>

  );

}

 

export default AnniversaryTable;