import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Stats } from "../../../Api/Api";
import ItemOverview from "./ItemOverview";
import TableShow from "../../../Components/Dashboard/Table/Table";
import BtnsOrders from "../../../Components/Btn/BtnsOrders";

const header = [
  { key: "customer_name", name: "User Name" },
  { key: "product_names", name: "Product Name" },
  { key: "image", name: "Image Product" },
  { key: "total_price", name: "Total Price" },
  { key: "created_at", name: "Created" },
];

export default function DashboardOverview() {
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);
  const [loding, setLoding] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

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
        style={{ backgroundColor: "#fff" }}
        className="mx-2 mt-3 p-2 px-3 rounded-4"
      >
        <h2 className="m-0 fw-bold">Latest orders</h2>
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
