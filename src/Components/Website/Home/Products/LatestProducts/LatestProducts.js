import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { LATEST } from "../../../../../Api/Api";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem/ProductItem";
import { ChangeAlContext } from "../../../../../Context/ChangeAllContext";
import { WindowSize } from "../../../../../Context/WindowContext";
import { useTranslation } from "react-i18next";

export default function LatestProducties() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const { isChange } = useContext(ChangeAlContext);
  const { windowSize } = useContext(WindowSize);
  const { t,i18n } = useTranslation();

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
    <div className={`col-lg-6 col-12 ${i18n.language === "ar" ? "pe-md-5" : "ps-md-5"}`}>
      <h1 className="m-0">{t('Latest Products')}</h1>
      <div className="d-flex align-items-center flex-wrap mt-3 gap-4">
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
