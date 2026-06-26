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
import { useTheme } from "../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ProfileAndCart(props) {
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  const [lodingLogout, setLodingLogout] = useState(false);

  const { user, lodingUser, setUser } = useUser();
  const { isChange } = useContext(ChangeAlContext);
  const [countProducts, setCountProducts] = useState([]);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  // Ref
  const menuRef = useRef();
  const iconOpenMenuRef = useRef();

  async function handleLogout() {
    setLodingLogout(true);
    try {
      await Axios.get(`/${LOGOUT}`);
      menuRef.current.style.display = "none";
      cookie.remove("Bearer");
      setUser([]);
      window.location.pathname = "";
    } catch (err) {
      console.log(err);
    } finally {
      setLodingLogout(false);
    }
  }

  function handleClickIcon(event) {
    if (menuRef.current.style.display === "block") {
      menuRef.current.style.display = "none";
    } else {
      menuRef.current.style.display = "block";
    }
    event.stopPropagation();
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconOpenMenuRef.current.contains(event.target)
      ) {
        menuRef.current.style.display = "none";
      }
    };

    // 3. بنشغل المراقب (EventListener) على مستوى الصفحة كلها
    document.addEventListener("mousedown", handleClickOutside);

    // 4. تنظيف الـ Listener لما الكومبوننت يقفل عشان ميعملش بطء (Memory Leak)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product"));
    setCountProducts(getProduct?.length || 0);
  }, [isChange]);

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <div className="d-flex align-items-center gap-2" data-aos="fade-left">
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
              onClick={() => props.setOpenCart((prev) => !prev)}
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
            className="cursor-pointer icon-user z-2"
            src={user.length === 0 ? userIconImage : user.avatar}
            onClick={handleClickIcon}
            width={"50px"}
            height={"50px"}
            alt=""
            ref={iconOpenMenuRef}
          />
        </div>
        <div
          className={`links-profile rounded-4 gap-2 ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} p-3 position-absolute`}
          ref={menuRef}
          dir={i18n.language === "en" ? "ltr" : "rtl"}
        >
          {lodingUser ? (
            <SkeletonProfileAndCart />
          ) : (
            <>
              <TopProfile menuRef={menuRef} />
              <hr />
              <div className="d-flex flex-column gap-2 mb-2">
                <Link
                  to="/my-orders"
                  className={`btn ${theme === "dark" && "text-light"} links p-2 d-flex gap-1 align-items-center`}
                  onClick={handleClickIcon}
                >
                  <FontAwesomeIcon icon={faBoxesStacked} />
                  {t("My Orders")}
                </Link>
                <Link
                  to="/wishlist"
                  className={`btn ${theme === "dark" && "text-light"} links p-2 d-flex gap-1 align-items-center`}
                  onClick={handleClickIcon}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  {t("Wishlist")}
                </Link>
                <Link
                  to="/settinges"
                  className={`btn ${theme === "dark" && "text-light"} links p-2 d-flex gap-1 align-items-center`}
                  onClick={handleClickIcon}
                >
                  <FontAwesomeIcon icon={faGear} />
                  {t("Settings")}
                </Link>
                {(user.role === "1995" || user.role === "1999") && (
                  <Link
                    to="/dashboard"
                    className={`btn ${theme === "dark" && "text-light"} links p-2 d-flex gap-1 align-items-center`}
                    onClick={handleClickIcon}
                  >
                    <FontAwesomeIcon icon={faChartColumn} /> {t("Dashboard")}
                  </Link>
                )}
                {!token ? (
                  <>
                    <hr />
                    <div className="links-auth">
                      <Link
                        to="/login"
                        className={`btn w-50 ${i18n.language === "ar" && "px-0"}`}
                        style={{ backgroundColor: "#ccc8bf" }}
                        onClick={handleClickIcon}
                      >
                        {t("Login")}
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-primary w-50"
                        onClick={handleClickIcon}
                      >
                        {t("Register")}
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <hr />
                    <div onClick={handleLogout}>
                      <BtnSubmit
                        loding={lodingLogout}
                        name={t("Logout")}
                        width="100%"
                        noCenter={true}
                        className="text-danger links"
                        colorLoding={"#dc3545"}
                        icon={faArrowRightFromBracket}
                        primaryLoding={true}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
