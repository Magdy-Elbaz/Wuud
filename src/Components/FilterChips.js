import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterChips({ filterChips, setFilterChips, setPage }) {
  const handleFilterChips = (name) => {
    setPage(1);
    setFilterChips(name);
  };

  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "All" && "opacity-50"}`}
        onClick={() => handleFilterChips("All")}
      >
        <FontAwesomeIcon icon={faCheckDouble} className="text-primary" /> All
      </button>
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "Pending" && "opacity-50"}`}
        onClick={() => handleFilterChips("Pending")}
      >
        <FontAwesomeIcon icon={faClock} className="text-warning" /> Pending
      </button>
      <button
        value="Confirmed"
        className={`btn btn-secondary rounded-4 ${filterChips !== "Confirmed" && "opacity-50"}`}
        onClick={() => handleFilterChips("Confirmed")}
      >
        <FontAwesomeIcon icon={faCheckCircle} className="text-succes" />
        Confirmed
      </button>
      <button
        className={`btn btn-secondary rounded-4 ${filterChips !== "Canceled" && "opacity-50"}`}
        onClick={() => handleFilterChips("Canceled")}
      >
        <FontAwesomeIcon icon={faXmarkCircle} className="text-cancle" />
        Canceled
      </button>
    </div>
  );
}
