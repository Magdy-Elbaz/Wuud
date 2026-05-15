import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORY, PRODUCTS } from "../../../Api/Api";
import ProductItem from "../Home/Products/ProductItem";
import SkeletonPage from "../SkeletonPage";

export default function SingleCategories() {
  const { id } = useParams();
  const [nameCatigory, setNameCatigory] = useState("");
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${CATEGORY}/${id}/${PRODUCTS}`)
      .then((data) => {
        setNameCatigory(data.data.category);
        setProducts(data.data.products);
      })
      .finally(() => setLoding(false));
  }, [id]);

  const showProducts = products.map((pro, key) => (
    <ProductItem data={pro} key={key} col={true} sale={true} />
  ));

  return (
    <div className="h-screen">
      {loding ? (
        <div className="mt-5">
          <div className="mb-3">
            <SkeletonPage number={1} width="500px" height="64px" />
          </div>
          <SkeletonPage number={5} width="252.5px" height="350px" wrap={true} />
        </div>
      ) : (
        <>
          <h1 className="d-flex justify-content-center mt-5 gap-2">
            Category: <p className="text-primary fw-bold">{nameCatigory}</p>
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
            {showProducts}
          </div>
        </>
      )}
    </div>
  );
}
