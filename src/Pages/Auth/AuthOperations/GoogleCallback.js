import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";

export default function GoogleCallback() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`,
        );
        console.log(res);
        const token = res.data.access_token;
        cookie.set("Bearer", token, { path: "/" });
        window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }

    GoogleCall();
  }, []);
}
