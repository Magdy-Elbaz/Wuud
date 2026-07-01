import { useState } from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BtnSubmit from "../../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";
import { useToast } from "../../../../Context/Toast Notification/ToastNotification";
import { useTheme } from "../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function EditInformation({ setOpen, setRender, user }) {
  const [forms, setForms] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    email: user.email,
  });
  const [loding, setLoding] = useState(false);
  const { addToast } = useToast();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      await Axios.put(`${USER}/update-profile`, forms);
      setRender((prev) => !prev);
      addToast(t("Modified successfully"));
      setOpen("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="w-100 h-100vh position-fixed edit d-flex align-items-center justify-content-center">
      <div
        className="position-absolute click-Close cursor-pointer"
        onClick={() => setOpen("")}
      />
      <div
        className={`${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-4 col-11 col-md-6 p-2`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0 fw-bold fs-5">{t('Edit Your information')}</p>
          <button
            className={`btn btn-close ${theme === "dark" && "bg-light"}`}
            onClick={() => setOpen("")}
          />
        </div>
        <Form className="my-3" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center gap-2">
            <Form.Group className="w-50">
              <Form.Label
                htmlFor="first_name"
                className="fw-bold text-secondary"
              >
                {t("First Name")} :
              </Form.Label>
              <Form.Control
                id="first_name"
                value={forms.first_name}
                onChange={handleChange}
                placeholder={t('Enter Your First Name')}
                className={`${theme === "light" ? "bg-light-card shadow" : "bg-dark-card placeholder-light shadow-light text-light"}`}
                required
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label
                htmlFor="last_name"
                className="fw-bold text-secondary"
              >
                {t('Last Name')} :
              </Form.Label>
              <Form.Control
                id="last_name"
                value={forms.last_name}
                onChange={handleChange}
                placeholder={t('Enter Your Last Name')}
                className={`${theme === "light" ? "bg-light-card shadow" : "bg-dark-card placeholder-light shadow-light text-light"}`}
                required
              />
            </Form.Group>
          </div>
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="mt-2 w-50">
              <label htmlFor="phone" className="fw-bold text-secondary mb-2">
                {t('Phone')} :
              </label>
              <PhoneInput
                id="phone"
                country={"eg"}
                value={forms.phone}
                onChange={(phoneValue) =>
                  setForms({ ...forms, phone: phoneValue })
                }
                inputStyle={{ width: "100%" }}
                className={`${theme === "light" ? "bg-light-card shadow" : "bg-dark-card text-light shadow-light"}`}
                required
              />
            </div>
            <Form.Group className="w-50 mt-2">
              <Form.Label htmlFor="email" className="fw-bold text-secondary">
                {t('Email')} :
              </Form.Label>
              <Form.Control
                id="email"
                value={forms.email}
                onChange={handleChange}
                placeholder={t('Enter Your Email')}
                className={`${theme === "light" ? "bg-light-card shadow" : "bg-dark-card placeholder-light text-light shadow-light"}`}
                required
              />
            </Form.Group>
          </div>
          <BtnSubmit name={t("Save")} loding={loding} />
        </Form>
      </div>
    </div>
  );
}
