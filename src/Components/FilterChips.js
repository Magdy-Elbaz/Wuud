import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function FilterChips({ filterChips, setFilterChips, setPage }) {
  const { t } = useTranslation();
  const handleFilterChips = (name) => {
    setPage(1);
    setFilterChips(name);
  };

  return (
    <div className="d-flex align-items-center gap-2 mb-2" data-aos="fade-right">
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "All" && "opacity-50"}`}
        onClick={() => handleFilterChips("All")}
      >
        <FontAwesomeIcon icon={faCheckDouble} className="text-primary" /> {t('All')}
      </button>
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "Pending" && "opacity-50"}`}
        onClick={() => handleFilterChips("Pending")}
      >
        <FontAwesomeIcon icon={faClock} className="text-warning" /> {t('Pending')}
      </button>
      <button
        value="Confirmed"
        className={`btn btn-secondary rounded-4 ${filterChips !== "Confirmed" && "opacity-50"}`}
        onClick={() => handleFilterChips("Confirmed")}
      >
        <FontAwesomeIcon icon={faCheckCircle} className="text-succes" />
        {t('Confirmed')}
      </button>
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "Canceled" && "opacity-50"}`}
        onClick={() => handleFilterChips("Canceled")}
      >
        <FontAwesomeIcon icon={faXmarkCircle} className="text-cancle" />
        {t('Canceled')}
      </button>
    </div>
  );
}
