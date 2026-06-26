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
import { useContext } from "react";
import { WindowSize } from "../../../Context/WindowContext";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ItemOverview({ data, loding }) {
  const { windowSize } = useContext(WindowSize);
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <>
      {loding ? (
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="col-12 col-md-4">
            <SkeletonPage
              number={1}
              width={"420.25px"}
              height={windowSize <= "768" ? "74px" : "193.6px"}
            />
          </div>
          <div className="col-12 col-md-7">
            <SkeletonPage
              number={2}
              width={windowSize <= "768" ? "170px" : "350px"}
              height={"92.8px"}
              wrap={true}
            />
            {windowSize <= "768" && (
              <SkeletonPage
                number={1}
                width={windowSize <= "768" ? "100%" : "230px"}
                height={"92.8px"}
                wrap={true}
              />
            )}
            <SkeletonPage
              number={windowSize <= "768" ? 2 : 3}
              width={windowSize <= "768" ? "170px" : "230px"}
              height={"92.8px"}
              wrap={true}
            />
          </div>
        </div>
      ) : (
        <div className="d-block d-md-flex gap-md-4">
          <div
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-success d-flex align-items-center justify-content-center shadow py-2 rounded-3 col-12 col-md-4`}
          >
            <div
              data-aos="zoom-in"
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="fs-1" />
              <div>
                <p className="m-0">{t('Total Sales')}:</p>
                <h5>{data.total_sales} {t('EGP')}</h5>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 gap-md-2 flex-wrap col-12 mt-3 mt-md-0 col-md-8">
            <div
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-light shadow d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-6`}
              data-aos={windowSize <= "768" ? "fade-right" : "fade-down"}
            >
              <FontAwesomeIcon icon={faTruckFast} className="fs-2" />
              <div>
                <p className="my-0">{t('Orders Count')}:</p>
                <h4 className="text-center">{data.orders_count}</h4>
              </div>
            </div>
            <div
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-info shadow d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-5`}
              data-aos={windowSize <= "768" ? "fade-left" : "fade-down"}
            >
              <FontAwesomeIcon icon={faUsers} className="fs-2" />
              <div>
                <p className="m-0">{t('Users Count')}:</p>
                <h4 className="text-center">{data.users_count}</h4>
              </div>
            </div>
            <div
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-card-today shadow d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-12 col-md-4`}
              data-aos={windowSize <= "768" ? "zoom-out" : "fade-right"}
            >
              <FontAwesomeIcon icon={faCalendarDays} className="fs-2" />
              <div>
                <p className="m-0">{t('Today Orders')}:</p>
                <h4 className="text-center">{data.today_confirmed}</h4>
              </div>
            </div>
            <div
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-warning shadow d-flex align-items-center justify-content-center p-3 px-1 gap-2 rounded-3 col-6 col-md-4`}
              data-aos={windowSize <= "768" ? "fade-right" : "zoom-out"}
            >
              <FontAwesomeIcon icon={faClock} className="fs-2" />
              <div>
                <p className="m-0">{t('Pending Orders')}:</p>
                <h4 className="text-center">{data.pending_orders}</h4>
              </div>
            </div>
            <div
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} text-danger shadow p-3 px-1 gap-2 rounded-3 col-5 col-md-3 d-flex align-items-center justify-content-center`}
              data-aos="fade-left"
            >
              <FontAwesomeIcon icon={faXmarkCircle} className="fs-2" />
              <div>
                <p className="m-0">{t('Canceled Orders')}:</p>
                <h4 className="text-center">{data.canceled_count}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
