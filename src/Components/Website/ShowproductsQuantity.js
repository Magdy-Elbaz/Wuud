export default function ShowProductsQuantity({ stock }) {
  return stock === 0 ? (
    <p className="m-0 fs-6 text-danger">Not currently available</p>
  ) : stock <= 10 ? (
    <p className="m-0 text-danger">There is only {stock} left</p>
  ) : (
    <p className="m-0 text-success">Available</p>
  );
}
