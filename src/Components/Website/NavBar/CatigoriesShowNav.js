import { Link, NavLink } from "react-router-dom";
import StringSlice from "../../../helpers/StringSlice";
import { Axios } from "../../../Api/Axios";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../Api/Api";
import SkeletonPage from "../SkeletonPage";
import { Container } from "react-bootstrap";

export default function CatigoriesShowNav() {
  const [catigories, setCatigoies] = useState([]);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCatigoies(data.data.slice(-9)))
      .finally(() => setLoding(false));
  }, []);

  const catigoryShow = catigories.map((cat, index) => (
    <NavLink
      to={`/category/${cat.id}`}
      key={index}
      className="btn text-nowrap catigory-nav-item text-light"
    >
      {StringSlice(cat.title, 15)}
    </NavLink>
  ));

  return (
    <div className="catigory-nav">
      <Container>
        <div className="d-flex align-items-center gap-3 py-1 overflow-auto">
          {loding ? (
            <SkeletonPage number={9} height={"12px"} width={"120px"} />
          ) : (
            catigoryShow
          )}
          <Link to="/catigories" className="text-nowrap text-decoration-none">
            Show All
          </Link>
        </div>
      </Container>
    </div>
  );
}
