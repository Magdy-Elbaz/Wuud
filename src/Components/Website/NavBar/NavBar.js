import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import CartShop from "../../../Pages/Website/CartShop/CartShop";
import CatigoriesShowNav from "./CatigoriesShowNav";
import ProfileAndCart from "./ProfileAndCart/ProfileAndCart";
import { useTranslation } from "react-i18next";
import "./navBar.css";

export default function NavBar() {
  const [openCart, setOpenCart] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="navbar bg-primary" dir="ltr">
        <div className="overflow-hidden">
          <CartShop open={openCart} setOpen={setOpenCart} />
        </div>
        <Container>
          <div className="d-flex align-items-center overflow-hidden justify-content-between py-2 py-md-0 flex-wrap gap-2 w-100">
            <Link to="/" data-aos="fade-right">
              <img src={require(`../../../Assets/logo-nav.png`)} alt="" />
            </Link>
            <div
              className="d-flex align-items-center gap-2 links-nav bg-primary"
              dir={i18n.language === "en" ? "ltr" : "rtl"}
            >
              <NavLink
                to="/"
                className="btn btn-primary px-2"
                data-aos="zoom-in"
              >
                {t("Home")}
              </NavLink>
              <NavLink
                to="/shop"
                className="btn btn-primary px-2"
                data-aos="zoom-in"
              >
                {t("Shop")}
              </NavLink>
              <NavLink
                to="/about"
                className="btn btn-primary px-2"
                data-aos="zoom-in"
              >
                {t("About Us")}
              </NavLink>
            </div>
            <ProfileAndCart setOpenCart={setOpenCart} />
          </div>
        </Container>
      </div>
      <CatigoriesShowNav />
      <Outlet />
    </>
  );
}
