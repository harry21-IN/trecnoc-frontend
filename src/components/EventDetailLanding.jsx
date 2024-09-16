import React, { useState, useEffect } from 'react';
import './css/EventDetail.css';
import './css/EventDetailLanding.css';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CustomAlertComponent from './CustomAlert'
import './css/CustomAlert.css'

const EventDetailLanding = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Add this state
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isJoiningEvent, setIsJoiningEvent] = useState(false);

  const getBack = () => {
    navigate(`/explore`, { replace: true });
  }

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const currentTime = new Date();
  var timeZoneOffset = currentTime.getTimezoneOffset();
  currentTime.setMinutes(currentTime.getMinutes() - timeZoneOffset);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getspecevent/${eventId}`);
      const selectedEvent = await response.json();
      if (selectedEvent.status === 'inactive') {

        setEvent({
          title: selectedEvent.title,
          description: 'This event has been conducted',
        });
      }
      else {

        setEvent(selectedEvent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventId]);


  const fetchPeople = async () => {
    const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getpeople`).then((res) =>
      res.json()
    );
    const filteredEvents = allUsers.filter((person) => person.eventId === eventId);
    setPeople(filteredEvents);
  };

  useEffect(() => {
    fetchPeople();
  }, [eventId]);

  const sendEmail = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_NAVIGATION}/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmails: [email],
          subject: `Welcome to the ${event.title}`,
          message: `Dear ${name},\n\nThank you for joining the event!\n\n Information regarding the event\n\n${event.description}\n\nWe look forward to seeing you there.\n\nThe timings for the event are ${new Date(new Date(event.date).getTime() + timeZoneOffset * 60 * 1000).toLocaleString('en-US', options)} \n\nBest regards,\nThe Event Team`,
          // password: "xwrlhfkrayquvgrx",
          eventTime: event.date,
          eventSubject: event.title,
          eventDescription: event.description,
          eventTimezone: event.timezone,
          eventOrganizer: event.username,
        }),
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const joinEvent = async (e) => {
    e.preventDefault();
    setIsJoiningEvent(true); // Start the joining process
    try {
      const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/getpeople`).then(
        (res) => res.json()
      );
      const existingUser = allUsers.find((user) => {

        if (user.eventId === eventId && event.status === 'active') {
          if (user.email === email) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      if (existingUser) {
        setAlertTitle("Alert");
        setAlertMessage("You already joined the event! Or the event has been conducted");
        setShowAlert(true);
        setIsJoiningEvent(false);

      } else {
        const newUser = {
          id: uuidv4(),
          name: name,
          email: email,
          eventId: eventId,
          date: currentTime,
        };
        await fetch(`${process.env.REACT_APP_API_NAVIGATION}/addpeople`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        await fetch(
          `${process.env.REACT_APP_API_NAVIGATION}/eventupdatesignup/${eventId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ signups: people.length + 1 }),
          }
        );
        await fetchPeople(); // Fetch updated people count
        await sendEmail(); // Send email to the recipient
        setAlertTitle("Joined!");
        setAlertMessage("Thanks For joining the event!");
        setShowAlert(true);
        setIsJoiningEvent(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!event) {
    return null; // or render a loading indicator
  }

  return (
    <div className='event-detail-landing-main'>
      <div onClick={getBack} className='event-detail-landing'>
        Go back
      </div>
      <form onSubmit={joinEvent} className='detail1'>
        <div className='landing-div-box1'>
          <div className='elp-gb'>
            <div className='hp-elp'>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
            </div>
            {event.status === 'active' && (
              <>
                <div className='sign-elp'>
                  <p>{people.length} Signups</p>
                </div>
                <div className='dt-elp'>
                  <p>{new Date(new Date(event.date).getTime() + timeZoneOffset * 60 * 1000).toLocaleString('en-US', options)}</p>
                </div>
                <div className='form1'>
                  <div className='name-elp'>
                    <label htmlFor='name'>Enter Name</label>
                    <input type='text' required id='name' name='name' value={name} onChange={handleNameChange} />
                  </div>
                  <div className='email-elp'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' required id='email' name='email' value={email} onChange={handleEmailChange} />
                  </div>
                  <div className='join-elp-div'>
                    {isJoiningEvent ? (
                      <div className="spinner"></div> // Add your spinner component or HTML/CSS here
                    ) : (
                      <button type='submit' className='join-elp'>
                        Join!
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
      <CustomAlertComponent
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        title={alertTitle}
      />
    </div>
  );
};

export default EventDetailLanding;
