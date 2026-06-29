import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableShow from "../../Components/Dashboard/Table/Table";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CONTACT, CONTACTS, MESSAGES, REPLY } from "../../Api/Api";
import { Button, Form, Modal } from "react-bootstrap";
import BtnSubmit from "../../Components/Btn/BtnSubmit";
import { useToast } from "../../Context/Toast Notification/ToastNotification";
import { useTranslation } from "react-i18next";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loding, setLoding] = useState(false);
  const [render, setRender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reply, setReply] = useState("");
  const [lodingReply, setLodingReply] = useState(false);
  const [idMessage, setIdMessage] = useState(0);
  const { addToast } = useToast();
  const [replied, setReplied] = useState({ status: "pending", id: "" });
  const { t } = useTranslation();

  const header = [
    { key: "status", name: t("Status") },
    { key: "name", name: t("User Name") },
    { key: "email", name: t("Email") },
    { key: "message", name: t("Message") },
    { key: "created_at", name: t("Created At") },
  ];

  useEffect(() => {
    setLoding(true);
    Axios.get(`${MESSAGES}?limit=${limit}&page=${page}`)
      .then((mas) => {
        setMessages(mas.data.data);
        setTotal(mas.data.total);
      })
      .finally(() => setLoding(false));
  }, [render, limit, page]);

  const handleChangeShowModal = () => setShowModal((prev) => !prev);

  const handleIdMessage = (id) => {
    handleChangeShowModal();
    setIdMessage(id);
  };

  async function handleSendMessage() {
    setLodingReply(true);
    try {
      const res = await Axios.post(`${CONTACTS}/${idMessage}/${REPLY}`, {
        reply: reply,
      });
      addToast(res.data.message);
      handleChangeShowModal();
      setReply("");
      setRender((prev) => !prev);
      setReplied({ status: "replied", id: idMessage });
    } catch (err) {
      console.log(err);
    } finally {
      setLodingReply(false);
    }
  }

  return (
    <div className="p-2 overflow-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="mx-3 text-secondary mt-2">
          {t("Customer Messages")} <FontAwesomeIcon icon={faMessage} />
        </h2>
      </div>
      <div className="mt-4">
        <TableShow
          loding={loding}
          header={header}
          data={messages}
          totalData={total}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          setRender={setRender}
          Interactions={"messages"}
          handleIdMessage={handleIdMessage}
          replied={replied}
          delete={CONTACT}
        />
      </div>
      <Modal show={showModal} onHide={handleChangeShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete All")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder={t("Reply to the message")}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleChangeShowModal}>
            {t("Close")}
          </Button>
          <div onClick={handleSendMessage}>
            <BtnSubmit
              name={t("Send")}
              width="60px"
              loding={lodingReply}
              disabled={reply.length < 5}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
