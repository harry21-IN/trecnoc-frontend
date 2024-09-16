import { useNavigate, Router } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import './css/Landing.css';
import './css/Navbar.css';
import bulbVid from '../assets/bulbVid.mp4';
import bulbVid1 from '../assets/bulbVid1.mp4';
import calender from '../assets/cal.png';
import world from '../assets/world.jpg'

function Landing() {

  const navigate = useNavigate();
  const Explore = () => {
    navigate('/explore', { replace: true })
  }
  
  const [hasSecondVideoPlayed, setHasSecondVideoPlayed] = useState(false);

  const secondVideoRef = useRef();

  const checkVideoInViewport = () => {
    const video = secondVideoRef.current;
    if (!video) return;

    const rect = video.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !hasSecondVideoPlayed) {
      setHasSecondVideoPlayed(true);
      video.play();
    }
  };

  useEffect(() => {
    // Play the second video when it comes into the viewport
    window.addEventListener('scroll', checkVideoInViewport);
    checkVideoInViewport(); // Check once on initial load
    return () => {
      window.removeEventListener('scroll', checkVideoInViewport);
    };
  }, [hasSecondVideoPlayed]);

  return (
    <div className='landing-div'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
      </style>

      <div className='nav-bar'>
        <Navbar />
        {/* <Dropdown /> */}
      </div>
      <div className='main-land-div' style={{
        height: '90vh',
      }}>
        <div className='opening-div'>
          <div className='h-div-land'>
            <h1>Empower your</h1>
            <h1>Community with</h1>
            <h1 className='main-word' data-text="TrecNoc">TrecNoc</h1>
          </div>
          <div className='p-div-land'>
            <p>TrecNoc opens doors to community growth, encouraging </p>
            <p>Discovery , Creation and Expansion</p>
            {/* <p>Lorem ipsum dolor sit amet consectetur.</p>
            <p>Lorem ipsum dolor sit amet..</p> */}
          </div>
          <div className='btn-div-land'>
            <button className='explore-btn-land' onClick={Explore}>Explore Events</button>
          </div>
        </div>
        <div className='videogen1'>
        <video src={bulbVid1} autoPlay muted></video>
        {/* <img src={world}></img> */}

        </div>
      </div>
      <div className="container">
        <div className='subh-main' id='subh-id'>
          <div className='subh1'>
            <h2>Want to start your own event?</h2>
            <h3>check out our pricing!</h3>
          </div>
          <div className='subh2'>
            <img src={calender} alt="" />
          </div>
        </div>
        <div id="lp-sub">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
          <div className='cards-container'>

            <div className='sub-cards freez lp-sub-cont' style={{ backgroundColor: "#191a1e", color: "#cccccc" }}>
              <h5 style={{ color: "gray" }}>Basic Plan</h5>
              <div className='duration'>
                <span>Free</span>
              </div>
              <ul className='free'>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>1 event</span>
                </li>
                <li className='line-thru' style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>AI generated picture / event</span>
                </li>
                <li className='line-thru' style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Unlimited AI generated Title's</span>
                </li>
                <li className='line-thru' style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Automatic social media posting</span>
                </li>
                <li className='line-thru' style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Access to influencers</span>
                </li>
              </ul>
              {/* <button>Choose Plan</button> */}
            </div>

            <div className='sub-cards paid lp-sub-cont' style={{ backgroundColor: "#191a1e", color: "#cccccc" }}>
              <h5 style={{ color: "gray" }}>Pro</h5>
              <div className='duration'>
                <span>$</span>
                <span>9</span>
                <span>/month</span>
              </div>
              <ul className='pro'>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">
                    check_circle
                  </span>
                  <span>5 event</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>AI generated picture / event</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Unlimited AI generated Title's</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span className='line-thru'>Automatic social media posting</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span className='line-thru'>Access to influencers</span>
                </li>
              </ul>
              {/* <button>Choose Plan</button> */}
            </div>
            <div className='sub-cards paid lp-sub-cont' style={{ backgroundColor: "#191a1e", color: "#cccccc" }}>
              <h5 style={{ color: "gray" }}>Premium</h5>
              <div className='duration'>
                <span>$</span>
                <span>20</span>
                <span>/month</span>
              </div>
              <ul className='premium'>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>30 event</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>AI generated picture / event</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Unlimited AI generated Title's</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Automatic social media posting</span>
                </li>
                <li style={{ color: "gray" }}>
                  <span class="material-icons">check_circle</span>
                  <span>Access to influencers</span>
                </li>
              </ul>
              {/* <button>Choose Plan</button> */}
            </div>
          </div>
        </div>

        <div id='section5' className='about-us-div'>
          <div className='aboutus1'>
            <h1>About Us</h1>
            <p>
              Welcome to TrecNoc, where we're passionate about fostering connections and experiences.</p>
              <h4><strong>Our Mission</strong></h4>
              <p>
              At TrecNoc, our mission is simple yet powerful: to empower communities to come together, create memorable moments, and expand their horizons. We believe that every community, no matter how big or small, deserves the tools to make their events shine.
              </p>
            <h4><strong>What we offer</strong></h4>
            <p>
              TrecNoc is your platform for bringing people together. We provide the canvas for you to paint your vision, whether it's an intimate gathering or a large-scale event. With us, you can discover exciting opportunities, create lasting memories, and expand your community like never before.

              </p>
              <p><strong>

              Join us on this journey of discovery, creation, and expansion. Let's make your community's moments truly special.</strong></p>

             <p><strong> Explore TrecNoc today and start creating your own unique experiences.</strong></p>
          </div>
          <div className='imgdivaboutus'>
            {/* <video id="autoplay-video" src={bulbVid} autoPlay></video> */}
            <video
            id="autoplay-video"
            ref={secondVideoRef}
            src={bulbVid}
            autoPlay={!hasSecondVideoPlayed}
            muted
          ></video>

          </div>
        </div>

        <div id='section6'>
          <div className='c1'>
            <div>Company</div>
            <div>Whats New</div>
            <div>About</div>
            <div>Contact</div>
          </div>
          <div className='c1'>
            <div>Support</div>
            <div>Getting Started</div>
            <div>FAQ's</div>
            <div>Report</div>
            <div>TrecNoc® 2023</div>
          </div>
          <div className='c1'>            
            <div>Trust & Legal</div>
            <div>Terms and Conditions</div>
            <div>Privacy Notice</div>
            <div>Cookie Notice</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;