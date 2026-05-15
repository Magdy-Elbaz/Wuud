import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menue } from "../../Context/MenueContext";
import { WindowSize } from "../../Context/WindowContext";
import { link } from "./NavLink";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";
import { useUser } from "../../Context/UserContext";

export default function SideBar() {
  const context = useContext(Menue);
  const { windowSize } = useContext(WindowSize);
  // User
  const { user } = useUser();

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
        className="Side-bar d-flex flex-column pt-2"
        style={{
          left: windowSize <= "768" ? (context.isOpen ? 0 : "-100%") : 0,
          minWidth: context.isOpen
            ? windowSize <= "768"
              ? "60%"
              : "15%"
            : "fit-content",
        }}
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
                className={
                  "d-flex align-items-center gap-2 px-3 side-bar-link text-secondary fw-bold"
                }
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
                  {nav.name}
                </p>
              </NavLink>
            ),
        )}
      </div>
    </>
  );
}
