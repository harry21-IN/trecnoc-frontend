import React, { useState, useEffect } from 'react';
import './css/Home.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar_home from './Sidebar_home';
import Event_container from './Event_container';
import { fetchUser } from '../utils/fetchuser';

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await fetchUser();
      setUserInfo(user);
      if (!user) {
        navigate('/landing', { replace: true });
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (!userInfo) {
    return null; // Render nothing until the user info is fetched
  }

  return (
    <div className='home-div'>
      {/* <div>
        <Navbar_home />
      </div> */}
      <div className='main-container'>
        <div className='sidebar-container-main-main'>
          <Sidebar_home user={userInfo} />
        </div>

        <div className='event-container-main-main'>
          <Routes>
            <Route path='/*' element={<Event_container user={userInfo} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
