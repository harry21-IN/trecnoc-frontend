import React, { useEffect, useState } from 'react';
import './css/Subscription.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Subscription({ user }) {
  const navigate = useNavigate();
  var amount = 0;
  
  useEffect(() => {
    if (!user) {
      navigate('/landing', { replace: true });
    }
  }, [user, navigate]);

  const payment = async (price) => {
    if (price === 15) {
      amount = 0 
    }
    if (price === 40) {
      amount = 0 
    }

    try {
      const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/user`).then((res) => res.json());
      const existingUser = allUsers.find((users) => users.id === user?.sub);
      const limit = existingUser.limit + amount;
      const response = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/updateuser/${user?.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: limit }),
      });
      const data = await response.json();
      navigate('/subscription', { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='sub-pgi'>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
      <div className='cards-container'>

      <div className='sub-cards freez'>
        <h5>Basic Plan</h5>
        <div className='duration'>
          <span>Free</span>
        </div>
        <ul className='free'>
          <li>
            <span class="material-icons">check_circle</span>
            <span>1 event</span>    
          </li>
          <li className='line-thru'>
            <span class="material-icons">check_circle</span>
            <span>AI generated poster </span>
          </li>
          <li className='line-thru'>
            <span class="material-icons">check_circle</span>
            <span>Unlimited AI generated Title's</span>
          </li>
          <li className='line-thru'>
            <span class="material-icons">check_circle</span>
            <span>Automatic social media posting</span>
          </li>
          <li className='line-thru'>
            <span class="material-icons">check_circle</span>
            <span>Access to influencers</span>
          </li>
        </ul>
        <button className='base-plan'>Current Plan</button>
      </div>

      <div className='sub-cards paid'>
        <h5>Pro</h5>
        <div className='duration'>
          <span>$</span>
          <span>9</span>
          <span>/month</span>
        </div>
        <ul className='pro'>
          <li>
            <span class="material-icons">
              check_circle
            </span>
            <span>5 events</span>    
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>AI generated poster</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>Unlimited AI generated Title's</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span className='line-thru'>Automatic social media posting</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span className='line-thru'>Access to influencers</span>
          </li>
        </ul>
        <button onClick={() => payment(9)}>Coming soon!</button>
      </div>
      <div className='sub-cards paid'>
        <h5>Premium</h5>
        <div className='duration'>
          <span>$</span>
          <span>20</span>
          <span>/month</span>
        </div>
        <ul className='premium'>
          <li>
            <span class="material-icons">check_circle</span>
            <span>30 events</span>    
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>AI generated picture / event</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>Unlimited AI generated Title's</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>Automatic social media posting</span>
          </li>
          <li>
            <span class="material-icons">check_circle</span>
            <span>Access to influencers</span>
          </li>
        </ul>
        <button onClick={() => payment(20)}>Coming soon!</button>
      </div>
      </div>
    </div>
  );
}

export default Subscription;
