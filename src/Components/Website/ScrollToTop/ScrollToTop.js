import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  useEffect(() => {
    const heightScreen = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", heightScreen);
    return () => window.removeEventListener("scroll", heightScreen);
  }, []);

  return (
    <>
      <Outlet />
      {scrollPosition > 500 && (
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center position-fixed upArrowButton fs-5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-aos="fade-left"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
}
