import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, REGISTER } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { Link } from "react-router-dom";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";

export default function Register() {
  // states
  const [forms, setForms] = useState({ name: "", email: "", password: "" });
  const [loding, setLoding] = useState(false);
  const [iconEye, setIconEye] = useState(false);
  const { addToast } = useToast();

  // ref
  const inputOne = useRef(null);

  //   Handle Change Form
  function handleChangeForm(e) {
    setForms({ ...forms, [e.target.id]: e.target.value });
  }

  // Cookie
  const cookie = Cookie();

  //   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, forms);
      const token = res.data.token;
      cookie.set("Bearer", token);
      setLoding(false);
      window.location.pathname = "/";
    } catch (err) {
      setLoding(false);
      if (err.response.status === 422) {
        addToast(
          "The email address is already in use. Please login . ",
          "error",
        );
      } else {
        addToast("Internal Server Error", "error");
      }
    }
  }

  // Handle Focus
  useEffect(() => {
    inputOne.current.focus();
  }, []);

  return (
    <>
      <Container>
        <div className="row">
          <Form className="register form" onSubmit={handleSubmit}>
            <h1>Register Now</h1>
            <div className="custom-form">
              <Form.Group className="form-custom form-custom-register">
                <Form.Control
                  id="name"
                  value={forms.name}
                  onChange={handleChangeForm}
                  type="text"
                  placeholder="Enter Your Name ..."
                  autoComplete="name"
                  ref={inputOne}
                  required
                />
                <Form.Label htmlFor="name">Name :</Form.Label>
              </Form.Group>
              <Form.Group className="form-custom form-custom-register">
                <Form.Control
                  id="email"
                  value={forms.email}
                  onChange={handleChangeForm}
                  type="email"
                  placeholder="Enter Your Email ..."
                  autoComplete="email"
                  required
                />
                <Form.Label htmlFor="email">Email :</Form.Label>
              </Form.Group>
              <Form.Group className="form-custom form-custom-register">
                <div className="position-relative d-flex align-items-center">
                  <Form.Control
                    id="password"
                    value={forms.password}
                    onChange={handleChangeForm}
                    type={iconEye ? "text" : "password"}
                    placeholder="Enter Your Password ..."
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />
                  <Form.Label htmlFor="password">Password :</Form.Label>
                  <FontAwesomeIcon
                    icon={iconEye ? faEyeSlash : faEye}
                    className="icon-eye"
                    onClick={() => setIconEye((prev) => !prev)}
                  />
                </div>
              </Form.Group>
              <BtnSubmit
                loding={loding}
                name="Register"
                width="150px"
                className="btn-Auth btn-primary"
              />
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div className="google-btn">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src={require(`../../../Assets/icon-google.png`)}
                      alt=""
                    />
                  </div>
                  <p className="btnGoogle-text">
                    <b>Sign in with google</b>
                  </p>
                </div>
              </a>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="m-0">Do you already have an account?</p>
                <Link to="/login" className="text-primary">
                  Log in
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}
