import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Menue } from "../../Context/MenueContext";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { WindowSize } from "../../Context/WindowContext";
import "./bars.css";
import { useTranslation } from "react-i18next";

export default function TopBar() {
  const context = useContext(Menue);
  const { user } = useUser();
  const { windowSize } = useContext(WindowSize);
  const { t , i18n } = useTranslation();

  return (
    <div className="Top-bar d-flex align-items-center justify-content-between bg-primary">
      <div className="d-flex align-items-center gap-2 text-light">
        <div className="d-flex align-items-center gap-2">
          <img
            src={user.avatar}
            className="icon-user"
            width={"50px"}
            height={"50px"}
            alt=""
          />
          <p className="text-capitalize m-0 fw-bold fs-4">
            {windowSize <= 768
              ? user.first_name
              : user.first_name + " " + user.last_name}
          </p>
        </div>
        <FontAwesomeIcon
          cursor={"pointer"}
          icon={faBars}
          onClick={() => context.setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <Link to={"/"} className="btn btn-light text-primary" dir="ltr">
          <FontAwesomeIcon icon={faHouseChimney} /> {t('Home Page')}
        </Link>
      </div>
    </div>
  );
}
