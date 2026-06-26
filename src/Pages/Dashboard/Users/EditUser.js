import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { EDIT, USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Components/Loding/Loding";
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
  });
  // Id User
  const { id } = useParams();
  // disabled button submit
  const [disabled, setDisabled] = useState(true);
  // loding
  const [loding, setLoding] = useState(true);
  const [save, setSave] = useState(false);
  const nav = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  async function Submit(e) {
    e.preventDefault();
    setSave(true);
    try {
      await Axios.post(`${USER}/${EDIT}/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        country: user.country,
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
    setLoding(true);
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setUser({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          city: data.data.city,
          country: data.data.country,
          email: data.data.email,
          role: data.data.role,
        });
      })
      .catch(() => {
        setLoding(true);
        nav("/dashboard/page/404", { replace: true });
      })
      .finally(() => setLoding(false));
  }, []);

  useEffect(() => {
    if (
      user.first_name.length < 3 ||
      user.last_name.length < 3 ||
      user.email === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <>
      {loding && (
        <div
          style={{ position: "absolute", top: 0, left: 0 }}
          className="w-100 h-100"
        >
          <Loding />
        </div>
      )}
      <div className="p-2">
        <h2 className="title-page text-secondary my-2 mb-4">
          {t("User Editing Page")} <FontAwesomeIcon icon={faUserPen} />
        </h2>
        <Form onSubmit={Submit} className="form-dashboard">
          <div className="d-flex align-items-center gap-3">
            <Form.Group
              className="mb-3 col-12 col-lg-6"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>{t("First Name")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
                placeholder={t("Enter First Name")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-12 col-lg-6 ps-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>{t("Last Name")} :</Form.Label>
              <Form.Control
                type="text"
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
                placeholder={t("Enter Last Name")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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
              className="mb-3 col-12 col-lg-6"
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
              className="mb-3 col-12 col-lg-6 ps-3"
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
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
          <BtnSubmit loding={save} name={t("Save")} disabled={disabled} />
        </Form>
      </div>
    </>
  );
}
