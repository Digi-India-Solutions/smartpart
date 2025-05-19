import React from "react";
import "./slider.css";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaLocationDot } from "react-icons/fa";
import { SiGmail, SiGoogle } from "react-icons/si"; // Correct imports
import Link from "next/link";

const socialLinks = [
  { icon: FaFacebookSquare, url: "https://www.facebook.com/smartpartsexports" },             

  { icon: FaInstagramSquare, url: "https://www.instagram.com" },
  { icon: FaTwitterSquare, url: "https://www.twitter.com" },
  { icon: SiGmail, url: "mailto:someone@example.com" }, // Opens email
  { icon: SiGoogle, url: "https://www.google.com" },
];

const Page = () => {
  return (
    <div className="sliderContainer">
      <div className="sliderTrack">
        {socialLinks.map((item, index) => (
          <Link key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="iconWrapper">
            <item.icon className="icon" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;

