import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="home overflow-hidden">
      <Container className="h-100">
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h1 className="text-primary fw-bold" data-aos="fade-right">
              {t("Welcome to wuud")}
            </h1>
            <h2 className="text-primary fw-bold" data-aos="fade-right">
              {t("Where refined taste meets the art of living.")}
            </h2>
            <p className="pergraph-home text-light m-0 fs-5" data-aos="fade-up">
              {t(
                "We offer luxurious home furnishings that embody your elegance and reflect your personality—from living rooms to the finest details.",
              )}
            </p>
            <p className="text-light fs-5" data-aos="fade-up">
              {t(
                "Exclusive designs | Exceptional quality | Service tailored to your needs",
              )}
            </p>
            <div className="d-flex align-items-center gap-2 " data-aos="fade-left">
              <h4 className="text-light">{t("SALE UP TO")}</h4>
              <h4 className="text-primary fw-bold m-0">{t("50%")}</h4>
            </div>
            <Link
              to="/shop"
              className="btn btn-light px-5 rounded-5 mt-2"
              data-aos="fade-up"
            >
              {t('Shop Now')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
