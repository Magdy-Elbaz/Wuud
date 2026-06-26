import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loding from "../../Loding/Loding";
import "./BtnSeeMore.css";
import { useTranslation } from "react-i18next";

export default function BtnSeeMore(props) {
  const { t } = useTranslation();

  return (
    <div
      className="d-flex align-items-center justify-content-center my-5"
      onClick={() => {
        props.setLimit((prev) => (prev + (props.singleCategory ? 16 : 5)));
        props.setLodingeeMore(true);
      }}
      data-aos="fade-up"
    >
      <div className="btn-seemore cursor-pointer d-flex align-items-center justify-content-center bg-light py-2 rounded-3">
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
