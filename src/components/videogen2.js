import React, { useEffect } from 'react';
import bulbVid from '../assets/bulbVid.mp4';
import './css/Landing.css';
const MyComponent = () => {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Clean up the observer when the component unmounts
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []); // Empty dependency array to ensure the observer is set up only once

  return (
    <div>
      {/* Your React component content */}
      <video id="autoplay-video" src={bulbVid} autoPlay mute></video>
    </div>
  );
};

export default MyComponent;
