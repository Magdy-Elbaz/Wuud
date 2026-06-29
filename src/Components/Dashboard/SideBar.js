import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Menue } from "../../Context/MenueContext";
import { WindowSize } from "../../Context/WindowContext";
import { link } from "./NavLink";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from "react-i18next";
import "./bars.css";

export default function SideBar() {
  const context = useContext(Menue);
  const { windowSize } = useContext(WindowSize);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const sideBarRef = useRef();
  const location = useLocation();
  // User
  const { user } = useUser();

  useEffect(() => {
    if (windowSize <= 768) {
      context.setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className="bg-side-bar-modile"
        style={{
          display:
            windowSize <= "768" ? (context.isOpen ? "block" : "none") : "none",
        }}
        onClick={() => {
          context.setIsOpen(false);
        }}
      ></div>
      <div
        className={`side-bar ${theme === "light" ? "bg-light-card" : "bg-dark-card"} ${i18n.language === "ar" ? "ar" : "en"} d-flex flex-column pt-2`}
        style={{
          left:
            windowSize <= "768" && i18n.language === "en"
              ? context.isOpen
                ? 0
                : "-100%"
              : windowSize > "768" && i18n.language === "en" && 0,
          right:
            windowSize <= "768" && i18n.language === "ar"
              ? context.isOpen
                ? 0
                : "-100%"
              : windowSize > "768" && i18n.language === "ar" && 0,
          minWidth: context.isOpen
            ? windowSize <= "768"
              ? "60%"
              : "15%"
            : "fit-content",
        }}
        ref={sideBarRef}
      >
        <FontAwesomeIcon
          icon={faChartColumn}
          className="fs-3 px-3 text-primary"
        />
        {link.map(
          (nav, key) =>
            nav.role.includes(user.role) && (
              <NavLink
                to={nav.path}
                className={`d-flex align-items-center position-relative gap-2 px-3 side-bar-link text-secondary fw-bold ${!context.isOpen && windowSize > "768" && "show-data"} ${i18n.language === "ar" ? "ar" : "en"}`}
                key={key}
                end
              >
                <FontAwesomeIcon icon={nav.icon} />
                <p
                  className="m-0"
                  style={{
                    display: context.isOpen ? "block" : "none",
                  }}
                >
                  {t(nav.name)}
                </p>
              </NavLink>
            ),
        )}
      </div>
    </>
  );
}
