import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { USER } from "../Api/Api";
import { useNavigate } from "react-router-dom";

const userContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [lodingUser, setLodingUser] = useState(false);
  const [render, setRender] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  console.log(user)

  useEffect(() => {
    setLodingUser(true);
    Axios.get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => showNav && navigate("/login", { replace: true }))
      .finally(() => setLodingUser(false));
  }, [render]);

  return (
    <userContext.Provider
      value={{ user, lodingUser, setShowNav, setRender, setUser }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
