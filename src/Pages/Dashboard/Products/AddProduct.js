import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ADD, CATEGORIES, EDIT, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Button, Form } from "react-bootstrap";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import Loding from "../../../Components/Loding/Loding";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function AddProduct() {
  const { t, i18n } = useTranslation();
  // Form state
  const [form, setForm] = useState({
    category: t("Select Category"),
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: 0,
  });

  // Image Form
  const [images, setImages] = useState([]);
  const [saveImage, setSaveImage] = useState(false);
  const theme = useTheme();

  const dummyForm = {
    category: null,
    title: "title",
    description: "description",
    price: 0,
    discount: 0,
    About: "about",
    stock: 0,
  };

  // Global State
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();
  const [logingDelet, setLogingDelet] = useState(false);

  // loding
  const [loding, setLoding] = useState(false);
  const nav = useNavigate();

  // ref
  const inputOne = useRef(null);
  const openImage = useRef(null);
  const progressRef = useRef([]);
  const renderImage = useRef(-1);
  const lodingImg = useRef([]);
  const ids = useRef([]);
  const [keyImageDelet, setKeyImageDelet] = useState(0);

  // Handle Focus
  useEffect(() => {
    inputOne.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  async function handledummyForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/${ADD}`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Change

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (!sent) {
      handledummyForm();
    }
  }

  // Handle Edit
  async function handleEdit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      await Axios.post(`${PRODUCT}/${EDIT}/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoding(false);
      console.log(err);
    }
  }

  async function handleImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    setSaveImage(true);
    const imagesFolder = e.target.files;
    const imageData = new FormData();
    for (let i = 0; i < imagesFolder.length; i++) {
      renderImage.current++;
      imageData.append("image", imagesFolder[i]);
      imageData.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/${ADD}`, imageData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progressRef.current[renderImage.current].style.width =
                `${percent}%`;
              progressRef.current[renderImage.current].setAttribute(
                "percent",
                `${percent}%`,
              );
              lodingImg.current[renderImage.current].style.bottom =
                `-${percent}%`;
            }
          },
        });
        ids.current[renderImage.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
    e.target.value = "";
    setSaveImage(false);
  }

  // Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err.response));
  }, []);

  async function handleDeleteImg(key, img) {
    const idImage = ids.current[key];
    setKeyImageDelet(key);
    setLogingDelet(true);
    try {
      await Axios.delete(`product-img/${idImage}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== idImage);
      renderImage.current--;
    } catch (err) {
      console.log(err);
    } finally {
      setLogingDelet(false);
    }
  }

  // Mapping

  const categoryShow = categories.map((cat, index) => (
    <option key={index} value={cat.id}>
      {cat.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div className="border w-100 p-2 px-4" key={key}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <div className="img-product">
            <img
              src={URL.createObjectURL(img)}
              className="w-100 h-100"
              alt=""
            />
            <div
              className="loding-img"
              ref={(e) => (lodingImg.current[key] = e)}
            ></div>
          </div>
          <div>
            <p className="m-0">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + " KB"
                : (img.size / (1024 * 1024)).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
        <div style={{ width: "72px" }}>
          <Button
            onClick={() => handleDeleteImg(key, img)}
            variant="danger"
            className="w-100"
          >
            {logingDelet && keyImageDelet === key ? (
              <Loding action={true} color="#fff" />
            ) : (
              t("Delete")
            )}
          </Button>
        </div>
      </div>
      <div className="custom-progress mt-2">
        <span
          className={`inner-progress ${i18n.language === "ar" ? "ar" : "en"} bg-primary h-100`}
          percent="0%"
          ref={(e) => (progressRef.current[key] = e)}
        ></span>
      </div>
    </div>
  ));

  return (
    <div className="p-2">
      <h2 className="title-page text-secondary">
        {t("Add Product Page")} <FontAwesomeIcon icon={faSquarePlus} />
      </h2>
      <Form onSubmit={handleEdit} className="form-dashboard form-product">
        <Form.Group className="mb-3" controlId="categore">
          <Form.Label>{t("Category")} :</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            ref={inputOne}
          >
            <option disabled>{t("Select Category")}</option>
            {categoryShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>{t("Title")} :</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder={t("Enter Title")}
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>{t("Description")} :</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t("Enter Description")}
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            required
            disabled={!sent}
          />
        </Form.Group>
        <div className="d-flex align-content-center gap-3">
          <Form.Group className="mb-3 w-50" controlId="price">
            <Form.Label>{t("Price")} :</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder={t("Enter Price")}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-50" controlId="discount">
            <Form.Label>{t("Discount")} :</Form.Label>
            <Form.Control
              type="text"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder={t("Enter Discount")}
              className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
              required
              disabled={!sent}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>{t("About")} :</Form.Label>
          <Form.Control
            type="text"
            name="About"
            value={form.About}
            onChange={handleChange}
            placeholder={t("Enter About")}
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>{t("Stock")} :</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className={`${theme === "light" ? "bg-light-card" : "bg-dark-card placeholder-light text-light"}`}
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>{t("Product Images")} :</Form.Label>
          <Form.Control
            hidden
            multiple
            type="file"
            onChange={handleImageChange}
            ref={openImage}
            disabled={!sent}
          />
        </Form.Group>
        <div
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 flex-column w-100 "
          style={{
            border: `2px dashed ${sent ? "#e1b070" : "gray"}`,
            cursor: sent && "pointer",
          }}
          onClick={handleOpenImage}
        >
          <img
            src={require(`../../../Assets/upload.png`)}
            alt="upload Here"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className={`fw-bold ${sent && "text-primary"}`}
            style={{ color: !sent && "gray" }}
          >
            {t("Upload Images")}
          </p>
        </div>
        <div
          className="d-flex align-items-start flex-column gap-3 my-4"
          style={{ maxHeight: "510px", overflow: "auto" }}
        >
          {imagesShow}
        </div>
        <BtnSubmit
          loding={loding}
          name={t("Add")}
          disabled={
            form.title.length <= 3 ||
            form.description === "" ||
            form.price === "" ||
            form.discount === "" ||
            form.About === "" ||
            saveImage === true
          }
        />
      </Form>
    </div>
  );
}
