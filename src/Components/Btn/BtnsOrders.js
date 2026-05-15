import { useState } from "react";
import { ExportOrders, ORDERS, UpdateStatus } from "../../Api/Api";
import Loding from "../Loding/Loding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Api/Axios";
import { useToast } from "../../Context/Toast Notification/ToastNotification";

export default function BtnsOrders(props) {
  const [lodingExcel, setLodingExcel] = useState(false);
  const [lodingConfirmed, setLodingConfirmed] = useState(false);
  const [lodingCancel, setLodingCancel] = useState(false);
  const { addToast } = useToast();

  async function handleExportExcel() {
    setLodingExcel(true);
    try {
      const res = await Axios.get(`${ExportOrders}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Orders_Report_${new Date().toLocaleDateString()}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    } finally {
      setLodingExcel(false);
    }
  }

  const handleBulkApprove = async (status) => {
    if (status === "confirmed") {
      setLodingConfirmed(true);
    } else {
      setLodingCancel(true);
    }

    try {
      await Axios.post(`/${ORDERS}/${UpdateStatus}`, {
        ids: props.selectedIds,
        status: status,
      });
      props.setRender((prev) => !prev);
      props.setSelectedIds([]);
      addToast(`The ${status} process was successful.`);
    } catch (error) {
      console.error("حدث خطأ أثناء التحديث", error);
    } finally {
      if (status === "confirmed") {
        setLodingConfirmed(false);
      } else {
        setLodingCancel(false);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
      {!props.noBtnExcel && (
        <button
          className="btn btn-success"
          onClick={handleExportExcel}
          style={{ width: "154px" }}
        >
          {lodingExcel ? (
            <Loding action={true} color={"#fff"} />
          ) : (
            <>
              Export to Excel <FontAwesomeIcon icon={faCloudArrowDown} />
            </>
          )}
        </button>
      )}
      <div className="d-flex align-items-center gap-2">
        {!props.pageOrderUser && (
          <button
            className="btn btn-success"
            style={{ width: "145px" }}
            disabled={props.selectedIds.length === 0}
            onClick={() => handleBulkApprove("confirmed")}
          >
            {lodingConfirmed ? (
              <Loding action={true} color="#fff" />
            ) : (
              `Confirmed on ${props.selectedIds.length}`
            )}
          </button>
        )}
        <button
          className="btn btn-danger"
          style={{ width: "145px" }}
          disabled={props.selectedIds.length === 0}
          onClick={() => handleBulkApprove("canceled")}
        >
          {lodingCancel ? (
            <Loding action={true} color="#fff" />
          ) : (
            `
          Cancel on ${props.selectedIds.length}`
          )}
        </button>
      </div>
    </div>
  );
}
