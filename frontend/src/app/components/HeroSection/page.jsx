// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import './hero.css';
// import { getData, serverURL } from "@/app/services/FetchNodeServices";
// import { it } from "intl-tel-input/i18n";
// import { useEffect, useState } from "react";

// export default function HeroSection({ brandName, title }) {
//   const pathname = usePathname();
//   const [banner, setBanner] = useState("");
//   const [bannerList, setBannerList] = useState([]);
//   const segments = pathname.split("/").filter(Boolean);
//   let titleSegment = segments.reverse().find((segment) => isNaN(segment)) || "Home";

//   const formattedTitle = titleSegment
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());

//   const getBreadcrumbLabel = () => {
//     if (title === "brand" || title === "category") {
//       return `${title.charAt(0).toUpperCase() + title.slice(1)} / ${brandName}`;
//     } else if (!title || title === "undefined") {
//       return formattedTitle;
//     } else {
//       return title.charAt(0).toUpperCase() + title.slice(1);
//     }
//   };

//   const fetchBrand = async () => {
//     const res = await getData("brand/get-all-brand");
//     if (res?.status) {
//       setBannerList(res?.data.filter((item) => item.name === brandName));
//     }
//   }

//   useEffect(() => {
//     fetchBrand().then(() => {
//       if (bannerList.length > 0) {
//         setBanner(bannerList[0]);
//       }
//     })
//   }, [brandName])


//   return (
//     <div style={{ backgroundImage: `url(${serverURL}/${banner?.banner})`||`url("../../assets/background7.avif")`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: 'solid 1px white', width: '100%', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
//       <div className="container">
//         <div className="backgroundtrans text-center py-3">
//           <h1 className="text-white mb-3">{formattedTitle}</h1>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb justify-content-center mb-0">
//               <li className="breadcrumb-item">
//                 <Link className="text-white" href="#">
//                   Home
//                 </Link>
//               </li>
//               <li className="breadcrumb-item text-light active" aria-current="page">
//                 {getBreadcrumbLabel()}
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import './hero.css';
import { getData, serverURL } from "@/app/services/FetchNodeServices";
import pic from "@/app/assets/background7.avif"

export default function HeroSection({ brandName, title }) {
  const pathname = usePathname();
  const [banner, setBanner] = useState(null);

  const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  const formattedTitle = useMemo(() => {
    const titleSegment = [...segments]
      .reverse()
      .find((segment) => isNaN(segment)) || "Home";

    return titleSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [segments]);

  const breadcrumbLabel = useMemo(() => {
    if (title === "brand" || title === "category") {
      return `${title.charAt(0).toUpperCase() + title.slice(1)} / ${brandName}`;
    }
    if (!title || title === "undefined") {
      return formattedTitle;
    }
    return title.charAt(0).toUpperCase() + title.slice(1);
  }, [title, brandName, formattedTitle]);

  useEffect(() => {
    const fetchBanner = async () => {
      if (!brandName) return;

      const [brandRes, categoryRes] = await Promise.all([
        getData("brand/get-all-brand"),
        getData("category/get-all-categorys"),
      ]);

      const brandMatch = brandRes?.status
        ? brandRes.data.find((item) => item.name === brandName)
        : null;

      const categoryMatch = categoryRes?.status
        ? categoryRes.data.find((item) => item.name === brandName)
        : null;

      // Prioritize brand match over category match
      setBanner(brandMatch || categoryMatch || null);
    };

    fetchBanner();
  }, [brandName]);

  const backgroundImage = useMemo(() => {
    if (banner?.banner) {
      const path = banner.banner.startsWith("uploads/images")
        ? banner.banner
        : `uploads/images/${banner.banner}`;
      return `url(${serverURL}/${path})`;
    }
    return `url(${pic.src})`;
  }, [banner]);

  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderBottom: "solid 1px white",
        width: "100%",
        minHeight: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="backgroundtrans text-center py-3">
          <h1 className="text-white mb-3">{formattedTitle}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link className="text-white" href="/">
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item text-light active"
                aria-current="page"
              >
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}


