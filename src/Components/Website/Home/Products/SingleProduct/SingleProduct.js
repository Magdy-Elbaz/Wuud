import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../../Api/Axios";
import { CART, FavoriteToggle, PRODUCT } from "../../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import ScaletonSingleProduct from "./ScaletonSingleProduct";
import LatestSaleProduct from "../SaleProducts/LatestSaleProduct";
import PlusMinusBtn from "../../../../Btn/PlusMinusBtn";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";
import { useToast } from "../../../../../Context/Toast Notification/ToastNotification";
import Loding from "../../../../Loding/Loding";
import CustomerOpinions from "../../../CustomerComments/CustomerOpinions";
import MetaProduct from "../MetaProduct";
import CheckProductQuantity from "../../../../../helpers/CheckProductQuantity";
import { useTheme } from "../../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [loding, setLoding] = useState(true);
  const [lodingCart, setLodingCart] = useState(false);
  const { addToast } = useToast();
  const { isChange, setIsChange } = useContext(ChangeAlContext);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const [stock, setStock] = useState(product?.stock);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [lodingWishlist, setLodingWishlist] = useState(false);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${PRODUCT}/${id}`)
      .then((pro) => {
        setProduct(pro.data[0]);
        setImages(
          pro.data[0].images.map((img) => {
            return {
              original: img.image,
              thumbnail: img.image,
            };
          }),
        );
      })
      .finally(() => setLoding(false));
  }, [isChange, id]);

  CheckProductQuantity(setStock, product);

  const checkstock = async () => {
    try {
      setLodingCart(true);
      const getProduct = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getProduct.filter((pro) => +pro.id === +id)?.[0]
        ?.count;
      await Axios.post(`${CART}/check`, {
        product_id: id,
        count: count + (productCount ? productCount : 0),
      });
      addToast(t("Added to cart"));
      return true;
    } catch (err) {
      addToast(t("Sorry, the requested quantity is not available."), "error");
      return false;
    } finally {
      setLodingCart(false);
    }
  };

  const handleAddCart = async () => {
    const check = await checkstock();
    if (check) {
      const getProducts = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getProducts.findIndex((pro) => pro.id === +id);

      if (productExist !== -1) {
        if (getProducts[productExist].count) {
          getProducts[productExist].count += count;
        }
      } else {
        if (count >= 1) {
          product.count = count;
        }
        getProducts.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getProducts));
      setIsChange((prev) => !prev);
    }
  };

  async function handleFavorites() {
    setLodingWishlist(true);
    try {
      const res = await Axios.post(`${FavoriteToggle}/${product.id}`);
      setIsChange((prev) => !prev);

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

  return (
    <>
      <Container
        className="mt-5 p-0"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {loding ? (
          <ScaletonSingleProduct />
        ) : (
          <div className="d-flex flex-wrap justify-content-center position-relative">
            <div
              className="col-lg-4 col-md-6 col-11"
              data-aos="fade-right"
              dir="ltr"
            >
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showIndex={true}
                autoPlay={true}
                disableSwipe={true}
                disableKeyDown={true}
                slideInterval={6000}
              />
            </div>
            <div className={"col-lg-8 col-md-6 col-12 px-3"}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h1 data-aos="fade-up">{product.title}</h1>
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
                        className={`fs-5 ${!product.is_favorite ? "text-light" : "text-danger"} cursor-pointer`}
                        onClick={handleFavorites}
                      />
                    )}
                  </div>
                  <p className="m-0 text-secondary" data-aos="fade-up">
                    {product.About}
                  </p>
                  <h2 data-aos="fade-up">{product.description}</h2>
                </div>
              </div>
              <div className="mt-5">
                <hr className="mb-0 mt-3" />
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <MetaProduct
                    product={product}
                    stock={stock}
                    singleProduct={true}
                  />
                  {stock > 0 ? (
                    <div className="w-50">
                      <div className="d-flex align-items-center flex-wrap gap-4">
                        <div className="w-50" data-aos="fade-left">
                          <PlusMinusBtn setCount={setCount} stock={stock} />
                        </div>
                        <button
                          className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} d-flex align-items-center text-nowrap justify-content-center`}
                          onClick={handleAddCart}
                          disabled={count === 0}
                          style={{
                            width: i18n.language === "ar" ? "145px" : "137px",
                            height: "34px",
                          }}
                          data-aos="fade-left"
                        >
                          {lodingCart ? (
                            <Loding action={true} color="#fff" />
                          ) : (
                            <span>
                              {t("Add To Cart")}
                              <FontAwesomeIcon icon={faCartShopping} />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="m-0 text-danger">
                      {t("This product is currently unavailable")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <LatestSaleProduct />
        <CustomerOpinions product={product} id={id} />
      </Container>
    </>
  );
}
