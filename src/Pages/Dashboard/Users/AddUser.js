import {
  faEye,
  faEyeSlash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";

export default function UpdateUser() {
  // User
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  // loding
  const [loding, setLoding] = useState(false);
  const nav = useNavigate();
  const [iconEye, setIconEye] = useState(false);

  // ref
  const inputOne = useRef(null);

  async function Submit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await Axios.post(`${USER}/${ADD}`, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      if (res.status === 200) {
        nav("/dashboard/users");
      }
    } catch (err) {
      setLoding(false);
      console.log(err);
    }
  }

  // Handle Focus
  useEffect(() => {
    inputOne.current.focus();
  }, []);

  return (
    <>
      <div className="p-2">
        <h2 className="title-page text-secondary">
          Add User <FontAwesomeIcon icon={faUserPlus} />
        </h2>
        <Form onSubmit={Submit} className="form-dashboard">
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter Name ..."
              ref={inputOne}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email ..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password :</Form.Label>
            <div className="position-relative d-flex align-items-center">
              <Form.Control
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type={`${iconEye ? "text" : "password"}`}
                placeholder="Enter Password ..."
                minLength={6}
                required
              />
              <FontAwesomeIcon
                icon={iconEye ? faEyeSlash : faEye}
                className="icon-eye-dashboard"
                onClick={() => setIconEye((prev) => !prev)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Role">
            <Form.Label>Select Role :</Form.Label>
            <Form.Select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option disabled value={""}>
                Select Role
              </option>
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="1999">Product Manger</option>
            </Form.Select>
          </Form.Group>
          <BtnSubmit
            disabled={
              user.name.length >= 3 &&
              user.email &&
              user.password.length >= 6 &&
              user.role !== ""
                ? false
                : true
            }
            loding={loding}
            name={"Add"}
          />
        </Form>
      </div>
    </>
  );
}
