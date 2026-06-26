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
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function UpdateUser() {
  // User
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    city: "",
    role: "",
    password: "",
  });
  // loding
  const [loding, setLoding] = useState(false);
  const nav = useNavigate();
  const [iconEye, setIconEye] = useState(false);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  // ref
  const inputOne = useRef(null);

  async function Submit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await Axios.post(`${USER}/${ADD}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        country: user.country,
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
        <h2 className="title-page text-secondary mt-2">
          {t("Add User Page")} <FontAwesomeIcon icon={faUserPlus} />
        </h2>
        <Form onSubmit={Submit} className="form-dashboard">
          <div className="d-flex align-items-center gap-3">
            <Form.Group className="mb-2 w-50" controlId="first_name">
              <Form.Label>{t("First Name")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
                placeholder={t("Enter First Name")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
                ref={inputOne}
              />
            </Form.Group>
            <Form.Group className="mb-2 w-50" controlId="last_name">
              <Form.Label>{t("Last Name")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
                placeholder={t("Enter Last Name")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
                ref={inputOne}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-2" controlId="Email">
            <Form.Label>{t("Email")} :</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder={t("Enter Email")}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              dir="ltr"
            />
          </Form.Group>
          <div className="d-flex align-items-center gap-3">
            <Form.Group
              className="mb-2 col-12 col-lg-6"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>{t("Country")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                placeholder={t("Enter Country")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              />
            </Form.Group>
            <Form.Group
              className="mb-2 col-12 col-lg-6 ps-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>{t("City/Stret")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                placeholder={t("Enter City/Stret")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="password">{t("Password")} :</Form.Label>
            <div className="position-relative d-flex align-items-center">
              <Form.Control
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type={`${iconEye ? "text" : "password"}`}
                placeholder={t("Enter Password")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
                minLength={8}
                required
              />
              <FontAwesomeIcon
                icon={iconEye ? faEyeSlash : faEye}
                className={`icon-eye ${i18n.language === "ar" ? "ar" : "en"}`}
                onClick={() => setIconEye((prev) => !prev)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Role">
            <Form.Label>{t("Select Role")} :</Form.Label>
            <Form.Select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            >
              <option disabled value={""}>
                {t("Select Role")}
              </option>
              <option value="1995">{t("Admin")}</option>
              <option value="2001">{t("User")}</option>
              <option value="1999">{t("Product Manger")}</option>
            </Form.Select>
          </Form.Group>
          <BtnSubmit
            disabled={
              user.first_name.length >= 3 &&
              user.last_name.length >= 3 &&
              user.email &&
              user.password.length >= 6 &&
              user.role !== ""
                ? false
                : true
            }
            loding={loding}
            name={t("Add")}
          />
        </Form>
      </div>
    </>
  );
}
