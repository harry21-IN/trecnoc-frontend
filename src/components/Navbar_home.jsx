import React from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Navbar_home.css';
import { googleLogout} from '@react-oauth/google';

function Navbar_home () {

    const navigate = useNavigate();
    const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/landing')
  }

  return (
    <nav className='home-navbar'>
        <div className='home-navbar-brand'>
                TrecNoc
        </div>
    </nav>
  )
};

export default Navbar_home;