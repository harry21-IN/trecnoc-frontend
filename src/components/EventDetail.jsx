import React, { useState, useEffect, useRef } from 'react';
import './css/EventDetail.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

const EventDetail = ({ user }) => {
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/landing', { replace: true });
    }
  }, [user, navigate]);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const { eventId } = useParams();
  const userId = user?.sub;
  const [event, setEvent] = useState([]);
  const [people, setPeople] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  const [signups, setSignups] = useState([]);
  const [dates, setDates] = useState([]);
  const [privacy, setPrivacy] = useState(event.privacy); // Initialize with the default value



  const currentTime = new Date();
  const timeZoneOffset = currentTime.getTimezoneOffset();
  currentTime.setMinutes(currentTime.getMinutes() - timeZoneOffset);

  useEffect(() => {
    const fetchEvents = async () => {
      const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getevent`).then((res) =>
        res.json()
      );
      const filteredEvents = allUsers.filter(
        (event) => event.userId == userId && event._id === eventId
      );
      setEvent(filteredEvents);
      setEditedEvent(filteredEvents[0]);

    };
    fetchEvents();
  }, [userId]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getpeople`).then((res) =>
        res.json()
      );
      const filteredEvents = allUsers.filter((people) => people.eventId === eventId);

      // Aggregate signups for the same date
      const aggregatedSignups = {};
      filteredEvents.forEach((person) => {
        const date = new Date(person.date).toLocaleDateString();
        if (aggregatedSignups[date]) {
          aggregatedSignups[date] += 1; // Increment the value by one
        } else {
          aggregatedSignups[date] = 1; // Set the initial value to one
        }
      });

      const dates = [];
      const signups = [];
      for (const date in aggregatedSignups) {
        dates.push(date);
        signups.push(aggregatedSignups[date]);
      }

      setPeople(filteredEvents);
      setSignups(signups);
      setDates(dates);
    };
    fetchEvents();
  }, [eventId]);



  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_NAVIGATION}/eventupdate/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      // Handle success
    } catch (error) {
      console.log('Error in response');
    }
  };


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmitClick = () => {
    updateEvent({
      title: editedEvent.title,
      description: editedEvent.description,
      privacy:editedEvent.privacy
    });

    setEvent([editedEvent]);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' || name === 'description' || name === 'privacy') {
      setEditedEvent((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const createGraph = () => {
    const ctx = document.getElementById('graph');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Sign-ups',
            data: signups,
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Adjust to true to maintain aspect ratio
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0,
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (people.length > 0) {
      createGraph();
    }
  }, [people]);

  return (
    <div className="event-box1">
      <div className='event-landing-heading'>
        Event Details
      </div>
      <div className='detail'>
        {event.map((event) => (
          <div className="landing-div-box" key={event.id}>
            {editMode ? (
              <>
                <div className='el-hp-btn-div'>
                  <div className='el-hp-div'>
                    <div className='el-heading'>
                      <span>Change title</span>
                      <br />
                      <input
                        type="text"
                        name="title"
                        value={editedEvent.title || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='el-para'>
                      <span>Change about</span>
                      <br />
                      <textarea
                        name="description"
                        value={editedEvent.description || ''}
                        onChange={handleInputChange}
                      ></textarea>
                      <p style={{marginTop: "20px"}}>
                        <strong>Visibility</strong> | {editedEvent.privacy}
                      </p>
                      <button
                          name="privacy"
                          value="private"
                          onClick={handleInputChange}
                          className='el-pvtbtn'
                        >
                          Private
                        </button>
                        <button
                          name="privacy"
                          value="public"
                          onClick={handleInputChange}
                          className='el-pvtbtn'
                        >
                          Public
                        </button>

                    </div>

                  </div>

                  <div className='el-flex'>
                    {editMode ? (
                      <button className='el-submitbtn' onClick={handleSubmitClick}>Submit</button>
                    ) : (
                      <button className='el-editbtn' onClick={handleEditClick}>Edit</button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='el-hp-btn-div'>
                  <div className='el-hp-div'>
                    <div className='el-heading'>
                      <span>Event</span>
                      <h1>{event.title}</h1>
                    </div>
                    <div className='el-para'>
                      <span>About the event</span>
                      <p className='el-para-fp'>{event.description}</p>
                      <p><strong>Visibility</strong> | {event.privacy}</p>
                    </div>
                  </div>

                  <div className='el-flex'>
                    {editMode ? (
                      <button className='submitbtn' onClick={handleSubmitClick}>Submit</button>
                    ) : (
                      <button className='el-editbtn' onClick={handleEditClick}>Edit</button>
                    )}
                  </div>

                </div>



              </>
            )}
            <div className='el-time'>

              <span>Time of event</span>
              <p>{new Date(new Date(event.date).getTime() + timeZoneOffset * 60 * 1000).toLocaleString('en-US', options)} | <b>{event.status}</b></p>
            </div>
            <div className='el-urlcopy'>
              <span>Copy this URL</span>
              <p>https://trecnoc.vercel.app/event-detail/{event._id}</p>
            </div>
            <div className='el-signups'>
              <span>Sign-ups </span>
              <p>{people.length} sign-ups on this event</p>
            </div>
            <div className='charts'>
              <canvas id="graph" style={{ width: '1px', height: '100%' }}></canvas>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetail;
