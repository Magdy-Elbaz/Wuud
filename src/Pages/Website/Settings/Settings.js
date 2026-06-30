import TopProfile from "../../../Components/Website/TopProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faGear,
  faLanguage,
  faPalette,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../Context/UserContext";
import EditAvatar from "./Edit/EditAvatar";
import { useContext, useEffect, useState } from "react";
import EditInformation from "./Edit/EditInformation";
import EditAddress from "./Edit/EditAddress";
import { Form } from "react-bootstrap";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";
import { useTheme } from "../../../Context/ThemeContext";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "./settings.css";

export default function Settings(props) {
  const { user, setRender } = useUser();
  const [open, setOpen] = useState("");
  const theme = useTheme();
  const [themes, setThemes] = useState(theme || "light");
  const long = localStorage.getItem("i18nextLng");
  const { t, i18n } = useTranslation();
  const [language, setlanguage] = useState({
    value: long || "en",
    label: long === "ar" ? "عربي" : "English",
  });
  const { isChange, setIsChange } = useContext(ChangeAlContext);

  const options = [
    { value: "en", label: t("English") },
    { value: "ar", label: t("Arabic") },
  ];

  useEffect(() => {
    window.localStorage.setItem("theme", themes);
    setIsChange((prev) => !prev);
  }, [themes]);

  useEffect(() => {
    const language = localStorage.getItem("i18nextLng");
    if (language) {
      i18n.changeLanguage(language);
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [isChange]);

  const handleChangeLanguage = (selectedOption) => {
    const shortLang = selectedOption.value;
    i18n.changeLanguage(shortLang);
    setlanguage(selectedOption);
    localStorage.setItem("i18nextLng", shortLang);
    setIsChange((prev) => !prev);
  };

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center gap-1">
        <h1
          className={`fw-bold m-2 ${i18n.language === "en" ? "ms-4 me-0" : "ms-0 me-4"}`}
        >
          {t("Settings")}
        </h1>
        <FontAwesomeIcon icon={faGear} className="fs-5 mt-2" />
      </div>
      <div className="d-flex flex-wrap">
        <div className="my-4 px-4 col-12 col-lg-6">
          {open === "avatar" && (
            <EditAvatar
              setOpen={setOpen}
              avatar={user.avatar}
              setRender={setRender}
            />
          )}
          {open === "information" && (
            <EditInformation
              setOpen={setOpen}
              setRender={setRender}
              user={user}
            />
          )}
          {open === "address" && (
            <EditAddress setOpen={setOpen} setRender={setRender} user={user} />
          )}
          <div className="d-flex align-items-center justify-content-center gap-1">
            <h4 className="fw-bold">{t("My Profile")}</h4>
            <FontAwesomeIcon icon={faAddressCard} className="fs-4" />
          </div>
          <div
            className={`d-flex align-items-center justify-content-between flex-grow-1 ${theme === "light" ? "bg-white" : "bg-dark-card"} shadow overflow-hidden px-3 py-2 rounded-4 my-4`}
          >
            <TopProfile settings={true} />
            {user.length !== 0 && (
              <button
                className="btn btn-light d-flex align-items-center gap-2"
                onClick={() => setOpen("avatar")}
                data-aos="fade-up"
              >
                <FontAwesomeIcon icon={faPenToSquare} /> {t("Edit")}
              </button>
            )}
          </div>
          <div
            className={`flex-grow-1 ${theme === "light" ? "bg-white" : "bg-dark-card"} shadow overflow-hidden px-3 py-3 rounded-4`}
          >
            <div className="d-flex mb-3 mb-md-0 align-items-center justify-content-between">
              <p className="fw-bold m-0">{t("personal information")}</p>
              {user.length !== 0 && (
                <button
                  className="btn btn-light d-flex align-items-center gap-2"
                  onClick={() => setOpen("information")}
                  data-aos="fade-up"
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> {t("Edit")}
                </button>
              )}
            </div>
            <div className="mt-2 col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between">
                <div data-aos="fade-left">
                  <p className="m-0">{t("First Name")}</p>
                  <p className="fw-bold m-0">{user.first_name || "-"}</p>
                </div>
                <div data-aos="fade-right">
                  <p className="m-0 text-center">{t("Last Name")}</p>
                  <p className="fw-bold m-0">{user.last_name || "-"}</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                <div data-aos="fade-right">
                  <p className="m-0">{t("Email")}</p>
                  <p className="fw-bold m-0">{user.email || "-"}</p>
                </div>
                <div data-aos="fade-up">
                  <p className="m-0">{t("Phone")}</p>
                  <p className="fw-bold m-0">
                    {user.phone ? "+" + user.phone : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex-grow-1 ${theme === "light" ? "bg-white" : "bg-dark-card"} shadow px-3 py-3 overflow-hidden rounded-4 my-4 mb-0 mb-md-4`}
          >
            <div className="d-flex mb-3 mb-md-0 align-items-center justify-content-between">
              <p className="fw-bold m-0">{t("Address")}</p>
              {user.length !== 0 && (
                <button
                  className="btn btn-light d-flex align-items-center gap-2"
                  onClick={() => setOpen("address")}
                  data-aos="fade-up"
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> {t("Edit")}
                </button>
              )}
            </div>
            <div className="mt-2 col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between">
                <div data-aos="fade-right">
                  <p className="m-0">{t("Country")}</p>
                  <p className="fw-bold m-0">{t(user.country || "-")}</p>
                </div>
                <div data-aos="fade-up">
                  <p className="m-0">{t("City/Stret")}</p>
                  <p className="fw-bold m-0">{user.city || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 px-4 col-12 col-lg-6">
          <div>
            <div className="d-flex align-items-center justify-content-center my-2 gap-1">
              <h4 className="fw-bold">{t("Language")}</h4>
              <FontAwesomeIcon icon={faLanguage} />
            </div>
            <Select
              options={options}
              isSearchable={false}
              value={language}
              onChange={handleChangeLanguage}
              defaultValue={options[0]}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"} w-100`}
            />
          </div>
          <div className="mt-3 overflow-hidden">
            <div className="d-flex align-items-center justify-content-center my-2 gap-1">
              <h4 className="fw-bold">{t("Theme")}</h4>
              <FontAwesomeIcon icon={faPalette} />
            </div>
            <Form>
              <div
                className="radio_dark p-3 px-5 rounded-4 shadow text-center d-flex align-items-center justify-content-between mb-3"
                data-aos="fade-left"
              >
                <p className="text-white m-0">{t("Dark Mode")}</p>
                <Form.Check
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={themes === "dark"}
                  onChange={(e) => setThemes(e.target.value)}
                />
              </div>
              <div
                className="radio_light p-3 px-5 rounded-4 shadow d-flex align-items-center justify-content-between"
                data-aos="fade-left"
              >
                <p className="text-white m-0">{t("Light Mode")}</p>
                <Form.Check
                  type="radio"
                  name="theme"
                  value="light"
                  checked={themes === "light"}
                  onChange={(e) => setThemes(e.target.value)}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
