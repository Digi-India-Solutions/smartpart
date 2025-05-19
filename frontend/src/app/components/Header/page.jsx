"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Extract route name from pathname and format it
    const formattedTitle = pathname === "/"
      ? "Home"
      : pathname.replace("/", "").replace(/-/g, " ").toUpperCase();
    
    setTitle(formattedTitle);

    // Set the page title dynamically
    document.title = formattedTitle + " | My Website";
  }, [pathname]);

  return (
    <section>
      <div className="container-fluid header-bg py-5 mb-2 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-white mb-3 animated slideInDown">About Us</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link className="text-white" href="/">Home</Link>
              </li>
              <li className="breadcrumb-item text-light active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Page;
