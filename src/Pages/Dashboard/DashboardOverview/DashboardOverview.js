import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Stats } from "../../../Api/Api";
import ItemOverview from "./ItemOverview";
import TableShow from "../../../Components/Dashboard/Table/Table";
import BtnsOrders from "../../../Components/Btn/BtnsOrders";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function DashboardOverview() {
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);
  const [loding, setLoding] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const theme = useTheme();
  const { t } = useTranslation();

  const header = [
    { key: "customer_name", name: t("User Name") },
    { key: "product_names", name: t("Product Name") },
    { key: "image", name: t("Image Product") },
    { key: "total_price", name: t("Total Price") },
    { key: "created_at", name: t("Created At") },
  ];

  useEffect(() => {
    setLoding(true);
    Axios.get(`${Stats}`)
      .then((data) => {
        setOrders(data.data.data);
        setRecentOrders(data.data.data.recent_orders);
      })
      .finally(() => setLoding(false));
  }, [render]);

  return (
    <>
      <div className="mt-4 px-3">
        <ItemOverview data={orders} loding={loding} />
      </div>
      <div
        className={`mx-2 ${theme === "light" ? "bg-light-card" : "bg-dark-card"} shadow mt-3 p-2 px-3 rounded-4`}
      >
        <h2 className="m-0 fw-bold">{t('Latest orders')}</h2>
        <hr />
        <BtnsOrders
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setRender={setRender}
        />

        <TableShow
          header={header}
          loding={loding}
          data={recentOrders}
          Interactions={"orders"}
          setRender={setRender}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </>
  );
}
