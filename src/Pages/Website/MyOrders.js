import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { MYORDERS } from "../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableShow from "../../Components/Dashboard/Table/Table";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import FilterChips from "../../Components/FilterChips";
import BtnsOrders from "../../Components/Btn/BtnsOrders";
import { useTranslation } from "react-i18next";

export default function MyOrders(props) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [loding, setLoding] = useState(false);
  const [render, setRender] = useState(false);
  const [filterChips, setFilterChips] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const { t, i18n } = useTranslation();

  const header = [
    { key: "customer_name", name: t("User Name") },
    { key: "product_names", name: t("Product Name") },
    { key: "image", name: t("Product Image" )},
    { key: "total_price", name: t("Total Price") },
    { key: "created_at", name: t("Created At") },
  ];

  useEffect(() => {
    setLoding(true);
    Axios.get(`${MYORDERS}?page=${page}&limit=${limit}&status=${filterChips}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotal(data.data.total);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoding(false));
  }, [render, page, filterChips, limit]);

  return (
    <Container dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="h-screen p-2 overflow-hidden">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="title-page text-secondary mt-2" data-aos="fade-right">
            {t("My Orders")} <FontAwesomeIcon icon={faBoxes} />
          </h2>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <FilterChips
              setFilterChips={setFilterChips}
              filterChips={filterChips}
              setPage={setPage}
            />
            <BtnsOrders
              noBtnExcel={true}
              setRender={setRender}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              pageOrderUser={true}
            />
          </div>
          <TableShow
            limit={limit}
            page={page}
            setLimit={setLimit}
            setPage={setPage}
            header={header}
            data={orders}
            totalData={total}
            setRender={setRender}
            loding={loding}
            Interactions={"orders"}
            userOrder={true}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
    </Container>
  );
}
