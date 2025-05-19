'use client';
import './unique.css';
import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    // Ensure video plays and loops properly
    const handleCanPlay = () => {
      video.play().catch(e => console.log("Autoplay prevented:", e));
    };

    video.addEventListener('canplay', handleCanPlay);
    
    // Set video as always visible and playing
    video.style.opacity = '1';
    video.style.position = 'fixed';
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const container = containerRef.current;
      const video = videoRef.current;
      
      if (!container || !video) return;
      
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      
      // Calculate scroll progress within the container
      const scrollProgress = (scrollPosition - containerTop) / containerHeight;
      
      // Adjust video opacity or effects based on scroll (optional)
      // Here we keep it always visible but you can add effects if needed
      video.style.opacity = '1';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-100" ref={containerRef}>
      {/* Video Section */}
      <div id="video-section" className="position-relative vh-100">
        {/* Permanent Video Background */}
        <div 
          ref={videoRef}
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            pointerEvents: 'none',
            zIndex: -1,
            transition: 'opacity 0.3s',
            backgroundRepeat:'no-repeat'
          }}
        >
          <video 
            className="w-100 h-100 object-fit-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay Content */}
        <div className="
          position-relative uniqueSec d-flex align-items-center justify-content-center 
          vh-100 display-4 fw-bold bg-dark bg-opacity-50 
        ">
                         
        </div>
      </div>
    </div>
  );
};

export default VideoSection;







// 'use client';
// import './unique.css';

// import React, { useEffect, useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const VideoSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsVisible(entry.isIntersecting),
//       { threshold: 0.6 } // Adjust visibility trigger
//     );

//     const section = document.getElementById('video-section');
//     if (section) observer.observe(section);

//     return () => section && observer.unobserve(section);
//   }, []);

//   return (
//     <div className="w-100 ">
//       {/* Video Section */}
//       <div id="video-section" className="  position-relative vh-100">
//         {/* Sticky Video Background */}
//         <div 
//           ref={videoRef}
//           className={`position-fixed top-0 start-0 w-100 h-100 transition-opacity ${
//             isVisible ? 'opacity-100' : 'opacity-0'
//           }`}
//           style={{ pointerEvents: 'none', transition: 'opacity 0.6s' }}
//         >
//           <video className="w-100 h-100 object-fit-cover" autoPlay loop muted playsInline>
//             <source src="/video1.mp4" type="video/mp4" />
//           </video>
//         </div>

//         {/* Overlay Content */}
//         <div className="position-relative uniqueSec d-flex align-items-center justify-content-center vh-100 text-white display-4 fw-bold bg-dark bg-opacity-50">
//         TOP 2/3 WHEELERS
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoSection;
