import { useState } from "react";
import TopProfile from "../../../Components/Website/TopProfile";
import { Form } from "react-bootstrap";
import BtnSubmit from "../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../Api/Axios";
import { EDIT, USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";

export default function Profile(props) {
  const { setRender, user } = useUser();
  // Global State
  const [image, setImage] = useState("");
  const [loding, setLoding] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  const navigate = useNavigate();

  // Ref
  const previewUrl = image !== "" && URL.createObjectURL(image);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleEditUser() {
    setLoding(true);
    try {
      const formData = new FormData();
      if (image !== "") {
        formData.append("avatar", image);
      }
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      await Axios.post(`${USER}/profile/${EDIT}`, formData);
      setRender((prev) => !prev);
    } catch (err) {
      navigate("/login", { replace: true });
    } finally {
      setLoding(false);
    }
  }
  return (
    <>
      <TopProfile
        role={props.role}
        setOpenProfile={props.setOpenProfile}
        editUser={true}
        setImage={setImage}
        image={previewUrl}
      />
      <hr />
      <div>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter Name ..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter Email ..."
            required
          />
        </Form.Group>
        <div onClick={handleEditUser}>
          <BtnSubmit
            loding={loding}
            name={"Save"}
            width="100%"
            className="btn btn-primary"
            disabled={userData.name === "" || userData.email === ""}
          />
        </div>
      </div>
    </>
  );
}
