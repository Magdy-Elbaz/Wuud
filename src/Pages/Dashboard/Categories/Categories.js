import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY, SearchCategory } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table/Table";

const headerTable = [
  {
    key: "title",
    name: "Title",
  },
  {
    key: "image",
    name: "Image",
  },
  { key: "created_at", name: "Created" },
  { key: "updated_at", name: "Updated" },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // Global State
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);

  // Get All Categories
  useEffect(() => {
    setLoding(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err.response))
      .finally(() => setLoding(false));
  }, [render, limit, page]);

  return (
    <>
      <div className="p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="title-page text-secondary">
            Categories Page <FontAwesomeIcon icon={faBoxesStacked} />
          </h2>
          <Link to="/dashboard/category/add" className="btn btn-primary">
            Add Category
          </Link>
        </div>
        <TableShow
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          page={page}
          totalData={totalData}
          header={headerTable}
          data={categories}
          delete={CATEGORY}
          setRender={setRender}
          loding={loding}
          searchName="title"
          searchLink={SearchCategory}
        />
      </div>
    </>
  );
}
