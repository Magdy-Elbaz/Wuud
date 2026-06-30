import ShowProductsQuantity from "../../ShowproductsQuantity";
import Stars from "../../CustomerComments/Stars";
import { useTranslation } from "react-i18next";

export default function MetaProduct({ product, stock, singleProduct }) {
  const sale = product.price - product.discount;
  const { t } = useTranslation();

  return (
    <div data-aos={singleProduct && "fade-up"}>
      <ShowProductsQuantity stock={stock} />
      <Stars product={product} />
      <div className="d-flex align-items-center gap-1">
        <p className="m-0 text-primary fw-bold" style={{ fontSize: "14px" }}>
          {sale}
          {t("EGP")}
        </p>
        {sale !== +product.price && (
          <span
            className="text-decoration-line-through"
            style={{ fontSize: "12px" }}
          >
            {product.price}
            {t("EGP")}
          </span>
        )}
      </div>
    </div>
  );
}
