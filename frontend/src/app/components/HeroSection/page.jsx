"use client"; // Required for Client Components in App Router

import { usePathname } from "next/navigation";
import Link from "next/link";
import './hero.css'


export default function HeroSection() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let titleSegment = segments.reverse().find((segment) => isNaN(segment)) || "Home";
  const formattedTitle = titleSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="hero-section">
      <div className="container" style={{ backgroundColor: "transparent !important" }}>
        <div className="backgroundtrans">
          <div className="backgroundtrans text-center py-3">
            <h1 className=" text-white  mb-3" style={{ backgroundColor: "transparent !important" }}>{formattedTitle}</h1>
            <nav aria-label="breadcrumb" style={{ backgroundColor: "transparent !important" }}>
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <Link className="text-white" href="/" >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item text-light active" aria-current="page">
                  {titleSegment}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
