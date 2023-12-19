import v1 from './Wayout web landscape.mp4'
import './product.css';
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; 
const Product = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Video.js options
    const options = {
      // controls: true, // Show video controls
      autoplay: true, // Auto play the video
      loop: true, // Loop the video
    };

    // Initialize the video player
    const player = videojs(videoRef.current, options);

    // Add a mute/unmute button
    player.getChild('controlBar').addChild('MuteToggle', {});

    return () => {
      // Cleanup when component unmounts
      if (player) {
        player.dispose();
      }
    };
  }, []);
  return (
    <>
      <div className='v'>
        {/* <video
        ref={videoRef}
        width="400"
        height="300"
        control
        autoPlay
        src={v1} // Apne video ke path ko yahan par specify karein
      />
      <button onClick={toggleSound
        {isPlaying ? 'Sound Off' : 'Sound On'}
      </button> */}
      </div>
      <div className='main'>
         <video src={v1} autoPlay loop/>
      </div>
      <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" controls muted>
        <source src={v1} type="video/mp4" />
      </video>
    </div>
    </>
  )
}

export default Product