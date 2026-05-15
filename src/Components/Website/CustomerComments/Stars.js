import { Rating } from "react-simple-star-rating";

export default function Stars({ rating, product, setRating, action }) {
  const formatRating = (val) => {
    if (!val) return 0;
    return val % 1 !== 0 ? Math.floor(val) + 0.5 : val;
  };
  
  return (
    <div className="d-flex align-items-center gap-1">
      <Rating
        onClick={(rate) => {
          action && setRating(rate);
        }}
        initialValue={action ? rating : formatRating(product.rating)}
        readonly={action ? false : true}
        allowFraction={true}
        transition={action && true}
        size={action ? 25 : 20} // حجم النجوم
        fillColor="#ffd700"
      />
      {action && <div>{"(" + rating + "/5)"}</div>}
    </div>
  );
}
