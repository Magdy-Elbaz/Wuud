import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { FAVORITES } from "../../Api/Api";
import { ChangeAlContext } from "../../Context/ChangeAllContext";
import ProductItem from "../../Components/Website/Home/Products/ProductItem";
import SkeletonPage from "../../Components/Website/SkeletonPage";

export default function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const { isChange } = useContext(ChangeAlContext);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${FAVORITES}`)
      .then((data) => setFavorites(data.data.data))
      .catch(() => setFavorites([]))
      .finally(() => setLoding(false));
  }, [isChange]);

  const showData = favorites.map((data, key) => (
    <ProductItem
      key={key}
      data={data}
      col={true}
      sale={true}
      iconEye={true}
      latestProduct={false}
    />
  ));

  return (
    <div className="h-screen">
      <Container>
        <h1
          className="fw-bold text-light text-center pt-1 pb-3 mt-4"
          style={{ backgroundColor: "#e5c293" }}
        >
          Your Wishlist
          <FontAwesomeIcon icon={faHeart} />
        </h1>
        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap my-4">
          {loding ? (
            <SkeletonPage
              number={5}
              width={"250px"}
              height={"350px"}
              wrap={true}
            />
          ) : favorites.length > 0 ? (
            showData
          ) : (
            <p className="fs-5 mt-3 ">Your wish list is empty</p>
          )}
        </div>
      </Container>
    </div>
  );
}
