import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES, SearchCategory } from "../../../Api/Api";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonPage from "../../../Components/Website/SkeletonPage";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
import HandleSearch from "../../../helpers/HandleSearch";
import { Link } from "react-router-dom";
import NoSearch from "../../../Components/Website/NoSearch";
import "./CatigoriesSearch.css";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function CatigoriesSearch() {
  const [filterCatigory, setFilterCatigory] = useState([]);
  const [catigories, setCatigories] = useState([]);
  const [loding, setLoding] = useState(true);
  const [lodingShearch, setLodingSearch] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const limit = 30;

  useEffect(() => {
    if (search === "") {
      setLoding(true);
      Axios.get(`${CATEGORIES}?limit=${limit}&page=${page}`)
        .then((cat) => {
          setCatigories(cat.data.data);
          setTotal(cat.data.total);
        })
        .finally(() => setLoding(false));
    }
  }, [page, search]);

  HandleSearch(
    "title",
    SearchCategory,
    search,
    setLodingSearch,
    setFilterCatigory,
    "",
    setPage,
    setTotal,
  );

  const catigoriesShow = catigories.map((cat, key) => (
    <Link
      to={`/category/${cat.id}`}
      key={key}
      className={`catigory-item d-flex align-items-center btn ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} gap-3 p-2 cursor-pointer`}
      data-aos="fade-up"
    >
      <img src={cat.image} width={"50px"} height={"30px"} alt="" />
      <p className="m-0">{StringSlice(cat.title, 12)}</p>
    </Link>
  ));

  const MapFilterCatigory = filterCatigory
    .slice((page - 1) * limit, page * limit)
    .map((cat, key) => (
      <Link
        key={key}
        to={`/category/${cat.id}`}
        className={`catigory-item d-flex btn ${theme === "dark" ? "bg-dark-card text-light" : "bg-light-card"} align-items-center gap-3 p-2`}
        data-aos="fade-up"
      >
        <img src={cat.image} width={"50px"} height={"30px"} alt="" />
        <p className="m-0">{StringSlice(cat.title, 12)}</p>
      </Link>
    ));

  return (
    <div
      className="categories-wrapper py-5"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="d-flex align-items-center justify-content-center w-100 mb-4">
        <Form
          className={`form-floating ${i18n.language === "ar" ? "ar" : "en"} w-75 rounded-3`}
          data-aos="fade-left"
        >
          <Form.Control
            type="search"
            value={search}
            className="search-cancel-button bg-primary text-light"
            id="floatingInputValue"
            onChange={(e) => setSearch(e.target.value)}
            placeholder=""
          />
          <Form.Label htmlFor="floatingInputValue" className="text-light">
            {t("Search for category")}
          </Form.Label>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`position-absolute icon-search ${i18n.language === "ar" ? "ar" : "en"} text-light`}
          />
        </Form>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
        {loding || lodingShearch ? (
          <SkeletonPage
            number={30}
            height={"46px"}
            width={"250px"}
            gap={"gap-4"}
            wrap={true}
          />
        ) : search === "" ? (
          catigoriesShow
        ) : MapFilterCatigory.length > 0 ? (
          MapFilterCatigory
        ) : (
          <div className="my-5">
            <NoSearch category={true} />
          </div>
        )}
      </div>
      <div className="mt-3">
        {total > limit && (
          <div className="d-flex align-items-center justify-content-center">
            <PaginatedItems limit={limit} setPage={setPage} total={total} />
          </div>
        )}
      </div>
    </div>
  );
}
