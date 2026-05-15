import {
  faCheck,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { useState } from "react";
import Loding from "../../Loding/Loding";
import PaginatedItems from "../Pagination/Pagination";
import TransformDate from "../../../helpers/TransformDate";
import HandleSearch from "../../../helpers/HandleSearch";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import { ORDERS, USER } from "../../../Api/Api";
import {
  faClock,
  faCommentDots,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";
import "./table.css";

export default function TableShow(props) {
  // Global State
  const [lodingDelet, setLodingDelete] = useState(false);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [searchDate, SetSearchDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoding, setSearchLoding] = useState(false);
  const [lodingStatus, setLodingStatus] = useState({});
  const { addToast } = useToast();

  const showSearchDate = filteredData.slice(
    (props.page - 1) * props.limit,
    props.page * props.limit,
  );
  const showWhichData =
    search.length > 0 || searchDate.length > 0 ? showSearchDate : props.data;
  const total =
    search.length === 0 && searchDate.length === 0
      ? props.totalData
      : filteredData.length;

  const pendingOrders = showWhichData?.filter(
    (item) => item.status === "pending",
  );

  // Handle Delete User
  async function handleDelete(id) {
    setId(id);
    setLodingDelete(true);
    try {
      await Axios.delete(`${props.delete}/${id}`);
      setLodingDelete(false);
      props.setRender((prev) => !prev);
    } catch (err) {
      console.log(err.message);
    }
  }

  // دالة لاختيار أو إلغاء اختيار صف واحد
  const handleSelectOne = (id) => {
    props.setSelectedIds?.((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // دالة لاختيار الكل (في الصفحة الحالية)
  const handleSelectAll = () => {
    if (
      props.selectedIds?.length === pendingOrders.length &&
      pendingOrders.length > 0
    ) {
      props.setSelectedIds?.([]);
    } else {
      // 3. لو مش مختارينهم، نختار الـ IDs بتاعة الـ pending بس
      const pendingIds = pendingOrders.map((item) => item.id);
      props.setSelectedIds?.(pendingIds);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "pending") {
      return "bg-warning";
    } else if (status === "confirmed") {
      return "bg-success text-succes";
    } else {
      return "bg-danger text-cancle";
    }
  };

  function handleChangeLimit(e) {
    props.setPage(1);
    props.setLimit(e.target.value);
  }

  const handleUpdateStatus = async (id, newStatus) => {
    setLodingStatus({ status: newStatus, id: id });
    try {
      const url = props.userOrder
        ? `${USER}/order-cancel/${id}`
        : `${ORDERS}/${id}/status`;
      const res = await Axios.put(url, { status: newStatus });

      if (res.data.success) {
        props.setRender((prev) => !prev);
        addToast("Status updated successfully");
      }
    } catch (err) {
      console.error(err);
      addToast("Status update failed, please check your permissions.", "error");
    } finally {
      setLodingStatus({});
    }
  };

  // handle Search

  HandleSearch(
    props.searchName,
    props.searchLink,
    search,
    setSearchLoding,
    setFilteredData,
    searchDate,
    props.setPage,
  );

  const currentUser = props.currentUser || { email: "" };

  const headerShow = props.header.map((item, key) => (
    <th key={key} className="bg-primary text-light">
      {item.name}
    </th>
  ));

  const dataShow = showWhichData?.map((item, key) => (
    <tr key={key}>
      {props.Interactions === "orders" && (
        <td>
          <Form.Check
            type="checkbox"
            checked={
              props.selectedIds?.includes(item.id) && item.status === "pending"
            }
            onChange={() => handleSelectOne(item.id)}
            disabled={item.status !== "pending"}
            style={{
              cursor: item.status === "pending" ? "pointer" : "not-allowed",
            }}
          />
        </td>
      )}
      <td>
        {props.Interactions
          ? item.id
          : key + 1 + (props.page - 1) * props.limit}
      </td>
      {props.header.map((head, index) => (
        <td key={index}>
          {/* التعامل مع الصور */}
          {head.key === "image" || head.key === "avatar" ? (
            <img
              width={head.key === "avatar" ? "40px" : "50px"}
              height={head.key === "avatar" ? "40px" : "50px"}
              src={item[head.key]}
              className={`${head.key === "avatar" && "rounded-circle"}`}
              alt=""
            />
          ) : head.key === "images" ? (
            <div
              className="d-flex align-items-center flex-wrap gap-2"
              style={{ minWidth: "300px" }}
            >
              {item[head.key]?.map((img, key) => (
                <img
                  key={key}
                  width={"40px"}
                  height={"40px"}
                  src={img.image}
                  alt=""
                />
              ))}
            </div>
          ) : /* التعامل مع التواريخ */
          head.key === "created_at" || head.key === "updated_at" ? (
            TransformDate(item[head.key])
          ) : /* تحويل ال role الي نص*/
          head.key === "role" ? (
            item[head.key] === "1995" ? (
              "Admin"
            ) : item[head.key] === "2001" ? (
              "User"
            ) : (
              "Writer"
            )
          ) : head.key === "total_price" ? (
            item[head.key] + " EGP"
          ) : head.key === "status" ? (
            <div className="d-flex align-items-center gap-1">
              <span
                className={`border border-2 ${item[head.key] === "pending" ? "bg-warning" : "bg-success"} rounded-circle`}
                style={{ width: "15px", height: "15px" }}
              />
              {item[head.key] === "pending" ? "New" : "Replied"}
            </div>
          ) : (
            item[head.key]
          )}
          {currentUser && item[head.key] === currentUser.email && " (You)"}
        </td>
      ))}
      {props.Interactions !== "orders" ? (
        <td>
          <div className="d-flex align-items-center gap-2">
            {props.Interactions !== "messages" ? (
              <Link to={`${item.id}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="#0483cc"
                  cursor={"pointer"}
                  fontSize="19px"
                />
              </Link>
            ) : item.status === "pending" ? (
              <div onClick={() => props.handleIdMessage(item.id)}>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  color="#0483cc"
                  cursor={"pointer"}
                  fontSize="19px"
                />
              </div>
            ) : (
              <FontAwesomeIcon icon={faEnvelopeOpen} />
            )}
            {currentUser.email !== item.email &&
              (item.id === id ? (
                lodingDelet ? (
                  <Loding action={true} />
                ) : (
                  <FontAwesomeIcon
                    onClick={() => handleDelete(item.id)}
                    icon={faTrash}
                    color="red"
                    cursor="pointer"
                    fontSize="19px"
                  />
                )
              ) : (
                <FontAwesomeIcon
                  onClick={() => handleDelete(item.id)}
                  icon={faTrash}
                  color="red"
                  cursor="pointer"
                  fontSize="19px"
                />
              ))}
          </div>
        </td>
      ) : (
        <td className="p-2">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <p
              className={`m-0 opacity-75 text-center p-1 rounded-4 col-10 col-md-6 ${getStatusStyle(item.status)}`}
            >
              {item.status === "canceled" ? (
                <div>
                  canceled
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              ) : item.status === "confirmed" ? (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  confirmed
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faClock} />
                  Pending
                </div>
              )}
            </p>
            {item.status === "pending" && (
              <div className="d-flex gap-2">
                {!props.userOrder && (
                  <button
                    onClick={() => handleUpdateStatus(item.id, "confirmed")}
                    className="btn btn-success px-2 py-1 "
                  >
                    {lodingStatus.status === "confirmed" &&
                    lodingStatus.id === item.id ? (
                      <Loding action={true} color="#fff" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleUpdateStatus(item.id, "canceled")}
                  className="btn btn-danger px-2 py-1"
                >
                  {lodingStatus.status === "canceled" &&
                  lodingStatus.id === item.id ? (
                    <Loding action={true} color="#fff" />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </button>
              </div>
            )}
          </div>
        </td>
      )}
    </tr>
  ));
  return (
    <>
      {props.searchLink && (
        <div className="d-flex align-items-center gap-4 mb-3 mt-3">
          <div className="d-flex w-50 align-content-center position-relative">
            <Form.Control
              type="input-search"
              placeholder={`Search By ${props.searchName}...`}
              className="px-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="icon-search position-absolute"
            />
          </div>
          <Form.Control
            type="date"
            className="px-2 w-50"
            value={searchDate}
            onChange={(e) => SetSearchDate(e.target.value)}
          />
        </div>
      )}
      <div className="rounded-4 table-responsive">
        <Table striped bordered hover className="m-0">
          <thead>
            <tr>
              {props.Interactions === "orders" && (
                <th className="bg-primary text-light d-flex align-items-center gap-2">
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      props.selectedIds?.length > 0 &&
                      props.selectedIds?.length === pendingOrders?.length
                    }
                    disabled={pendingOrders?.length === 0}
                    style={{
                      cursor:
                        pendingOrders.length !== 0 ? "pointer" : "not-allowed",
                    }}
                  />
                  Select All
                </th>
              )}
              <th className="bg-primary text-light">
                {props.Interactions
                  ? props.Interactions === "orders"
                    ? "Order ID"
                    : "Message ID"
                  : "id"}
              </th>
              {headerShow}
              <th className="bg-primary text-light">
                {props.Interactions === "orders"
                  ? "Condition & Control"
                  : "Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.loding || searchLoding ? (
              <tr>
                <td colSpan={12}>
                  <div className="d-flex justify-content-center gap-2 align-items-center position-relative">
                    <h6>{props.loding ? "Loding" : "Searching"}</h6>
                    <p className="m-0 loding-teble">
                      <span
                        id="sp-1"
                        style={{ left: searchLoding ? "52.5%" : "52%" }}
                      >
                        .
                      </span>
                      <span
                        id="sp-2"
                        style={{ left: searchLoding ? "53%" : "52.5%" }}
                      >
                        .
                      </span>
                      <span
                        id="sp-3"
                        style={{ left: searchLoding ? "53.5%" : "53%" }}
                      >
                        .
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
            ) : dataShow?.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center text-secondary">
                  Nothing was found
                </td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>

      <div>
        {total > props.limit && (
          <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 px-3 mt-3">
            <Form.Select
              aria-label="Default select example"
              style={{ width: "80px" }}
              onChange={handleChangeLimit}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Select>
            <PaginatedItems
              limit={props.limit}
              setPage={props.setPage}
              total={total}
            />
          </div>
        )}
      </div>
    </>
  );
}
