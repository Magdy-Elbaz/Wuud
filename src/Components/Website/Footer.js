import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Outlet />
      <div
        className="p-2 bg-primary footer"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <Container>
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
            <p className="m-0 text-dark">
              {t("@Copyright 2026")}.
              <Link to="/" className="text-decoration-none text-light mx-1">
                Wuud
              </Link>
              {t("All Rights Reserved.")}
            </p>
            <p className="m-0 text-dark">
              {t("Developed by:")}
              <Link
                to="https://magdy-elbaz.vercel.app/"
                target="_blank"
                className="text-light text-decoration-none mx-1"
              >
                {t("Magdy Elbaz")}
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
