import { createContext, useContext, useEffect, useState } from "react";
import { ChangeAlContext } from "./ChangeAllContext";

const Theme = createContext({});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const { isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    const local = window.localStorage.getItem("theme") || "light";
    setTheme(local);
  }, [isChange]);

  return <Theme.Provider value={theme}>{children}</Theme.Provider>;
}

export const useTheme = () => useContext(Theme);
