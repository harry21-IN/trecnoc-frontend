import React, { useEffect, useRef } from 'react';
// import bulbVid from '../assets/bulbVid.mp4';

function AutoplayVideo() {
  const videoRef = useRef(null);

  // Function to play the video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    // Options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the video is in the viewport
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo();
          // Stop observing once the video starts playing to prevent multiple plays
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe the video element
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <div>
      <video id="autoplay-video" src={bulbVid} autoPlay mute></video>
    </div>
  );
}

export default AutoplayVideo;
