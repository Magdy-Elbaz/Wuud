import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { CONTACT } from "../../../../Api/Api";
import BtnSubmit from "../../../../Components/Btn/BtnSubmit";
import { useToast } from "../../../../Context/Toast Notification/ToastNotification";
import "./contact.css";

export default function ContactUs() {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loding, setLoding] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await Axios.post(`${CONTACT}`, data);
      addToast(res.data.message);
      setData({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoding(false);
    }
  }

  return (
    <>
      <h1 className="text-center fw-bold my-5">
        Contact US <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
      </h1>
      <div className="d-flex align-items-start justify-content-center w-100 mb-5 flex-wrap rounded-4 overflow-hidden">
        <div className="send-message bg-primary col-12 col-md-6">
          <div className="bg-light p-4 send-message-item">
            <h2 className="text-primary fw-bold">Send your message</h2>
            <Form
              className="d-flex align-items-center flex-column mt-3 gap-3"
              onSubmit={handleSubmit}
            >
              <Form.Control
                type="text"
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="User Name..."
                className=" rounded-3 "
                required
              />
              <Form.Control
                type="email"
                value={data.email}
                name="email"
                onChange={handleChange}
                placeholder="Your Email..."
                className=" rounded-3"
                required
              />
              <Form.Control
                as="textarea"
                value={data.message}
                name="message"
                onChange={handleChange}
                placeholder="Your Message"
                className="rounded-3 w-100"
                style={{ minHeight: "90px", maxHeight: "90px" }}
                required
              />
              <BtnSubmit
                loding={loding}
                name={"Send"}
                disabled={
                  data.name === "" || data.email === "" || data.massage === ""
                }
              />
            </Form>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="contactus bg-primary p-4 text-light">
            <h2 className="fw-bold">Contact us</h2>
            <p className="m-0">
              We are here to help you. Send us your message and we will get back
              to you as soon as possible.
            </p>
            <div className="d-flex align-items-center gap-2 my-3">
              <FontAwesomeIcon
                icon={faPhone}
                className="bg-light text-primary p-2 rounded-3"
              />
              <p className="m-0">+20123456789</p>
            </div>
            <div className="d-flex align-items-center gap-2 my-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="bg-light text-primary p-2 rounded-3"
              />
              <p className="m-0">support@wuudstore.com</p>
            </div>
            <div className="d-flex align-items-center gap-2 my-3">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="bg-light text-primary p-2 rounded-3"
              />
              <p className="m-0">Dekernes, Dakahlia, Egypt</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
