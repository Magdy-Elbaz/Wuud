import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  // states
  const [form, setForm] = useState({ email: "", password: "" });
  const [loding, setLoding] = useState(false);
  const [iconEye, setIconEye] = useState(false);
  const { addToast } = useToast();
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 7);
  const { t, i18n } = useTranslation();

  // ref
  const inputOne = useRef(null);

  //   Handle Change Form
  function handleChangeForm(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  // Cookie
  const cookie = Cookie();

  //   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      const token = res.data.token;
      cookie.set("Bearer", token, {
        path: "/",
        expires: expiresDate,
      });
      setLoding(false);
      window.location.pathname = "/";
    } catch (err) {
      setLoding(false);
      if (err.response.status === 401) {
        addToast("Wrong Email Or Password", "error");
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
    <div
      className="h-100vh d-flex align-items-center justify-content-center"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="form overflow-hidden">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src={require(`../../../Assets/logo-nav.png`)}
            alt=""
            data-aos="fade-down"
          />
          <h2 className="text-dark fw-bold" data-aos="fade-right">
            {t("Welcome Back")} 👋
          </h2>
          <p className="text-dark" data-aos="fade-left">
            {t("Sign in to Continue")}
          </p>
        </div>
        <Form className="mt-2" onSubmit={handleSubmit}>
          <Form.Group
            className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
            data-aos="fade-left"
          >
            <Form.Control
              id="email"
              value={form.email}
              onChange={handleChangeForm}
              type="email"
              placeholder={t("Enter Your Email")}
              ref={inputOne}
              autoComplete="email"
              dir="ltr"
              required
            />
            <Form.Label htmlFor="email">{t("Email")} :</Form.Label>
          </Form.Group>
          <Form.Group
            className={`form-custom ${i18n.language === "ar" && "ar"}`}
            data-aos="fade-left"
          >
            <div className="position-relative d-flex align-items-center">
              <Form.Control
                id="password"
                value={form.password}
                onChange={handleChangeForm}
                type={iconEye ? "text" : "password"}
                placeholder={t("Enter Your Password")}
                autoComplete="current-password"
                minLength={8}
                className="mb-2"
                required
              />
              <Form.Label htmlFor="password">{t("Password")} :</Form.Label>
              <FontAwesomeIcon
                icon={!iconEye ? faEyeSlash : faEye}
                className={`icon-eye ${i18n.language === "ar" ? "ar" : "en"}`}
                onClick={() => setIconEye((prev) => !prev)}
              />
            </div>
          </Form.Group>
          <BtnSubmit
            loding={loding}
            name={t("Login")}
            width={"150px"}
            className="btn-Auth btn-primary"
            disabled={form.email === "" || form.password.length < 8}
          />
          <a
            href={`http://127.0.0.1:8000/login-google`}
            className="google-btn d-flex align-items-center d-block"
            data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
          >
            <div className="google-icon-wrapper d-flex align-items-center justify-content-center h-100 bg-white">
              <img
                className="google-icon"
                src={require(`../../../Assets/icon-google.png`)}
                alt=""
              />
            </div>
            <p className="btnGoogle-text text-nowrap mx-2 my-0">
              <b>{t("Sign in with google")}</b>
            </p>
          </a>
          <div className="d-flex align-items-center gap-2 mt-2">
            <p
              className="m-0 text-dark"
              data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
            >
              {t("Don't have an account?")}
            </p>
            <Link
              to="/register"
              className="text-white text-decoration-none"
              data-aos={i18n.language === "ar" ? "fade-right" : "fade-left"}
            >
              {t("Register now")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
