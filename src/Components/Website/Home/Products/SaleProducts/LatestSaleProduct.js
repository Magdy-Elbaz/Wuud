import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../../../../Api/Axios";
import { LatestSale } from "../../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem";
import { WindowSize } from "../../../../../Context/WindowContext";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const { windowSize } = useContext(WindowSize);
  const { isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, [isChange]);

  const productsShow = products.map((pro, key) => (
    <ProductItem
      key={key}
      data={pro}
      sale={true}
      col={true}
      TopRated={false}
    />
  ));

  return (
    <Container>
      <div className="mt-5">
        <h2 className="fw-bold m-0">
          <FontAwesomeIcon icon={faTag} className="fs-3 text-primary" /> Sale
        </h2>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0">
            Timeless pieces, exceptional value. Shop our curated sale collection
            before it's gone.
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 gap-md-2 my-5">
        {loding ? (
          <SkeletonPage
            number={5}
            height={"331px"}
            width={windowSize <= "768" ? windowSize - 30 + "px" : "250px"}
            wrap={true}
          />
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
