import React, { useState, useEffect, useMemo } from 'react';
import './css/Layout.css';
import { useNavigate } from 'react-router-dom';

const MasonryLayout = ({ user }) => {
  const navigate = useNavigate();
  const userId = user?.sub;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getevent`).then(res => res.json());
      const currentTime = new Date();
      var timeZoneOffset = currentTime.getTimezoneOffset();
      currentTime.setMinutes(currentTime.getMinutes() - timeZoneOffset);
  
      const filteredEvents = allEvents.filter(event => event.userId === userId);
  
      setEvents(filteredEvents); 
  
    };
  
    fetchEvents();
  }, [userId]);
  


  const navtodetails = (e) => {
    const eventId = e._id;
    navigate(`/event-detail-user/${eventId}`);
  };

  return (
    <div className='event-div-main'>
      {events.map(event => (
        <div className='event-div' onClick={() => navtodetails(event)} key={event.id}>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
}

export default MasonryLayout;
