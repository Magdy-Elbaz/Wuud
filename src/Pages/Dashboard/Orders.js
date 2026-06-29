import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableShow from "../../Components/Dashboard/Table/Table";
import { faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { ORDERS, SearchOrder } from "../../Api/Api";
import BtnsOrders from "../../Components/Btn/BtnsOrders";
import FilterChips from "../../Components/FilterChips";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterChips, setFilterChips] = useState("All");
  const { t } = useTranslation();

  const header = [
    { key: "customer_name", name: t("User Name") },
    { key: "product_names", name: t("Product Name") },
    { key: "image", name: t("Image Product") },
    { key: "total_price", name: t("Total Price") },
    { key: "created_at", name: t("Created At") },
  ];

  // Get All Orders
  useEffect(() => {
    setLoding(true);
    Axios.get(`/${ORDERS}?status=${filterChips}&limit=${limit}&page=${page}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoding(false));
  }, [render, limit, page, filterChips]);

  return (
    <div className="p-2 overflow-hidden px-3">
      <div className="d-flex align-items-center justify-content-between my-2">
        <h2 className="text-secondary">
          {t('Orders Page')} <FontAwesomeIcon icon={faTruckRampBox} />
        </h2>
      </div>
      <div className="mt-4">
        <BtnsOrders
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setRender={setRender}
        />
      </div>

      <FilterChips
        filterChips={filterChips}
        setFilterChips={setFilterChips}
        setPage={setPage}
      />

      <TableShow
        header={header}
        data={orders}
        loding={loding}
        setRender={setRender}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalData={totalData}
        Interactions={"orders"}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
        searchName="Name"
        searchLink={SearchOrder}
      />
    </div>
  );
}
