import { useContext, useEffect } from "react";
import { ChangeAlContext } from "../Context/ChangeAllContext";

export default function CheckProductQuantity(setStock, data) {
  const { isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    const filterProduct = getProduct.filter((pro) => pro.id === data.id);
    if (filterProduct.length > 0) {
      setStock(
        filterProduct[0].count
          ? data.stock - filterProduct[0].count
          : data.stock,
      );
    } else {
      setStock(data.stock);
    }
  }, [isChange, data]);
}
