import { Link, NavLink } from "react-router-dom";
import StringSlice from "../../../helpers/StringSlice";
import { Axios } from "../../../Api/Axios";
import { useContext, useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../../Api/Api";
import SkeletonPage from "../SkeletonPage";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";

export default function CatigoriesShowNav() {
  const [catigories, setCatigoies] = useState([]);
  const [loding, setLoding] = useState(false);
  const { t, i18n } = useTranslation();
  const scrollRef = useRef(null);
  const { isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCatigoies(data.data.slice(-9)))
      .finally(() => setLoding(false));
  }, [isChange]);

  const catigoryShow = catigories.map((cat, key) => (
    <NavLink
      to={`/category/${cat.id}`}
      key={key}
      className="btn py-0 text-nowrap catigory-nav-item text-light"
      data-aos="fade-down"
    >
      {StringSlice(cat.title, 15)}
    </NavLink>
  ));

  return (
    <div
      className="bg-catigory-nav"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Container>
        <div
          className="d-flex catigory-nav align-items-center overflow-x-auto gap-3 py-1"
          data-aos="fade-down"
          ref={scrollRef}
        >
          {loding ? (
            <SkeletonPage number={9} height={"12px"} width={"120px"} />
          ) : (
            catigoryShow
          )}
          <Link
            to="/catigories"
            className="text-nowrap text-decoration-none text-center"
          >
            {t("Show All")}
          </Link>
        </div>
      </Container>
    </div>
  );
}
