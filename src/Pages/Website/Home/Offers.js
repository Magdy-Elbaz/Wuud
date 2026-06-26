import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Offers() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <div className="d-flex align-items-center gap-3 overflow-hidden flex-wrap my-5 py-5">
        <div
          className={`box-sofa ${i18n.language === "ar" ? "ar" : "en"} rounded-5 overflow-hidden align-content-center px-5 ${theme === "dark" && "box-dark"}`}
        >
          <span className="text-primary fw-bold fs-5" data-aos="fade-up">
            {t("Discount 30%")}
          </span>
          <h2 className="m-0 fw-bold" data-aos="fade-up">
            {t("A sofa that suits your home")}
          </h2>
          <p className="text-secondary m-0" data-aos="fade-up">
            {t(
              "Premium fabrics, solid hardwood frames, and timeless silhouettes — built to last a lifetime",
            )}
          </p>
          <Link
            to="/shop"
            className="btn btn-primary mt-2 px-4"
            data-aos="fade-right"
          >
            {t("Shop Now")}
          </Link>
        </div>
        <div
          className={`box-chair ${i18n.language === "ar" ? "ar" : "en"} align-content-center rounded-5 overflow-hidden px-4 ${theme === "dark" && "box-dark"}`}
        >
          <span className="text-primary fw-bold fs-5" data-aos="fade-up">
            {t("Discount 30%")}
          </span>
          <h2 className="m-0 fw-bold" data-aos="fade-up">
            {t("Luxurious relaxing chairs")}
          </h2>
          <p className="text-secondary m-0 w-75" data-aos="fade-up">
            {t("Timeless comfort, effortless elegance.")}
          </p>
          <Link
            to="/shop"
            className="btn btn-primary mt-2 px-4"
            data-aos="fade-right"
          >
            {t("Shop Now")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
