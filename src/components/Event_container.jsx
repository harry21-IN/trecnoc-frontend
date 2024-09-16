import React, { useEffect } from 'react';
import './css/Event_container.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Event_box from './Event_box';
import EventDetail from './EventDetail';
import Create_event from './Create_event';
import Subscription from './Subscription';
import NotFoundPage from './NotFoundPage';

function Event_container({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/landing', { replace: true });
    }
  }, [user, navigate]);

  const handleUnknownRoute = () => {
    navigate('/');
  };

  return (
    <div className='event-container-main'>
      <Routes>
        <Route path="/" element={<Event_box user={user} />} />
        <Route path="/create_event" element={<Create_event user={user} />} />
        <Route path="/subscription" element={<Subscription user={user} />} />
        <Route path="/event-detail-user/:eventId" element={<EventDetail user={user} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Event_container;
