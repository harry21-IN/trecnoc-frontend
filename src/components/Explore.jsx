import React, { useState, useEffect } from 'react';
import './css/Explore.css';
import abc from '../assets/bg-img.jpg';
import './css/Card.css';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const options = {
    hour: "numeric",
    minute: "numeric",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const currentTime = new Date();
  var timeZoneOffset = currentTime.getTimezoneOffset();
  currentTime.setMinutes(currentTime.getMinutes() - timeZoneOffset);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getevent`).then(res =>
        res.json()
      );
      const activeEvents = allEvents.filter(event => event.status === "active" && event.privacy === "public");

      setEvents(activeEvents);
    };

    fetchEvents();
  }, []);

  const navtodetails = event => {
    const eventId = event._id;
    navigate(`/event-detail/${eventId}`);
  };

  const handleBack = () => {
    navigate(`/landing`);
  };

  const handleSearch = () => {
    // Filter events based on the search input for title, description, or username
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.username.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(filteredEvents);
  };

  const handleInputChange = (e) => {
    // Update search input and trigger search on input change
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    handleSearch();
  };

  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
      </style>
      <div className='explore-main-div'>
        <nav className="navbar nav-expand">
          <div className="navbar-back">
            <button className='light' onClick={handleBack}>Go Back</button>
          </div>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
            />
          </div>
        </nav>
      </div>

      <div className="head">
        {(searchInput ? searchResults : events).map(event => (
          <div onClick={() => navtodetails(event)} className="card" key={event._id}>
            <div
              className="cardin"
              style={{
                backgroundImage: `url(${abc})`,
                backgroundSize: 'cover',
              }}
            >
            </div>

            <div className='card-text'>
              <h2>{event.title}</h2>
              <p className='carddesc'>{event.username}</p>
              <p className='carddesc'>{event.description}</p>

              <br /><br /><br />
              <p className='timecard'>{new Date(new Date(event.date).getTime() + timeZoneOffset * 60 * 1000).toLocaleString("en-US", options)}</p>
              <p className='cardsignups'>{event.signups} Signups</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Explore;
