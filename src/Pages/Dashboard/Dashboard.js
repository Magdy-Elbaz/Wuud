import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import { Outlet, useLocation } from "react-router-dom";
import DashboardOverview from "./DashboardOverview/DashboardOverview";
import { useTranslation } from "react-i18next";
import "./dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <div
      className="position-relative w-100 d-flex gap-1 h-100vh"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <SideBar />
      <div className="flex-grow-1" style={{ minWidth: "0" }}>
        <TopBar />
        {location.pathname.toLocaleLowerCase() === "/dashboard" ? (
          <DashboardOverview />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
