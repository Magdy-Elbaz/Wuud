import { useEffect, useState } from "react";
import { SearchUser, USER, USERS } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table/Table";
import { useUser } from "../../../Context/UserContext";
import { useTranslation } from "react-i18next";

export default function Users() {
  // Users
  const [users, setUsers] = useState([]);

  // Global State
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);
  const { user } = useUser();
  const { t } = useTranslation();

  const headerTable = [
    { key: "avatar", name: t("Avatar") },
    { key: "name", name: t("User Name") },
    { key: "email", name: t("Email") },
    { key: "role", name: t("Role") },
    { key: "created_at", name: t("Created At") },
    { key: "updated_at", name: t("Last Login") },
  ];

  // Get All Users
  useEffect(() => {
    setLoding(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoding(false));
  }, [render, limit, page]);

  return (
    <>
      <div className="p-2 overflow-hidden">
        <div className="d-flex align-items-center justify-content-between pe-2 my-2">
          <h2 className="mx-3 text-secondary">
            {t("Users Page")} <FontAwesomeIcon icon={faUsers} />
          </h2>
          <Link to="/dashboard/user/add" className="btn btn-primary">
            {t("Add User")}
          </Link>
        </div>
        <TableShow
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          totalData={totalData}
          header={headerTable}
          data={users}
          delete={USER}
          currentUser={user}
          setRender={setRender}
          loding={loding}
          searchName="Name"
          searchLink={SearchUser}
        />
      </div>
    </>
  );
}
