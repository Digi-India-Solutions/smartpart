"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import './video.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark w-100">
      <div className="videosec video position-relative w-100">
        {!isPlaying ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="position-relative cursor-pointer w-100 pb-5"
            onClick={() => setIsPlaying(true)}
          >
            <img
            
              src="https://source.unsplash.com/1920x1080/?technology"
              alt="Video Thumbnail"
              className="img-fluid rounded shadow-lg w-100 object-fit-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center bg-black bg-opacity-50 rounded w-100 h-100"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-danger p-3 rounded-circle shadow-lg"
              >
                <FaPlay className="fs-3 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-100 h-100 object-fit-cover"
            autoPlay
            loop
            muted
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </div>
    </div>
  );
}
