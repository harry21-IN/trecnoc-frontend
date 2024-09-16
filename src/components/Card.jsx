import React, { useState, useEffect, useMemo } from 'react';
import abc from '../assets/sample.jpg'
// import './css/Card.css'
import { useNavigate } from 'react-router-dom'

const Card = () => {
    return (
        <div className='card'>

        <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
        </style>

            <div className='tn' style={{
                backgroundImage: `url(${abc})`,
                backgroundSize: 'cover',
            }}>

            </div>
            <h2></h2>
            <p>Twin turbo v12 jett engine breaking all sound barriers and your ears too</p>
            <br></br>
        </div>

    )
}

export default Card
