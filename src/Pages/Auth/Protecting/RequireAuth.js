import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";
import Err403 from "../Error/403/403";
import Err404 from "../Error/404/404";
import Loding from "../../../Components/Loding/Loding";
import { useUser } from "../../../Context/UserContext";
import { useEffect } from "react";

export default function RequireAuth({ allowedRole }) {
  // User
  const { user, setShowNav } = useUser();
  // token & cookie
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  useEffect(() => {
    setShowNav(true);
  }, []);

  return (
    <>
      {token ? (
        user.length === 0 ? (
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <Loding />
          </div>
        ) : allowedRole.includes(user.role) ? (
          <Outlet />
        ) : user.role === "2001" ? (
          <Err404 />
        ) : (
          <Err403 />
        )
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}
