import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { TopRated } from "../../../../../Api/Api";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const { isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    Axios.get(`${TopRated}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, [isChange]);

  const productsShow = products.map((pro, key) => (
    <ProductItem
      key={key}
      data={pro}
      col={false}
      sale={false}
      iconEye={true}
      latestProduct={false}
    />
  ));
  return (
    <div className="col-md-6 col-12 border border-primary border-3">
      <h1 className="text-light bg-primary text-center fw-bold p-2">
        Top Rated
      </h1>
      <div className="p-1 top-rated overflow-auto">
        {loding ? (
          <SkeletonPage
            number={5}
            height={"132px"}
            width={"100%"}
            wrap={true}
          />
        ) : productsShow.length !== 0 ? (
          productsShow
        ) : (
          <p className="text-center">There are no highly rated products.</p>
        )}
      </div>
    </div>
  );
}
