'use client';
import { useEffect, useRef, useState } from 'react';

const VideoComponent = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [videoPlayed, setVideoPlayed] = useState(false);

  useEffect(() => {
    const hasPlayed = localStorage.getItem('videoPlayed');

    if (!hasPlayed && videoRef.current) {
      videoRef.current.play();
      setVideoPlayed(true);
      localStorage.setItem('videoPlayed', 'true');
    }
  }, []);

  const handleVideoEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          style={{ minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          controls={false}
          autoPlay
          onEnded={handleVideoEnd}
        >
          <source src="/hack.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideoComponent;
