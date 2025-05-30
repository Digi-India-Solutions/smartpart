"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import './hero.css';

export default function HeroSection({ brandName, title }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let titleSegment = segments.reverse().find((segment) => isNaN(segment)) || "Home";

  const formattedTitle = titleSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const getBreadcrumbLabel = () => {
    if (title === "brand" || title === "category") {
      return `${title.charAt(0).toUpperCase() + title.slice(1)} / ${brandName}`;
    } else if (!title || title === "undefined") {
      return formattedTitle;
    } else {
      return title.charAt(0).toUpperCase() + title.slice(1);
    }
  };

  return (
    <div className="hero-section">
      <div className="container">
        <div className="backgroundtrans text-center py-3">
          <h1 className="text-white mb-3">{formattedTitle}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link className="text-white" href="#">
                  Home 
                </Link>
              </li>
              <li className="breadcrumb-item text-light active" aria-current="page">
                {getBreadcrumbLabel()}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
