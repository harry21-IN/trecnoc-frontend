import React, { useState, useEffect } from 'react';
import './css/Create_event.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'


function Create_event({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/landing', { replace: true })
    }
  }, [user, navigate]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  var limit = 0;


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleDropdownChange = (event) => {
    setPrivacy(event.target.value);
  };
  const handleImageChange = (e) => { };
  var datetime = date + 'T' + time + ':00';
  var dateTime = new Date(datetime);
  var timeZoneOffset = dateTime.getTimezoneOffset();
  dateTime.setMinutes(dateTime.getMinutes() - timeZoneOffset);
  var timestamp = new Date();
  var tzo = timestamp.getTimezoneOffset();
  timestamp.setMinutes(timestamp.getMinutes() - tzo);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const doc = {
    id: uuidv4,
    title: title,
    description: description,
    userId: user?.sub,
    username: user.name,
    timestamp:timestamp,
    date: dateTime,
    signups: 0,
    status: "active",
    timezone: userTimeZone,
    privacy: privacy
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();

    try {


      try {
        const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/user`).then(res => res.json());
        const existingUser = allUsers.find(users => users.id === user?.sub);
        if (existingUser.limit > 0) {

          await fetch(`${process.env.REACT_APP_API_NAVIGATION}/addevent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(doc),
          });
          limit = existingUser.limit - 1
          const response = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/updateuser/${user?.sub}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ limit: limit }),
          });
          const data = await response.json();
          navigate('/', { replace: true });
        } else {
          alert('You are out of your event limit , please purchase more from subscription')
          navigate('/subscription', { replace: true })
        }
      } catch (err) {
        console.log(err.message);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='event-box1 create-event-div-main'>
      <div className='create-event-heading'>
        Create Event
      </div>
      <form onSubmit={handleSubmitBtn} className='create-event-div'>
        <div className='div1-main'>
          <div className='div2'>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name='title' value={title} onChange={handleTitleChange} required />
            </div>
            <div>
              <label htmlFor="description" >Description:</label>
              {/* <input type="text" className='desc-div' name="description" id="description" value={description} onChange={handleDescriptionChange} />
          </div> */}
              <textarea type="text" className='desc-div' name="description" id="description" value={description} onChange={handleDescriptionChange} required />
            </div>
            <div className='div-privacy'>
              <label htmlFor='privacy'>Privacy</label>
              <select value={privacy} onChange={handleDropdownChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className='div3'>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" id="date" value={date} onChange={handleDateChange} required />
            </div>
            <div>
              <label htmlFor="time">Time:</label>
              <input type="time" name="time" id="time" value={time} onChange={handleTimeChange} required />
            </div>
            {/* </div> */}
            {/* <div className='image-div'>
            <label htmlFor='' className='image-upload'>
              <span>Choose your image: </span>
            </label>
            <label htmlFor="image" className='browse-btn'>Browse</label>
            <input type="file" className='browse-btn-in' accept='image/*' name="image" id="image" onChange={handleImageChange} />
          </div> */}
            <div className='submit-btn-div'>
              <button className='submit-btn' type='submit'>Create</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create_event;