"use client"; // Required for Client Components in App Router

import { usePathname } from "next/navigation";
import Link from "next/link";
import './hero.css'


export default function HeroSection() {
  const pathname = usePathname(); // Get current route path
  const title = pathname.split("/").pop()?.replace(/-/g, " ") || "Home";
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="hero-section">
      <div className="container" style={{backgroundColor:"transparent !important"}}>
        <div className="backgroundtrans">
        <div className="backgroundtrans text-center py-3">
        <h1 className=" text-white  mb-3" style={{backgroundColor:"transparent !important"}}>{formattedTitle}</h1>
        <nav aria-label="breadcrumb" style={{backgroundColor:"transparent !important"}}>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link className="text-white" href="/" >
                Home
              </Link>
            </li>
            <li className="breadcrumb-item text-light active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        </div>
        </div>
      </div>
    </div>
  );
}
