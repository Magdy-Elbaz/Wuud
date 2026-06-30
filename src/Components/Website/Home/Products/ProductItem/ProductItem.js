import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../../../helpers/StringSlice";
import { Link } from "react-router-dom";
import { Axios } from "../../../../../Api/Axios";
import { CART, FavoriteToggle } from "../../../../../Api/Api";
import { useContext, useState } from "react";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";
import Loding from "../../../../Loding/Loding";
import { useToast } from "../../../../../Context/Toast Notification/ToastNotification";
import MetaProduct from "../MetaProduct";
import CheckProductQuantity from "../../../../../helpers/CheckProductQuantity";
import BtnSubmit from "../../../../Btn/BtnSubmit";
import { useTheme } from "../../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";
import "./ProductItem.css";

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
  const theme = useTheme();
  const { t, i18n } = useTranslation();

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
      addToast(t("Added to cart"));
      return true;
    } catch (err) {
      addToast(t("Sorry, the requested quantity is not available."), "error");
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
        addToast(t("It has been successfully added to your wishlist."));
      } else {
        addToast(t("It has been successfully removed from your wishlist."));
      }
    } catch (err) {
      addToast(t("Please log in to save your favorites."), "error");
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
      className={`product-item ${props.TopRated && "w-100"}`}
    >
      <div
        className={`${props.col ? "rounded-2 shadow" : "d-flex align-items-center gap-2 w-100 border-bottom"} ${props.latestProduct && "w-100"} border-secondary ${theme === "light" ? "bg-light-card" : "bg-dark-card"} p-2 position-relative`}
        style={{ height: props.col ? "350px" : "160px" }}
        data-aos={
          props.TopRated
            ? i18n.language === "ar"
              ? "fade-left"
              : "fade-right"
            : "fade-up"
        }
      >
        <div
          className={`${props.col ? "w-100" : "col-4 h-100"} d-flex justify-content-center overflow-hidden`}
        >
          <img
            src={
              props.data.images.length > 0 ? props.data.images[0].image : null
            }
            className={`${!props.col && "h-100"} w-100`}
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
          style={{ top: "20px", right: "20px" }}
        >
          {lodingWishlist ? (
            <div
              style={{ width: "28px", height: "28px" }}
              className="rounded-circle bg-light d-flex align-items-center justify-content-center"
            >
              <Loding action={true} primaryLoding={true} />
            </div>
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
                <FontAwesomeIcon
                  icon={faEye}
                  className={`btn ${theme === "dark" && "text-light"} fs-5 p-1`}
                />
              </Link>
              {stock > 0 && (
                <div onClick={handleAddCart}>
                  <BtnSubmit
                    className={`btn ${props.col ? "btn-dark" : "btn-light"} d-flex align-items-center justify-content-center`}
                    width={props.col ? "38px" : "30px"}
                    height="33px"
                    loding={loding}
                    name={<FontAwesomeIcon icon={faCartShopping} />}
                    animationAddcart={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
