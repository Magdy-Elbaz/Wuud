import { Link, NavLink } from "react-router-dom";
import StringSlice from "../../../helpers/StringSlice";
import { Axios } from "../../../Api/Axios";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../../Api/Api";
import SkeletonPage from "../SkeletonPage";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function CatigoriesShowNav() {
  const [catigories, setCatigoies] = useState([]);
  const [loding, setLoding] = useState(false);
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCatigoies(data.data.slice(-9)))
      .finally(() => setLoding(false));
  }, []);

  const handleMouseDown = (e) => {
    const ele = scrollRef.current;
    if (!ele) return;

    const startX = e.pageX - ele.offsetLeft;
    const scrollLeft = ele.scrollLeft;

    const handleMouseMove = (moveEvent) => {
      const x = moveEvent.pageX - ele.offsetLeft;
      const walk = (x - startX) * 1;
      ele.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

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
    <div className="bg-catigory-nav">
      <Container>
        <div
          className="d-flex align-items-center overflow-x-auto gap-3 py-1"
          data-aos="fade-down"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
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
