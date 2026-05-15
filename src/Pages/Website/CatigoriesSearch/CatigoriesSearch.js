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
import "./CatigoriesSearch.css";
import { Link } from "react-router-dom";

export default function CatigoriesSearch() {
  const [filterCatigory, setFilterCatigory] = useState([]);
  const [catigories, setCatigories] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 30;

  useEffect(() => {
    setLoding(true);
    Axios.get(`${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((cat) => {
        setCatigories(cat.data.data);
        setTotal(cat.data.total);
      })
      .finally(() => setLoding(false));
  }, [page, search]);

  HandleSearch(
    "title",
    SearchCategory,
    search,
    setLoding,
    setFilterCatigory,
    "",
    setPage,
    setTotal,
  );

  const catigoriesShow = catigories.map((cat, key) => (
    <Link
      to={`/category/${cat.id}`}
      key={key}
      className="catigory-item d-flex align-items-center btn btn-light gap-3 p-2 cursor-pointer"
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
        className="catigory-item d-flex btn btn-light align-items-center gap-3 p-2"
      >
        <img src={cat.image} width={"50px"} height={"30px"} alt="" />
        <p className="m-0">{StringSlice(cat.title, 12)}</p>
      </Link>
    ));

  return (
    <div className="categories-wrapper py-5">
      <div className="d-flex align-items-center justify-content-center w-100 mb-4">
        <form className="form-floating w-75  rounded-3">
          <Form.Control
            type="search"
            value={search}
            className="form-control bg-primary input-search text-dark"
            id="floatingInputValue"
            onChange={(e) => setSearch(e.target.value)}
            placeholder=""
          />
          <label htmlFor="floatingInputValue">Search Catigory</label>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" position-absolute icon-search-catigory text-light"
          />
        </form>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
        {loding ? (
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
          <p>Sorry, this category is not available.</p>
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
