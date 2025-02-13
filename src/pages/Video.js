'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoComponent from '@/Components/VideoComponent';
import Home from '@/pages/Home';

const Video = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const router = useRouter();

  const handleVideoEnd = () => {
    setVideoEnded(true);
    router.push('/Home');
  };

  return (
    <div style={{ overflow: videoEnded ? 'auto' : 'hidden', height: videoEnded ? 'auto' : '100vh' }}>
      {!videoEnded && <VideoComponent onVideoEnd={handleVideoEnd} />}
      {videoEnded && (
        <div>
          <Home/>
        </div>
      )}
    </div>
  );
};

export default Video;