import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import BtnSubmit from "../../../../Components/Btn/BtnSubmit";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";
import { useToast } from "../../../../Context/Toast Notification/ToastNotification";
import { useTheme } from "../../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function EditAvatar({ setOpen, avatar, setRender }) {
  const refInput = useRef();
  const [showImage, setShowImage] = useState(avatar);
  const [urlImg, setUrlImg] = useState("");
  const [loding, setLoding] = useState(false);
  const { addToast } = useToast();
  const theme = useTheme();
  const { t } = useTranslation();

  const avtarName = [
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
  ];

  const handleSave = async () => {
    setLoding(true);
    const formData = new FormData();
    formData.append("avatar", urlImg);
    try {
      await Axios.post(`${USER}/update-avatar`, formData);
      setRender((prev) => !prev);
      addToast("Modified successfully");
      setOpen("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="w-100 h-100 position-absolute edit d-flex align-items-center justify-content-center">
      <div
        className="position-absolute click-Close cursor-pointer"
        onClick={() => setOpen("")}
      />
      <div
        className={`${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-4 w-50 p-2`}
      >
        <div className="d-flex align-content-center justify-content-between">
          <p className="m-0 fw-bold">{t('Edit Avatar')}</p>
          <button
            className={`btn btn-close ${theme === "dark" && "bg-light"}`}
            onClick={() => setOpen("")}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <div className="position-relative">
            <img
              src={showImage}
              alt="avatar"
              width={"200px"}
              height={"200px"}
              className="cursor-pointer rounded-circle icon-user"
              onClick={() => refInput.current.click()}
            />
            <FontAwesomeIcon icon={faPenToSquare} className="icon_editAvatar" />
          </div>
          <input
            type="file"
            className="d-none"
            ref={refInput}
            onChange={(e) => {
              const file = URL.createObjectURL(e.target.files[0]);
              setShowImage(file);
              setUrlImg(e.target.files[0]);
            }}
          />
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          {avtarName.map((imgAvatar, key) => (
            <img
              src={require(`../../../../Assets/${imgAvatar}`)}
              alt=""
              key={key}
              width={"80px"}
              className="cursor-pointer"
              onClick={(e) => {
                setShowImage(e.target.src);
                setUrlImg(imgAvatar);
              }}
            />
          ))}
        </div>
        <BtnSubmit name={t("Save")} loding={loding} click={handleSave} />
      </div>
    </div>
  );
}
