import Landing from "./Landind";
import Featuries from "../../../../Components/Website/Home/features/Featuries";
import LatestSaleProduct from "../../../../Components/Website/Home/Products/SaleProducts/LatestSaleProduct";
import Offers from "../Offers";
import ShowTopRated from "../../../../Components/Website/Home/Products/TopRated/ShowTopRated";
import LatestProducties from "../../../../Components/Website/Home/Products/LatestProducts/LatestProducts";
import { Container } from "react-bootstrap";
import ContactUs from "../Contact/ContactUs";
import CustomerOpinions from "../../../../Components/Website/CustomerComments/CustomerOpinions";
import { useTranslation } from "react-i18next";
import "./home.css";

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <div dir={i18n.language === "en" ? "ltr" : "rtl"}>
      <Landing />
      <Featuries />
      <LatestSaleProduct iconEye={true} />
      <Offers />
      <Container>
        <div className="d-flex align-items-start gap-5 gap-lg-0 flex-wrap my-5">
          <ShowTopRated />
          <LatestProducties />
        </div>
      </Container>
      <div className="img-con my-5 position-relative d-flex align-items-center justify-content-center">
        <h3 className="m-0 text-light text-center fw-bold" data-aos="zoom-in">
          {t("Your dream home starts with a special piece of furniture.")}
        </h3>
      </div>
      <Container>
        <CustomerOpinions commentsHome={true} />
        <ContactUs />
      </Container>
    </div>
  );
}
