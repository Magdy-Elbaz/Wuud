import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { EDIT, USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Components/Loding/Loding";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";

export default function UpdateUser() {
  // User
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  // Id User
  const { id } = useParams();
  // disabled button submit
  const [disabled, setDisabled] = useState(true);
  // loding
  const [loding, setLoding] = useState(true);
  const [save, setSave] = useState(false);
  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setSave(true);
    try {
      await Axios.post(`${USER}/${EDIT}/${id}`, {
        name: user.name,
        email: user.email,
        role: user.role,
      });
      nav("/dashboard/users");
    } catch (err) {
      setSave(false);
      console.log(err);
    }
  }

  useEffect(() => {
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setUser({
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        });
        setLoding(false);
      })
      .catch(() => {
        setLoding(true);
        nav("/dashboard/page/404", { replace: true });
      });
  }, []);

  useEffect(() => {
    if (user.name.length < 3 || user.email === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        {loding && <Loding />}
      </div>
      <div className="p-2">
        <h2 className="title-page text-secondary">
          Edit User <FontAwesomeIcon icon={faUserPen} />
        </h2>
        <Form onSubmit={Submit} className="form-dashboard">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter Name ..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email ..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
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
          <BtnSubmit loding={save} name="Save" disabled={disabled} />
        </Form>
      </div>
    </>
  );
}
