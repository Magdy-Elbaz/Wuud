import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { SHOP } from "../../../Api/Api";
import ProductItem from "../../../Components/Website/Home/Products/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { WindowSize } from "../../../Context/WindowContext";
import "./shop.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Skeletonhop from "./SkaletonShop";
import PageHeader from "../../../Components/Website/PageHeader";
import BtnSeeMore from "../../../Components/Btn/BtnSeeMore/BtnSeeMore";
import NoSearch from "../../../Components/Website/NoSearch";
import { useTranslation } from "react-i18next";

export default function Shop() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    value: "newest",
    label: t("Newest"),
  });
  const [loding, setLoding] = useState(true);
  const [lodingSeeMore, setLodingeeMore] = useState(false);
  const { windowSize } = useContext(WindowSize);
  const [dataShop, setDataShop] = useState([]);
  const [limit, setLimit] = useState(5);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    if (search === "") {
      !lodingSeeMore && setLoding(true);
      setLodingeeMore(true);
      Axios.get(`${SHOP}?sort=${selectedOption.value}&limit=${limit}`)
        .then((data) => {
          setDataShop(data.data.data);
          setTotalCategories(data.data.total_categories);
        })
        .finally(() => {
          setLoding(false);
          setLodingeeMore(false);
        });
    }
  }, [selectedOption.value, limit, search]);

  const ShowData = dataShop.map((data, key) => (
    <div key={key} className="my-5 overflow-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2" data-aos="fade-right">
          <h2>{data.title}</h2>
          <img src={data.image} width={"50px"} height={"50px"} className="rounded-circle" alt="" />
        </div>
        <Link to={`/category/${data.id}`} className="btn btn-primary" data-aos="fade-left">
          {t('View All')}
        </Link>
      </div>
      <div className="d-flex align-items-center w-100">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={
            windowSize <= "768" ? 30 : data.products.length > 4 ? -20 : 20
          }
          slidesPerView={
            windowSize <= "768"
              ? 1
              : windowSize <= "991"
                ? 2
                : Math.min(4, data.products.length)
          }
          watchOverflow={true}
          navigation={windowSize <= "768" ? false : true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          className="mask-img"
        >
          {data.products.map((pro, key) => (
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
          ))}
        </Swiper>
      </div>
    </div>
  ));

  return (
    <div className="h-screen">
      <Container>
        <PageHeader
          title={t("Shop Now")}
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setLoding={setLoding}
          setData={setDataShop}
          setTotalCategories={setTotalCategories}
          limit={limit}
        />
        {loding ? (
          <Skeletonhop number={5} />
        ) : dataShop.length === 0 ? (
          <div className="h-screen d-flex align-items-center justify-content-center">
            <NoSearch />
          </div>
        ) : (
          ShowData
        )}
        {dataShop.length < totalCategories && (
          <BtnSeeMore
            setLimit={setLimit}
            setLodingeeMore={setLodingeeMore}
            lodingSeeMore={lodingSeeMore}
          />
        )}
      </Container>
    </div>
  );
}
