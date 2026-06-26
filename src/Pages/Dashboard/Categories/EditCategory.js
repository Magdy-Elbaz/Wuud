import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CATEGORY, EDIT } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Components/Loding/Loding";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function EditCategory() {
  // category
  const [category, setCategory] = useState({ title: "", image: "" });
  // Id category
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
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("image", category.image);
    try {
      await Axios.post(`${CATEGORY}/${EDIT}/${id}`, formData);
      nav("/dashboard/categories");
    } catch (err) {
      setSave(false);
      console.log(err);
    }
  }

  useEffect(() => {
    Axios.get(`/${CATEGORY}/${id}`)
      .then((data) => {
        setCategory({
          title: data.data.title,
        });
        setLoding(false);
      })
      .catch(() => {
        setLoding(true);
        nav("/dashboard/page/404", { replace: true });
      });
  }, []);

  useEffect(() => {
    if (category.title.length === 0 || category.image === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [category]);

  return (
    <>
      {loding ? (
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <Loding />
        </div>
      ) : (
        <div className="p-2">
          <h2 className="title-page text-secondary">
            {t('Category Editing Page')} <FontAwesomeIcon icon={faSquarePen} />
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
                className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
                placeholder={t("Enter Title")}
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
            <BtnSubmit loding={save} name={t("Save")} disabled={disabled} />
          </Form>
        </div>
      )}
    </>
  );
}
