import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loding from "../Loding/Loding";

export default function BtnSubmit(props) {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      className={`btn ${props.className || "btn-primary py-2"}`}
      style={{ width: props.width || "100%" }}
    >
      {props.loding ? (
        <div
          className={`d-flex align-items-center ${!props.noCenter && "justify-content-center"}`}
        >
          <Loding action={true} color={props.colorLoding || "#eee"} />
        </div>
      ) : props.icon ? (
        <div
          className={`d-flex align-items-center ${!props.noCenter && "justify-content-center"} gap-2`}
        >
          <FontAwesomeIcon icon={props.icon} />
          {props.name}
        </div>
      ) : (
        props.name
      )}
    </button>
  );
}
