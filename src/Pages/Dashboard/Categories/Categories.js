import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY, SearchCategory } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table/Table";
import { useTranslation } from "react-i18next";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // Global State
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);
  const { t } = useTranslation();

  const headerTable = [
    {
      key: "title",
      name: t("Title"),
    },
    {
      key: "image",
      name: t("Category Image"),
    },
    { key: "created_at", name: t("Created At") },
    { key: "updated_at", name: t("Updated") },
  ];

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
        <div className="d-flex align-items-center justify-content-between pe-2 my-2">
          <h2 className="mx-3 text-secondary">
            {t("Categories Page")} <FontAwesomeIcon icon={faBoxesStacked} />
          </h2>
          <Link to="/dashboard/category/add" className="btn btn-primary">
            {t("Add Category")}
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
          searchName="Title"
          searchLink={SearchCategory}
        />
      </div>
    </>
  );
}
