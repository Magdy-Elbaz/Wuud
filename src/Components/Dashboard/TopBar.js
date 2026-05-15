import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Menue } from "../../Context/MenueContext";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "./bars.css";

export default function TopBar() {
  const context = useContext(Menue);
  const { user } = useUser();

  return (
    <div className="Top-bar d-flex align-items-center justify-content-between bg-primary">
      <div className="d-flex align-items-center gap-2 text-light">
        <div className="d-flex align-items-center gap-2">
          <img src={user.avatar} className="icon-user" alt="" />
          <h3>{user.name}</h3>
        </div>
        <FontAwesomeIcon
          cursor={"pointer"}
          icon={faBars}
          onClick={() => context.setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <Link to={"/"} className="btn btn-light text-primary">
          <FontAwesomeIcon icon={faHouseChimney} /> Home Page
        </Link>
      </div>
    </div>
  );
}
