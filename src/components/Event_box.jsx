import React, { useState, useEffect, useMemo } from 'react';
import './css/Event_box.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';

function Event_box({ user }) {
  const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/landing',{replace:true})
        }
    }, [user, navigate]);
  const [founduser, setFounduser] = useState();

  const create_event = () => {
    if(founduser.limit > 0){
      navigate('/create_event', { replace: true });
    }else{
      alert('Sorry you are out of events to create, please purchase a booster pack!');
      navigate('/subscription',{replace:true})
    }
  };

  useEffect(() => {
    async function setUser() {
      const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/user`).then(res => res.json());
      const gotUser = allUsers.find(founduser => founduser.id === user?.sub);
      setFounduser(gotUser);
    }
    setUser();
  }, [user]);

  return (
    <div className='event-box1'>
      <span>
        <button onClick={create_event} className='create-btn1'>
                <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </span>
      <span>events left {founduser && <span>{founduser.limit}</span>}</span>
      
      <MasonryLayout user={user} />        
    </div>
  );
}

export default Event_box;





