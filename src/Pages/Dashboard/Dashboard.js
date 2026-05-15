import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import { Outlet, useLocation } from "react-router-dom";
import DashboardOverview from "./DashboardOverview/DashboardOverview";
import "./dashboard.css";

export default function Dashboard() {
  const location = useLocation();

  return (
    <>
      <div className="position-relative w-100 dashboard d-flex gap-1 w-100">
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
    </>
  );
}
