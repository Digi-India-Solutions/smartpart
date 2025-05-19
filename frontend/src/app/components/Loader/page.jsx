"use client";
import { useState, useEffect } from "react";

const VideoLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide video after 5 seconds automatically (optional)
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null; // Don't render the video if it's hidden

  return (
    <div className="fixed top-0 left-0 w-full h-100 bg-black flex items-center justify-center z-50">
      <video
        src="/preload1.mp4" // Ensure the video is in the public folder
        autoPlay
        muted  
        playsInline
        className="loader-video"
        onEnded={() => {
          setIsVisible(false);
          onComplete();
        }} // Hide video when it ends
      />
     
    </div>
  );
};

export default VideoLoader;
