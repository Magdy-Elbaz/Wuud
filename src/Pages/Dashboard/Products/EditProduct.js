import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, CATEGORIES, EDIT, PRODUCT } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Components/Loding/Loding";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
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
  const [imagesServer, setImagesServer] = useState([]);

  // Global State
  const [categories, setCategories] = useState([]);
  const [loding, setLoding] = useState(true);
  const [save, setSave] = useState(false);
  const [idImgServe, setIdImgServe] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleEdit(e) {
    e.preventDefault();
    setSave(true);
    try {
      await Axios.post(`${PRODUCT}/${EDIT}/${id}`, form);
      for (let i = 0; i < idImgServe.length; i++) {
        await Axios.delete(`product-img/${idImgServe[i]}`);
      }
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenImage() {
    openImage.current.click();
  }

  // ref
  const inputOne = useRef(null);
  const openImage = useRef(null);
  const progressRef = useRef([]);
  const renderImage = useRef(-1);
  const lodingImg = useRef([]);
  const ids = useRef([]);

  // Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesServer(data.data[0].images);
        setLoding(false);
      })
      .catch(() => {
        setLoding(true);
        nav("/dashboard/page/404", { replace: true });
      });
  }, []);

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

  async function handleDeleteImg(key, img) {
    const idImage = ids.current[key];
    try {
      await Axios.delete(`product-img/${idImage}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== idImage);
      renderImage.current--;
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteImgServer(id) {
    setImagesServer((prev) => prev.filter((img) => img.id !== id));
    setIdImgServe((prev) => [...prev, id]);
  }

  // Mapping
  const categoryShow = categories.map((cat, key) => (
    <option key={key} value={cat.id}>
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
        <Button onClick={() => handleDeleteImg(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          className="inner-progress"
          percent="0%"
          ref={(e) => (progressRef.current[key] = e)}
        ></span>
      </div>
    </div>
  ));
  const imagesServerShow = imagesServer.map((img, key) => (
    <div
      className="d-flex align-items-center justify-content-between position-relative"
      key={key}
      style={{ width: "170px", height: "150px" }}
    >
      <img
        src={img.image}
        className="w-100 h-100"
        style={{ borderRadius: "10px" }}
        alt=""
      />
      <Button
        onClick={() => handleDeleteImgServer(img.id)}
        className="position-absolute p-0"
        style={{ top: "5px", right: "5px", width: "25px", height: "25px" }}
        variant="danger"
      >
        X
      </Button>
    </div>
  ));

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        {loding && <Loding />}
      </div>
      <div className="p-2">
        <h2 className="title-page text-secondary">
          Edit Product <FontAwesomeIcon icon={faPenToSquare} />
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock :</Form.Label>
            <Form.Control
              type="text"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
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
            />
          </Form.Group>
          <div
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 flex-column w-100 "
            style={{
              border: "2px dashed #e1b070",
              cursor: "pointer",
            }}
            onClick={handleOpenImage}
          >
            <img
              src={require(`../../../Assets/upload.png`)}
              alt=""
              width="100px"
            />
            <p className="fw-bold text-primary">Upload Images</p>
          </div>
          <div
            style={{ maxHeight: "510px", overflow: "auto" }}
            className="my-4"
          >
            <div className="d-flex align-items-center flex-wrap gap-3 my-2">
              {imagesServerShow}
            </div>
            <div className="d-flex align-items-start flex-column gap-3">
              {imagesShow}
            </div>
          </div>
          <BtnSubmit
            loding={save}
            name="Save"
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
