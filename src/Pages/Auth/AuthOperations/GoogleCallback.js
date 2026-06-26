import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import Loding from "../../../Components/Loding/Loding";

export default function GoogleCallback() {
  const cookie = Cookie();
  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`,
        );
        const token = res.data.access_token;
        cookie.set("Bearer", token, { path: "/" });
        window.location.href = "/";
      } catch (err) {
        console.log(err);
      }
    }

    GoogleCall();
  }, []);

  return <Loding />;
}
