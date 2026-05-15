import { useContext, useEffect, useState } from "react";
import StringSlice from "../../../helpers/StringSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SkeletonCart from "./SkeletonCart";
import { Button, Modal } from "react-bootstrap";
import PlusMinusBtn from "../../../Components/Btn/PlusMinusBtn";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import ShowProductsQuantity from "../../../Components/Website/ShowproductsQuantity";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../Api/Axios";
import { CheckoutApi } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";

export default function CartShop({ open, setOpen }) {
  const [Products, setProducts] = useState([]);
  const [lodingCheckOut, setLodingCheckOut] = useState(false);
  const [loding, setLoding] = useState(true);
  const [show, setShow] = useState(false);
  const { isChange, setIsChange } = useContext(ChangeAlContext);
  const [total, setTotal] = useState(0);
  const { user } = useUser();
  const nav = useNavigate();

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
    addToast("The product successfully deleted");
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
    addToast("Products have deleted successfully");
    setTotal(0);
  }

  async function handleCheckout() {
    setLodingCheckOut(true);
    try {
      await Axios.post(`${CheckoutApi}`, {
        customer_name: user.name,
        total_price: total,
        status: "pending",
        items: Products.map((i) => ({
          id: i.id,
          count: i.count,
        })),
      });

      addToast("The operation was completed successfully");
      setIsChange((prev) => !prev);
      localStorage.removeItem("product");
      setOpen(false);
      nav("/my-orders")
    } catch (err) {
      addToast("Please log in to complete your purchase.", "error");
    } finally {
      setLodingCheckOut(false);
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
        className="CartShop position-fixed col-md-3 col-12 bg-light px-2"
        style={{ right: open ? "0" : "-100%" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="m-0 fw-bold">Cart Shop</h2>
          <button
            className="btn btn-close py-1"
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
          <p className="h-75 d-flex align-items-center text-center text-secondary">
            Your shopping cart is empty; no products have been added.
          </p>
        )}
        {Products.length > 0 && (
          <>
            <div className="d-flex align-items-center justify-content-center mt-4 mb-3">
              <div className="border border-2 border-secondary w-100 p-2 rounded-2 d-flex align-items-center justify-content-between">
                <div className="d-flex gap-2">
                  <p className="m-0 fw-bold">Total:</p>
                  <span>{total}</span>
                </div>

                <Button variant="danger" onClick={handleClickShow}>
                  Delete All
                </Button>

                <Modal show={show} onHide={handleClickShow}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete All</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Warning! All items will be permanently deleted. Do you want
                    to continue?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClickShow}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleDeletAll}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <div onClick={handleCheckout}>
              <BtnSubmit
                name="Checkout"
                disabled={lodingCheckOut}
                loding={lodingCheckOut}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
