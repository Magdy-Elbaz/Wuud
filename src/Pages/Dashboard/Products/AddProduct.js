import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ADD, CATEGORIES, EDIT, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Button, Form } from "react-bootstrap";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import Loding from "../../../Components/Loding/Loding";

export default function AddProduct() {
  // Form state
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: 0,
  });

  // Image Form
  const [images, setImages] = useState([]);

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
  }

  // Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err.response));
  }, []);

  async function handleDeleteImg(key, img) {
    const idImage = ids.current[key];
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
          <Button onClick={() => handleDeleteImg(key, img)} variant="danger" className="w-100">
            {logingDelet ? <Loding action={true} color="#fff" /> : "Delete"}
          </Button>
        </div>
      </div>
      <div className="custom-progress mt-2">
        <span
          className="inner-progress bg-primary h-100"
          percent="0%"
          ref={(e) => (progressRef.current[key] = e)}
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      <div className="p-2">
        <h2 className="title-page text-secondary">
          Add Product <FontAwesomeIcon icon={faSquarePlus} />
        </h2>
        <Form onSubmit={handleEdit} className="form-dashboard form-product">
          <Form.Group className="mb-3" controlId="categore">
            <Form.Label>Category :</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              ref={inputOne}
            >
              <option disabled>Select Category</option>
              {categoryShow}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Title ..."
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter Description ..."
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price :</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Price ..."
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discount">
            <Form.Label>Discount :</Form.Label>
            <Form.Control
              type="text"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Enter Discount ..."
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="about">
            <Form.Label>About :</Form.Label>
            <Form.Control
              type="text"
              name="About"
              value={form.About}
              onChange={handleChange}
              placeholder="Enter About ..."
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock :</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Images :</Form.Label>
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
              Upload Images
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
            name="Add"
            disabled={
              form.title.length <= 3 ||
              form.description === "" ||
              form.price === "" ||
              form.discount === "" ||
              form.About === ""
            }
          />
        </Form>
      </div>
    </>
  );
}
