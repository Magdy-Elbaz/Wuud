import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS, SearchProduct } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table/Table";

const headerTable = [
  { key: "images", name: "Images" },
  {
    key: "title",
    name: "Title",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "price",
    name: "Price",
  },
  {
    key: "rating",
    name: "Rating",
  },
  {key: "created_at",name: "Created"},
  {key: "updated_at",name: "Updated"}
];

export default function Products() {
  const [products, setProducts] = useState([]);

  // Global State
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);

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
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="title-page text-secondary">
            Products Page <FontAwesomeIcon icon={faTruckFast} />
          </h2>
          <Link to="/dashboard/product/add" className="btn btn-primary">
            Add Product
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
          searchName="title"
          searchLink={SearchProduct}
        />
      </div>
    </>
  );
}
