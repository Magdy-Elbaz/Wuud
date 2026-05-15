import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../helpers/StringSlice";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { useUser } from "../../Context/UserContext";

export default function TopProfile(props) {
  const openImage = useRef(null);

  function handleEditAvatar() {
    openImage.current.click();
  }

  const {user} = useUser()

  return (
    <div className="w-100">
      <div className="d-flex align-items-center gap-2">
        <div
          className={`position-relative ${props.editUser && "cursor-pointer"}`}
          onClick={props.editUser && handleEditAvatar}
        >
          {user.length === 0 ? (
            <img
              src={require(`../../Assets/user-icon.png`)}
              className="icon-user"
              alt=""
            />
          ) : (
            <img
              src={!props.image ? user.avatar : props.image}
              className="icon-user rounded-circle"
              alt=""
            />
          )}
          {props.editUser && (
            <FontAwesomeIcon
              icon={faPen}
              className="position-absolute"
              style={{
                bottom: "0",
                right: "-5px",
              }}
            />
          )}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center gap-2">
              <h5 className="m-0">
                {StringSlice(user.name || "User Name", 8)}
              </h5>
              <span className="condition bg-primary text-light">
                {props.role}
              </span>
            </div>
            <button
              className={`btn ${props.editUser ? "fs-4 fw-bold p-0" : "btn-close"}`}
              onClick={() => props.setOpenProfile(false)}
            >
              {props.editUser && ">"}
            </button>
          </div>
          <p className="m-0">{StringSlice(user.email || "Email", 20)}</p>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="image">
        <Form.Control
          hidden
          multiple
          type="file"
          onChange={(e) => props.setImage(e.target.files[0])}
          ref={openImage}
        />
      </Form.Group>
    </div>
  );
}
