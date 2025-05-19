"use client";
import React from "react";
import Image from "next/image";
import pic1 from "../../assets/swing.png"; // Ensure this path is correct
import "./RollingTyre.css"; // Import your CSS file

const Page = () => {
  return (
    <div className="flex items-center bg-black justify-center h-screen Rollingsec">
      <Image src={pic1} alt="Rolling Tyre " width={160} height={160} className="rolling-tyre" />
    </div>
  );
};

export default Page;
