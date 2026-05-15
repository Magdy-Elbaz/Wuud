import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { LATEST } from "../../../../../Api/Api";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";
import { WindowSize } from "../../../../../Context/WindowContext";

export default function LatestProducties() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const { isChange } = useContext(ChangeAlContext);
  const { windowSize } = useContext(WindowSize);

  useEffect(() => {
    Axios.get(`${LATEST}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, [isChange]);

  const productsShow = products.map((pro, key) => (
    <ProductItem
      key={key}
      data={pro}
      sale={true}
      col={true}
      latestProduct={true}
      iconEye={true}
    />
  ));
  return (
    <div className="col-md-6 col-12 ps-0 ps-md-3">
      <h1 className="m-0">Latest Products</h1>
      <div className="d-flex align-items-center justify-content-center flex-wrap mt-3">
        {loding ? (
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <SkeletonPage
              number={4}
              height={"350px"}
              width={windowSize <= "768" ? windowSize - 30 + "px" : "306px"}
              wrap={true}
            />
          </div>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
