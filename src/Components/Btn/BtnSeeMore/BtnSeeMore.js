import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loding from "../../Loding/Loding";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Context/ThemeContext";
import "./BtnSeeMore.css";

export default function BtnSeeMore(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div
      className="d-flex align-items-center justify-content-center my-5"
      onClick={() => {
        props.setLimit((prev) => (prev + (props.singleCategory ? 16 : 5)));
        props.setLodingeeMore(true);
      }}
      data-aos="zoom-in"
    >
      <div className={`btn-seemore cursor-pointer d-flex align-items-center justify-content-center ${theme === "dark" ? "bg-dark-card" : "bg-light-card text-dark"} py-2 rounded-3`}>
        {props.lodingSeeMore ? (
          <Loding action={true} primaryLoding={true} />
        ) : (
          <>
            {t('See More')}
            <FontAwesomeIcon className="icon-seemore" icon={faAnglesDown} />
          </>
        )}
      </div>
    </div>
  );
}
