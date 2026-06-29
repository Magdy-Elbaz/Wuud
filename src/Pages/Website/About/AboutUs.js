import { Container } from "react-bootstrap";
import "./about.css";
import OurValues from "./OurValues";
import OurJourney from "./OurJourney";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t,i18n } = useTranslation();

  return (
    <div className="h-screen overflow-hidden" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="bg-image-about position-relative d-flex align-items-center justify-content-center">
        <h2 className="text-light text-center" data-aos="fade-left">
          {t("Craftsmanship passed down through generations")}
        </h2>
      </div>
      <Container>
        <h2 className="mt-3" data-aos="fade-right">
          {t("Why")} wuud {t('?')}
        </h2>
        <p className="my-5 mt-2 About-description" data-aos="fade-up">
          {t("At")} <span className="text-primary fw-bold">Wuud</span>,
          {t(
            "furniture is more than just wood and fabric; it is the soul that breathes life into your home. Our journey begins with a deep respect for nature, selecting only the premium timber to be shaped by the hands of master artisans. Every curve, texture, and joint tells a story of dedication and precision. We bridge the gap between timeless craftsmanship and contemporary elegance, creating masterpieces designed to evolve with your space and endure for generations. Discover the art of living well with",
          )}
          <span className="text-primary fw-bold">Wuud</span>.
        </p>
        <OurValues />
        <OurJourney />
      </Container>
    </div>
  );
}
