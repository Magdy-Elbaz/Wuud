import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, REGISTER } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { Link } from "react-router-dom";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

export default function Register() {
  // states
  const [forms, setForms] = useState({
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loding, setLoding] = useState(false);
  const [iconEye1, setIconEye1] = useState(false);
  const [iconEye2, setIconEye2] = useState(false);
  const { addToast } = useToast();
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 7);
  const { t, i18n } = useTranslation();

  // ref
  const inputOne = useRef(null);

  //   Handle Change Form
  function handleChangeForm(e) {
    setForms({ ...forms, [e.target.id]: e.target.value });
  }

  const handleChangePassConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value !== forms.password) {
      e.target.setCustomValidity("كلمات السر غير متطابقة!");
    } else {
      e.target.setCustomValidity("");
    }
  };

  // Cookie
  const cookie = Cookie();

  //   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, forms);
      const token = res.data.token;
      cookie.set("Bearer", token, {
        path: "/",
        expires: expiresDate,
      });
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
    <div
      className="d-flex align-items-center justify-content-center h-100vh"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Form className="form my-5 overflow-hidden" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src={require(`../../../Assets/logo-nav.png`)}
            alt=""
            data-aos="fade-down"
          />
          <h3 className="text-dark fw-bold" data-aos="fade-right">
            {t("Welcome to our community")} 👋
          </h3>
          <p className="text-dark text-center m-0" data-aos="fade-left">
            {t("Create your new account to access your home furniture.")}
          </p>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center gap-2">
            <Form.Group
              className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
            >
              <Form.Control
                id="first_name"
                value={forms.first_name}
                onChange={handleChangeForm}
                type="text"
                placeholder={t("Enter Your First Name")}
                autoComplete="name"
                ref={inputOne}
                required
              />
              <Form.Label htmlFor="first_name">{t("First Name")} :</Form.Label>
            </Form.Group>
            <Form.Group
              className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
            >
              <Form.Control
                id="last_name"
                value={forms.last_name}
                onChange={handleChangeForm}
                type="text"
                placeholder={t("Enter Your Last Name")}
                required
              />
              <Form.Label htmlFor="last_name">{t("Last Name")} :</Form.Label>
            </Form.Group>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Form.Group
              className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
            >
              <Form.Control
                id="country"
                value={forms.country}
                onChange={handleChangeForm}
                type="text"
                placeholder={t("Enter Your Country")}
                required
              />
              <Form.Label htmlFor="country">{t("Country")} :</Form.Label>
            </Form.Group>
            <Form.Group
              className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
            >
              <Form.Control
                id="city"
                value={forms.city}
                onChange={handleChangeForm}
                type="text"
                placeholder={t("Enter Your City/Stret")}
                required
              />
              <Form.Label htmlFor="city">{t("City/Stret")} :</Form.Label>
            </Form.Group>
          </div>
          <div
            className={`form-custom position-relative mb-4 ${i18n.language === "ar" && "ar"}`}
            dir="ltr"
          >
            <PhoneInput
              country={"eg"}
              value={forms.phone}
              onChange={(phoneValue) =>
                setForms({ ...forms, phone: phoneValue })
              }
              inputStyle={{ width: "100%" }}
              required
            />
            <label dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {t("Phone")} :
            </label>
          </div>
          <Form.Group
            className={`form-custom position-relative ${i18n.language === "ar" && "ar"}`}
          >
            <Form.Control
              id="email"
              value={forms.email}
              onChange={handleChangeForm}
              type="email"
              placeholder={t('"Enter Your Email"')}
              autoComplete="email"
              dir="ltr"
              required
            />
            <Form.Label htmlFor="email">{t("Email")} :</Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-center flex-column gap-4 my-2">
            <Form.Group
              className={`form-custom ${i18n.language === "ar" && "ar"}`}
            >
              <div className="position-relative d-flex align-items-center">
                <Form.Control
                  id="password"
                  value={forms.password}
                  onChange={handleChangeForm}
                  type={iconEye1 ? "text" : "password"}
                  placeholder={t("Enter Your Password")}
                  autoComplete="current-password"
                  minLength={8}
                  className="mb-0 w-100"
                  required
                />
                <Form.Label htmlFor="password">{t("Password")} :</Form.Label>
                <FontAwesomeIcon
                  icon={!iconEye1 ? faEyeSlash : faEye}
                  className={`icon-eye ${i18n.language === "ar" && "ar"}`}
                  onClick={() => setIconEye1((prev) => !prev)}
                />
              </div>
            </Form.Group>
            <Form.Group
              className={`form-custom ${i18n.language === "ar" ? "ar" : "en"}`}
            >
              <div className="position-relative d-flex align-items-center">
                <Form.Control
                  id="password_confirmation"
                  value={passwordConfirm}
                  onChange={handleChangePassConfirm}
                  type={iconEye2 ? "text" : "password"}
                  placeholder={t("Password Confirmation")}
                  autoComplete="current-password"
                  className="mb-0 w-100"
                />
                <Form.Label htmlFor="password_confirmation">
                  {t("Password Confirmation")} :
                </Form.Label>
                <FontAwesomeIcon
                  icon={!iconEye2 ? faEyeSlash : faEye}
                  className={`icon-eye ${i18n.language === "ar" ? "ar" : "en"}`}
                  onClick={() => setIconEye2((prev) => !prev)}
                />
              </div>
            </Form.Group>
          </div>
          <BtnSubmit
            loding={loding}
            name={t("Register")}
            width="150px"
            className="btn-Auth btn-primary"
            disabled={
              forms.first_name.length < 3 ||
              forms.last_name.length < 3 ||
              forms.phone === "" ||
              forms.city === "" ||
              forms.country === "" ||
              forms.password.length < 6 ||
              passwordConfirm !== forms.password
            }
          />
          <a
            href={`http://back-end-wuud-production.up.railway.app/login-google`}
            className="google-btn d-block d-flex align-items-center"
            data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
          >
            <div className="google-icon-wrapper bg-white h-100 d-flex align-items-center justify-content-center">
              <img
                className="google-icon"
                src={require(`../../../Assets/icon-google.png`)}
                alt=""
              />
            </div>
            <p className="btnGoogle-text mx-2 my-0">
              <b>{t("Sign in with google")}</b>
            </p>
          </a>
          <div className="d-flex align-items-center gap-2 mt-2">
            <p
              className="m-0 text-dark"
              data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
              data-aos-anchor-placement="top-bottom"
            >
              {t("Do you already have an account?")}
            </p>
            <Link
              to="/login"
              className="text-white text-decoration-none"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              {t("Login")}
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
