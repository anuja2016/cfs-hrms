import React, { useEffect, useState } from 'react';
import { getAllEventAndActivity } from '../Utility/EventAndActivityService';
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
  transition: color 0.3s;

  &:hover, &:focus {
    color: #007acc;
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

const FlashingCalendarEvent = styled.div`
  padding: 10px;
  display: ${(props) => (props.active ? 'block' : 'none')};
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  animation: ${(props) => (props.active ? fadeInOut : 'none')} 6s linear infinite;
  width: 300px;
  height: 100px;
`;

const CalendarEventName = styled.div`
  font-size: 12px;
  font-weight: bold;
  white-space: pre-wrap;
  margin: 5px 0;
`;

const EventAndActivityList = () => {
  const [eventsAndActivities, setEventsAndActivities] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    // Fetch all events and activities when the component mounts
    getAllEventAndActivity()
      .then((data) => {
        const currentDate = new Date();
        // Filter out past events and activities before setting the state
        const upcomingEventsAndActivities = data
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setEventsAndActivities(upcomingEventsAndActivities);
      });
  }, []);

  useEffect(() => {
    let eventIndex = 0;
    const eventCount = eventsAndActivities.length;

    if (eventCount < 1) return;

    const interval = setInterval(() => {
      setCurrentEventIndex(eventIndex);
      eventIndex = (eventIndex + 1) % eventCount;
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [eventsAndActivities]);

  return (
    <Container>
      <CalendarTitle>Events & Activities</CalendarTitle>
      {eventsAndActivities.length > 0 ? (
        <CalendarContainer>
          <FlashingCalendarEvent active={true}>
            <CalendarEventName title={eventsAndActivities[currentEventIndex].name}>
              {eventsAndActivities[currentEventIndex].name}
            </CalendarEventName>
            <CalendarEventName title={eventsAndActivities[currentEventIndex].date}>
              {eventsAndActivities[currentEventIndex].date}
            </CalendarEventName>
            <CalendarEventName title={eventsAndActivities[currentEventIndex].description}>
              {eventsAndActivities[currentEventIndex].description}
            </CalendarEventName>
          </FlashingCalendarEvent>
        </CalendarContainer>
      ) : (
        <div>No upcoming events or activities</div>
      )}
    </Container>
  );
};

export default EventAndActivityList;
