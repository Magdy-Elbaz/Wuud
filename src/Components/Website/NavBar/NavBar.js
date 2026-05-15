import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import CartShop from "../../../Pages/Website/CartShop/CartShop";
import CatigoriesShowNav from "./CatigoriesShowNav";
import ProfileAndCart from "./ProfileAndCart/ProfileAndCart";
import "./navBar.css";

export default function NavBar() {
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <div className="navbar bg-primary">
        <CartShop open={openCart} setOpen={setOpenCart} />
        <Container>
          <div className="d-flex align-items-center justify-content-center justify-content-md-between py-2 py-md-0 flex-wrap gap-2 w-100">
            <Link to="/">
              <img
                src="https://themes.codezion.com/tm/html/wuud/assets/images/logo.png"
                alt=""
              />
            </Link>
            <div className="d-flex align-items-center gap-2">
              <NavLink to="/" className="btn btn-primary px-2">
                Home
              </NavLink>
              <NavLink to="/shop" className="btn btn-primary px-2">
                Shop
              </NavLink>
              <NavLink to="/about" className="btn btn-primary px-2">
                About Us
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
