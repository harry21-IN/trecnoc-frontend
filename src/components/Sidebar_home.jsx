import React, { useMemo } from 'react';
import { useState } from 'react';
import './css/Sidebar_home.css';
import { useNavigate, Router} from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { googleLogout} from '@react-oauth/google';

function Sidebar_home({ user }) {
  const [activeButton, setActiveButton] = useState('home');
  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path, { replace: true });
  };

  const navigate = useNavigate();
  const subscription = () => {
    navigate('/subscription', { replace: true });
  }
  const events = () => {
    navigate('/', { replace: true });
  }
  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/landing')
  }


  return (
    <div className={`sidebar ${activeButton}-active`}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      rel="stylesheet"></link>

      <div className='brandname'>
        <span><a href="#">TrecNoc</a></span>
      </div>
      {/* <div>
        <span>
          <button className='side-home-btn' onClick={() => handleButtonClick('home', '/')}>
            <span class="material-icons-outlined">
              home
            </span>
            Home
          </button>
        </span>
      </div> */}
      <div>
        <span>
          <button onClick={() => handleButtonClick('events', '/')}>
            <span class="material-icons-outlined">
              event
            </span>
            Events
          </button>
        </span>
      </div>
      <div>
      <span>
        <button onClick={() => handleButtonClick('subscription', '/subscription')}>
          <span class="material-icons-outlined">
            payment
          </span>
          Subscription
        </button>
      </span>
      </div>
      <div>
      <span>{user&& (
          <button>
            <span class="material-icons-outlined">
              account_circle
            </span>
            {user.name}
          </button>
        )}</span>  
      </div>
      <div>
        <span>
          <button className='home-navbar-logout' onClick={logout}>
            <span class="material-icons-outlined">
              logout
            </span>
            Log out
        </button>
        </span>
      </div>
    </div>
  )
}

export default Sidebar_home;
