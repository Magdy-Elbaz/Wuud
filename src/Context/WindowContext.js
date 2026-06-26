import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowProvider({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function WindowWidth() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", WindowWidth);

    return () => window.removeEventListener("resize", WindowWidth);
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize }}>{children}</WindowSize.Provider>
  );
}
