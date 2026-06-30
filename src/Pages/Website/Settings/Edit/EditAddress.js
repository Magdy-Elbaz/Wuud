import { useState } from "react";
import { Form } from "react-bootstrap";
import BtnSubmit from "../../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";
import { useToast } from "../../../../Context/Toast Notification/ToastNotification";
import { useTheme } from "../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function EditAddress({ setOpen, setRender, user }) {
  const [forms, setForms] = useState({
    country: user.country,
    city: user.city,
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
      await Axios.put(`${USER}/update-location`, forms);
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
    <div className="w-100 h-100 position-absolute edit d-flex align-items-center justify-content-center">
      <div
        className="position-absolute click-Close cursor-pointer"
        onClick={() => setOpen("")}
      />
      <div
        className={`${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-4 w-50 p-2`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0 fw-bold fs-5">{t('Edit Your Address')}</p>
          <button
            className={`btn btn-close ${theme === "dark" && "bg-light"}`}
            onClick={() => setOpen("")}
          />
        </div>
        <Form className="my-3" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <Form.Group className="w-50">
              <Form.Label htmlFor="country" className="fw-bold text-secondary">
                {t('Country')} :
              </Form.Label>
              <Form.Control
                id="country"
                value={forms.country}
                onChange={handleChange}
                placeholder={t("Enter Your Country")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
                required
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label htmlFor="city" className="fw-bold text-secondary">
                {t('City/Stret')} :
              </Form.Label>
              <Form.Control
                id="city"
                value={forms.city}
                onChange={handleChange}
                placeholder={t("Enter Your City/Stret")}
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
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
