import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../../helpers/StringSlice";
import { Link } from "react-router-dom";
import { Axios } from "../../../../Api/Axios";
import { CART, FavoriteToggle } from "../../../../Api/Api";
import { useContext, useState } from "react";
import { ChangeAlContext } from "../../../../Context/ChangeAllContext";
import Loding from "../../../Loding/Loding";
import { useToast } from "../../../../Context/Toast Notification/ToastNotification";
import MetaProduct from "./MetaProduct";
import CheckProductQuantity from "../../../../helpers/CheckProductQuantity";

export default function ProductItem(props) {
  const saleProduct = ((props.data.discount / props.data.price) * 100).toFixed(
    1,
  );
  const [loding, setLoding] = useState(false);
  const { setIsChange } = useContext(ChangeAlContext);
  const { addToast } = useToast();
  const [stock, setStock] = useState(props.data.stock);
  const [lodingWishlist, setLodingWishlist] = useState(false);
  const [wishlist, setWishlist] = useState(props.data.is_favorite);

  // Check Product Quantity
  CheckProductQuantity(setStock, props.data);

  const checkStock = async () => {
    try {
      setLoding(true);
      const getProducts = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getProducts.filter(
        (pro) => +pro.id === +props.data.id,
      )?.[0]?.count;

      await Axios.post(`${CART}/check`, {
        product_id: props.data.id,
        count: 1 + (productCount ? productCount : 0),
      });
      addToast("Added to cart");
      return true;
    } catch (err) {
      addToast("Sorry, the requested quantity is not available.", "error");
      return false;
    } finally {
      setLoding(false);
    }
  };

  async function handleFavorites() {
    setLodingWishlist(true);
    try {
      const res = await Axios.post(`${FavoriteToggle}/${props.data.id}`);
      setIsChange((prev) => !prev);
      setWishlist((prev) => !prev);

      if (res.data.is_favorite) {
        addToast("It has been successfully added to your wishlist.");
      } else {
        addToast("It has been successfully removed from your wishlist.");
      }
    } catch (err) {
      addToast("Please log in to save your favorites.", "error");
    } finally {
      setLodingWishlist(false);
    }
  }

  async function handleAddCart() {
    if (!loding) {
      const check = await checkStock();
      if (check) {
        const getProduct = JSON.parse(localStorage.getItem("product")) || [];
        const productExist = getProduct.findIndex(
          (pro) => +pro.id === +props.data.id,
        );
        if (productExist !== -1) {
          if (getProduct[productExist].count) {
            getProduct[productExist].count += 1;
          }
        } else {
          props.data.count = 1;
          getProduct.push(props.data);
        }

        localStorage.setItem("product", JSON.stringify(getProduct));
        setIsChange((prev) => !prev);
      }
    }
  }

  return (
    <div
      className={`${props.latestProduct && "col-md-6 col-12 pe-0 pe-md-3 pb-3"}`}
    >
      <div
        className={`${props.col ? "border rounded-2" : "d-flex align-items-center gap-2 w-100 border-bottom"} ${props.latestProduct && "w-100"} border-secondary product-item p-2 position-relative`}
        style={{ height: props.col ? "350px" : "160px" }}
      >
        <div
          className={`${props.col ? "w-100" : "w-25 h-100"} d-flex justify-content-center overflow-hidden`}
        >
          <img
            src={
              props.data.images.length > 0 ? props.data.images[0].image : null
            }
            className={`${props.col ? "w-75" : "h-100 w-100"}`}
            alt=""
          />
        </div>
        {props.sale && saleProduct !== "0.0" && (
          <p className="sale m-0 bg-primary py-1 px-4 rounded-5 text-light position-absolute">
            {saleProduct}%
          </p>
        )}
        <div
          className="position-absolute"
          style={{ top: "25px", right: "20px" }}
        >
          {lodingWishlist ? (
            <Loding action={true} />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              className={`fs-5 ${!wishlist ? "text-light" : "text-danger"} cursor-pointer`}
              onClick={handleFavorites}
            />
          )}
        </div>
        <div className={`${!props.col && "w-75"}`}>
          <h4 className="mt-1 mb-0">{StringSlice(props.data.title, 15)}</h4>
          {props.col && <hr className="mb-0 mt-3" />}
          <div className="d-flex align-items-center justify-content-between mt-1">
            <MetaProduct product={props.data} stock={stock} />
            <div className="d-flex align-items-center gap-1">
              <Link to={`/product/${props.data.id}`}>
                <FontAwesomeIcon icon={faEye} className="btn fs-5 p-1" />
              </Link>
              {stock > 0 && (
                <button
                  className={`btn ${props.col ? "btn-dark" : "btn-light"} d-flex align-items-center justify-content-center`}
                  onClick={handleAddCart}
                  style={{ width: props.col ? "38px" : "30px", height: "33px" }}
                >
                  {loding ? (
                    <Loding
                      action={true}
                      color={props.col ? "#fff" : "#0f0e0e"}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCartShopping} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
