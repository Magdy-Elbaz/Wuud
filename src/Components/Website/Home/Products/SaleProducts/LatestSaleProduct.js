import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../../../../Api/Axios";
import { LatestSale } from "../../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem/ProductItem";
import { WindowSize } from "../../../../../Context/WindowContext";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const { windowSize } = useContext(WindowSize);
  const { isChange } = useContext(ChangeAlContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, [isChange]);

  const productsShow = products.map((pro, key) => (
    <SwiperSlide
      key={key}
      style={{
        padding: "20px 0 35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProductItem data={pro} sale={true} col={true} />
    </SwiperSlide>
  ));

  return (
    <Container className="overflow-hidden">
      <div
        className="mt-5"
        data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
      >
        <h2 className="fw-bold m-0">
          <FontAwesomeIcon icon={faTag} className="fs-3 text-primary" />{" "}
          {t("Sale")}
        </h2>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0">
            {t(
              "Timeless pieces, exceptional value. Shop our curated sale collection before it's gone.",
            )}
          </p>
        </div>
      </div>
      <div className="my-5">
        {loding ? (
          <SkeletonPage
            number={windowSize <= "768" ? 1 : windowSize <= "991" ? 2 : 4}
            height={"331px"}
            width={windowSize <= "768" ? windowSize - 30 + "px" : "250px"}
            gap="gap-5"
          />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={windowSize <= "768" ? 30 : -20}
            slidesPerView={
              windowSize <= "768" ? 1 : windowSize <= "991" ? 2 : 4
            }
            navigation={windowSize <= "768" ? false : true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            className="mask-img"
          >
            {productsShow}
          </Swiper>
        )}
      </div>
    </Container>
  );
}
