import { Link } from "react-router-dom";
import { LOGOUT } from "../../../../Api/Api";
import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import BtnSubmit from "../../../Btn/BtnSubmit";
import {
  faArrowRightFromBracket,
  faBoxesStacked,
  faCartShopping,
  faChartColumn,
  faGear,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonProfileAndCart from "./SkeletonProfileAndCart";
import TopProfile from "../../TopProfile";
import userIconImage from "../../../../Assets/user-icon.png";
import Cookie from "cookie-universal";
import { useUser } from "../../../../Context/UserContext";
import { ChangeAlContext } from "../../../../Context/ChangeAllContext";

export default function ProfileAndCart(props) {
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  const [lodingLogout, setLodingLogout] = useState(false);

  const { user, lodingUser, setUser } = useUser();
  const { isChange } = useContext(ChangeAlContext);
  const [countProducts, setCountProducts] = useState([]);

  const role =
    user.role === "1995"
      ? "Admin"
      : user.role === "1999"
        ? "Product Manger"
        : "User";

  // Ref
  const iconRef = useRef();

  async function handleLogout() {
    setLodingLogout(true);
    try {
      await Axios.get(`/${LOGOUT}`);
      iconRef.current.style.display = "none";
      cookie.remove("Bearer");
      setUser([]);
      window.location.pathname = "";
    } catch (err) {
      console.log(err);
    } finally {
      setLodingLogout(false);
    }
  }

  function handleClickIcon() {
    if (iconRef.current.style.display === "block") {
      iconRef.current.style.display = "none";
    } else {
      iconRef.current.style.display = "block";
    }
  }

  function handleOpenCart() {
    if (iconRef.current.style.display === "block") {
      iconRef.current.style.display = "none";
    }

    props.setOpenCart((prev) => !prev);
  }

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product"));
    setCountProducts(getProduct?.length || 0);
  }, [isChange]);

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="d-flex align-items-center gap-2">
        <Link to="/wishlist">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-light cursor-pointer fs-4"
          />
        </Link>
        <div className="position-relative">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-light cursor-pointer fs-4"
            onClick={handleOpenCart}
          />
          <span
            className="position-absolute text-dark"
            style={{
              top: "-15px",
              left: "12px",
              fontSize: "12px",
            }}
          >
            {countProducts}
          </span>
        </div>
        <img
          className="cursor-pointer icon-user"
          src={user.length === 0 ? userIconImage : user.avatar}
          onClick={handleClickIcon}
          alt=""
        />
      </div>
      <div
        className="links-profile rounded-4 gap-2 bg-light p-3 position-absolute"
        ref={iconRef}
      >
        {lodingUser ? (
          <SkeletonProfileAndCart />
        ) : (
          <>
            <TopProfile role={role} setOpenProfile={handleClickIcon} />
            <hr />
            <div className="d-flex flex-column gap-2 mb-2">
              <Link
                to="/my-orders"
                className="btn links p-2 d-flex gap-1 align-items-center"
                onClick={handleClickIcon}
              >
                <FontAwesomeIcon icon={faBoxesStacked} />
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="btn links p-2 d-flex gap-1 align-items-center"
                onClick={handleClickIcon}
              >
                <FontAwesomeIcon icon={faHeart} />
                Wishlist
              </Link>
              <div className="btn links p-2 d-flex gap-1 align-items-center">
                <FontAwesomeIcon icon={faGear} />
                Settings
              </div>
              {user.role === "1995" && (
                <Link
                  to="/dashboard"
                  className="btn p-2 links d-flex gap-1 align-items-center"
                  onClick={handleClickIcon}
                >
                  <FontAwesomeIcon icon={faChartColumn} /> Dashboard
                </Link>
              )}
              {!token ? (
                <>
                  <hr />
                  <div className="links-auth">
                    <Link
                      to="/login"
                      className="btn btn-light w-50"
                      onClick={handleClickIcon}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-50"
                      onClick={handleClickIcon}
                    >
                      Register
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <hr />
                  <div onClick={handleLogout}>
                    <BtnSubmit
                      loding={lodingLogout}
                      name="Logout"
                      width="100%"
                      noCenter={true}
                      className="text-danger links"
                      colorLoding={"#dc3545"}
                      icon={faArrowRightFromBracket}
                    />
                  </div>
                </>
              )}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
}
