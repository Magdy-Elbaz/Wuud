import { useContext, useEffect, useState } from "react";
import StringSlice from "../../../helpers/StringSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import SkeletonCart from "./SkeletonCart";
import { Button, Modal } from "react-bootstrap";
import PlusMinusBtn from "../../../Components/Btn/PlusMinusBtn";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import ShowProductsQuantity from "../../../Components/Website/ShowproductsQuantity";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../Api/Axios";
import { CheckoutApi } from "../../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function CartShop({ open, setOpen }) {
  const [Products, setProducts] = useState([]);
  const [lodingCheckOut, setLodingCheckOut] = useState(false);
  const [loding, setLoding] = useState(true);
  const [show, setShow] = useState(false);
  const { isChange, setIsChange } = useContext(ChangeAlContext);
  const [total, setTotal] = useState(0);
  const { user } = useUser();
  const nav = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const { addToast } = useToast();

  const handleClickShow = () => setShow((prev) => !prev);

  useEffect(() => {
    setLoding(true);
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProduct);
    setLoding(false);
  }, [isChange]);

  function handleDelete(id) {
    const filterProduct = Products.filter((pro) => pro.id !== id);
    localStorage.setItem("product", JSON.stringify(filterProduct));
    setIsChange((prev) => !prev);
    addToast(t("The product successfully deleted"));
  }

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    if (getProduct.length > 0) {
      const newTotal = getProduct.reduce((acc, pro) => {
        return acc + (pro.price - pro.discount) * pro.count;
      }, 0);
      setTotal(newTotal);
    }
  }, [isChange]);

  const changeCount = (id, btnCount) => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProduct.find((pro) => pro.id === +id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProduct));
    setIsChange((prev) => !prev);
  };

  const showProduct = Products.map((pro, key) => (
    <div key={key} className="d-flex gap-2 my-2">
      <div className="w-50 h-50">
        <img
          src={pro.images[0].image}
          className="w-100 h-25"
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div className="w-100 mt-2">
          <PlusMinusBtn
            id={pro.id}
            count={pro.count}
            changeCount={changeCount}
            stock={pro.stock}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div>
          <ShowProductsQuantity stock={pro.stock - pro.count} />
          <h4 className="m-0">{StringSlice(pro.title, 7)}</h4>
          <p className="m-0 text-secondary">{pro.description}</p>
          <div className="d-flex align-items-center gap-1">
            <h5 className="m-0 text-primary">${pro.price - pro.discount}</h5>
            <p className="m-0 text-decoration-line-through">{pro.price}</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-danger cursor-pointer"
          onClick={() => handleDelete(pro.id)}
        />
      </div>
    </div>
  ));

  function handleDeletAll() {
    localStorage.removeItem("product");
    setShow(false);
    setIsChange((prev) => !prev);
    addToast(t("Products have deleted successfully"));
    setTotal(0);
  }

  async function handleCheckout() {
    setLodingCheckOut(true);
    try {
      await Axios.post(`${CheckoutApi}`, {
        customer_name: user.first_name + " " + user.last_name,
        total_price: total,
        status: "pending",
        items: Products.map((i) => ({
          id: i.id,
          count: i.count,
        })),
        phone: user.phone,
        country: user.country,
        city: user.city,
      });

      addToast(t("The operation was completed successfully"));
      setIsChange((prev) => !prev);
      localStorage.removeItem("product");
      nav("/my-orders");
    } catch (err) {
      if (err.status === 500) {
        addToast(t("Please complete your details"), "error");
        nav("/settinges");
      } else {
        addToast(t("Please log in to complete your purchase"), "error");
        nav("/login");
      }
    } finally {
      setLodingCheckOut(false);
      setOpen(false);
    }
  }

  return (
    <>
      <div
        className="closeCart d-none d-md-block"
        onClick={() => setOpen(false)}
        style={{ right: open ? "0" : "-100%" }}
      />
      <div
        className={`CartShop position-fixed col-md-3 col-12 ${theme === "dark" ? "bg-dark-card" : "bg-light-card"} px-2`}
        style={{ right: open ? "0" : "-100%" }}
      >
        <div className="d-flex align-items-center justify-content-between py-2">
          <h2 className="m-0 fw-bold">{t("Shopping cart")}</h2>
          <button
            className={`btn btn-close py-1 ${theme === "dark" && "bg-light"}`}
            onClick={() => setOpen(false)}
          />
        </div>
        <hr />
        {loding ? (
          <SkeletonCart num={5} />
        ) : Products.length > 0 ? (
          <div className="overflow-auto" style={{ maxHeight: "80%" }}>
            {showProduct}
          </div>
        ) : (
          <div className="h-screen text-center d-flex align-items-center justify-content-center gap-2 flex-column">
            <img
              src={require(`../../../Assets/cartShop.png`)}
              style={{ width: "300px" }}
              alt=""
            />
            <p className="fs-5 fw-bold mt-1 mb-0">
              {t('Your shopping cart is now empty')}
            </p>
            <p className="text-secondary">
              {t("It seems you haven't added any products yet. Browse our products and discover what you like.")}
            </p>
            <Link
              to="./shop"
              className="btn btn-primary w-75"
              onClick={() => setOpen(false)}
            >
              {t('Shop Now')}
            </Link>
            <Link
              to="/"
              className="btn w-75"
              style={{ backgroundColor: "#ccc8bf" }}
              onClick={() => setOpen(false)}
            >
              {t('Return Home page')}
            </Link>
          </div>
        )}
        {Products.length > 0 && (
          <>
            <div className="d-flex align-items-center justify-content-center mt-4 mb-3">
              <div className="border border-2 border-secondary w-100 p-2 rounded-2 d-flex align-items-center justify-content-between">
                <div className="d-flex gap-2">
                  <p className="m-0 fw-bold">{t('Total')}:</p>
                  <span>{total}</span>
                </div>

                <Button variant="danger" onClick={handleClickShow}>
                  {t('Delete All')}
                </Button>

                <Modal show={show} onHide={handleClickShow}>
                  <Modal.Header closeButton>
                    <Modal.Title>{t('Delete All')}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {t('Warning! All items will be permanently deleted. Do you want to continue?')}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClickShow}>
                      {t('No')}
                    </Button>
                    <Button variant="primary" onClick={handleDeletAll}>
                      {t('Yes')}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <div onClick={handleCheckout}>
              <BtnSubmit
                name={t("Checkout")}
                disabled={lodingCheckOut}
                loding={lodingCheckOut}
                animationCheckout={true}
              />
            </div>
            <Link
              to="/shop"
              className="text-black d-flex align-items-center justify-content-center gap-3 text-decoration-none mt-2"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> {t("Back to shopping")}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
