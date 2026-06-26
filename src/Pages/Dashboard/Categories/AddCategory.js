import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ADD, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Form } from "react-bootstrap";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function AddCategory() {
  // Category
  const [category, setCategory] = useState({
    title: "",
    image: "",
  });
  const theme = useTheme();
  const { t } = useTranslation();

  // loding
  const [loding, setLoding] = useState(false);
  const nav = useNavigate();

  // ref
  const inputOne = useRef(null);

  async function Submit(e) {
    e.preventDefault();
    setLoding(true);
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("image", category.image);
    try {
      await Axios.post(`${CATEGORY}/${ADD}`, formData);
      nav("/dashboard/categories");
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
          {t("Add Catigory Page")} <FontAwesomeIcon icon={faBoxOpen} />
        </h2>
        <Form onSubmit={Submit} className="form-dashboard">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t('Title')} :</Form.Label>
            <Form.Control
              type="text"
              value={category.title}
              onChange={(e) =>
                setCategory({ ...category, title: e.target.value })
              }
              placeholder={t("Enter Title")}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              ref={inputOne}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>{t('Category Image')} :</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) =>
                setCategory({ ...category, image: e.target.files.item(0) })
              }
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            />
          </Form.Group>
          <BtnSubmit
            loding={loding}
            name={t("Add")}
            disabled={
              category.title.length > 0 && category.image ? false : true
            }
          />
        </Form>
      </div>
    </>
  );
}
