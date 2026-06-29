import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS, SearchProduct } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table/Table";
import { useTranslation } from "react-i18next";

export default function Products() {
  const [products, setProducts] = useState([]);

  // Global State
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);
  const { t } = useTranslation();

  const headerTable = [
    { key: "images", name: t("Product Images") },
    {
      key: "title",
      name: t("Title"),
    },
    {
      key: "description",
      name: t("Description"),
    },
    {
      key: "price",
      name: t("Price"),
    },
    {
      key: "discount",
      name: t("Discount"),
    },
    {
      key: "rating",
      name: t("Rating"),
    },
    { key: "created_at", name: t("Created At") },
    { key: "updated_at", name: t("Updated") },
  ];

  // Get All Categories
  useEffect(() => {
    setLoding(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
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
            {t("Products Page")} <FontAwesomeIcon icon={faTruckFast} />
          </h2>
          <Link to="/dashboard/product/add" className="btn btn-primary">
            {t("Add Product")}
          </Link>
        </div>
        <TableShow
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          totalData={totalData}
          header={headerTable}
          data={products}
          delete={PRODUCT}
          setRender={setRender}
          loding={loding}
          searchName="Title"
          searchLink={SearchProduct}
        />
      </div>
    </>
  );
}
