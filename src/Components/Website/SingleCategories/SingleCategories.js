import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORY, PRODUCTS } from "../../../Api/Api";
import ProductItem from "../Home/Products/ProductItem/ProductItem";
import SkeletonPage from "../SkeletonPage";
import PageHeader from "../PageHeader";
import { Container } from "react-bootstrap";
import BtnSeeMore from "../../Btn/BtnSeeMore/BtnSeeMore";
import NoSearch from "../NoSearch";

export default function SingleCategories() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    value: "newest",
    label: "Newest",
  });
  const [nameCatigory, setNameCatigory] = useState("");
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const [limit, setLimit] = useState(16);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lodingSeeMore, setLodingeeMore] = useState(false);

  useEffect(() => {
    if (search === "") {
      !lodingSeeMore && setLoding(true);
      Axios.get(
        `${CATEGORY}/${id}/${PRODUCTS}?sort=${selectedOption.value}&&limit=${limit}`,
      )
        .then((data) => {
          setNameCatigory(data.data.category_title);
          setProducts(data.data.products);
          setTotalProducts(data.data.total_products);
        })
        .finally(() => {
          setLoding(false);
          setLodingeeMore(false);
        });
    }
  }, [id, limit, selectedOption, search]);

  const showProducts = products.map((pro, key) => (
    <ProductItem data={pro} key={key} col={true} sale={true} />
  ));

  return (
    <div className="h-screen">
      <Container>
        <PageHeader
          title="Category"
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setLoding={setLoding}
          setData={setProducts}
          setTotalCategories={setTotalProducts}
          limit={limit}
        />
        {loding ? (
          <div className="my-5">
            <div className="mb-3">
              <SkeletonPage number={1} width="250px" height="64px" />
            </div>
            <SkeletonPage
              number={16}
              width="252.5px"
              height="350px"
              wrap={true}
              gap="gap-5"
            />
          </div>
        ) : (
          <div className="my-5">
            <h2 className="text-center">{nameCatigory}</h2>
            <div className="d-flex align-items-center justify-content-center">
              <hr className="my-3 w-50" />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-5 flex-wrap">
              {products.length === 0 ? <NoSearch /> : showProducts}
            </div>
            {products.length < totalProducts && (
              <BtnSeeMore
                setLimit={setLimit}
                setLodingeeMore={setLodingeeMore}
                lodingSeeMore={lodingSeeMore}
                singleCategory={true}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
