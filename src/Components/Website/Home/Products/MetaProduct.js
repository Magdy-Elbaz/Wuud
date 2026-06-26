import ShowProductsQuantity from "../../ShowproductsQuantity";
import Stars from "../../CustomerComments/Stars";

export default function MetaProduct({ product, stock, singleProduct }) {
  const sale = product.price - product.discount;
  return (
    <div data-aos={singleProduct && "fade-up"}>
      <ShowProductsQuantity stock={stock} />
      <Stars product={product} />
      <div className="d-flex align-items-center gap-1">
        <p className="m-0 text-primary fs-5 fw-bold">${sale}</p>
        {sale !== +product.price && (
          <span className="text-decoration-line-through">${product.price}</span>
        )}
      </div>
    </div>
  );
}
