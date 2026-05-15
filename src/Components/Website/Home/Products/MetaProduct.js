import ShowProductsQuantity from "../../ShowproductsQuantity";
import Stars from "../../CustomerComments/Stars";

export default function MetaProduct({ product, stock }) {
  const sale = product.price - product.discount;
  return (
    <div>
      <ShowProductsQuantity stock={stock} />
      <Stars product={product} />
      <div className="d-flex align-items-center gap-2">
        <p className="m-0 text-primary fs-4 fw-bold">${sale}</p>
        {sale !== +product.price && (
          <span className="text-decoration-line-through">${product.price}</span>
        )}
      </div>
    </div>
  );
}
