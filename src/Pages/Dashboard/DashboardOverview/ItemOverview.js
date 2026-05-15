import {
  faCalendarDays,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMoneyBillWave,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonPage from "../../../Components/Website/SkeletonPage";

export default function ItemOverview({ data, loding }) {
  return (
    <>
      {loding ? (
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <SkeletonPage number={1} width={"420.25px"} height={"193.6px"} />
          <SkeletonPage
            number={4}
            width={"350px"}
            height={"92.8px"}
            wrap={true}
          />
        </div>
      ) : (
        <div className="d-block d-md-flex gap-md-4">
          <div className="bg-success text-light shadow-lg d-flex py-2 align-items-center justify-content-center gap-2 rounded-3 col-12 col-md-4">
            <FontAwesomeIcon icon={faMoneyBillWave} className="fs-2" />
            <div>
              <p className="m-0">Total Sales:</p>
              <h4>{data.total_sales} EGP</h4>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 gap-md-2 flex-wrap col-12 mt-3 mt-md-0 col-md-8">
            <div className="bg-warning text-light shadow-lg d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-6">
              <FontAwesomeIcon icon={faTruckFast} className="fs-2" />
              <div>
                <p className="my-0">Orders Count:</p>
                <h4 className="text-center">{data.orders_count}</h4>
              </div>
            </div>
            <div className="bg-info text-light shadow-lg d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-5">
              <FontAwesomeIcon icon={faUsers} className="fs-2" />
              <div>
                <p className="m-0">Users Count:</p>
                <h4 className="text-center">{data.users_count}</h4>
              </div>
            </div>
            <div className="bg-card-today shadow-lg text-light d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-12 col-md-4">
              <FontAwesomeIcon icon={faCalendarDays} className="fs-2" />
              <div>
                <p className="m-0">Today Orders:</p>
                <h4 className="text-center">{data.today_confirmed}</h4>
              </div>
            </div>
            <div className=" bg-secondary shadow-lg text-light d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-6 col-md-4">
              <FontAwesomeIcon icon={faClock} className="fs-2" />
              <div>
                <p className="m-0">Pending Orders:</p>
                <h4 className="text-center">{data.pending_orders}</h4>
              </div>
            </div>
            <div className="bg-danger shadow-lg text-light p-3 px-1 gap-2 rounded-3 col-5 col-md-3 d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faXmarkCircle} className="fs-2" />
              <div>
                <p className="m-0">Canceled:</p>
                <h4 className="text-center">{data.canceled_count}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
