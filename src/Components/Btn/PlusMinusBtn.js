import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(props.count || 1);

  useEffect(() => {
    props.setCount && props.setCount(+btn);
    if (+btn < 1 ) {
      setBtn(1);
    } else if (+btn > props.stock) {
      setBtn(props.stock);
    }

    if (props.changeCount) {
      props.changeCount(props.id, +btn);
    }
  }, [btn]);

  useEffect(() => {
    props.count && setBtn(props.count);
  }, [props.count]);

  return (
    <div className="d-flex align-items-center gap-2 w-100">
      <button
        className="btn btn-primary fw-bold py-1 px-2"
        onClick={() => {
          if (+btn > 1) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(1);
          }
        }}
        disabled={+btn === 1}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input
        type="number"
        value={btn}
        onChange={(e) => setBtn(e.target.value)}
        style={{ width: "60px" }}
        className="ps-2 border border-secondary rounded-2"
      />
      <button
        className="btn btn-primary fw-bold py-1 px-2"
        onClick={() => setBtn((prev) => ++prev)}
        disabled={+btn === props.stock}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
