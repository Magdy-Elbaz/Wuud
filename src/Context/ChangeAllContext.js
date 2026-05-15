import { createContext, useState } from "react";

export const ChangeAlContext = createContext({});

export default function ChangeAllProvider({ children }) {
  const [isChange, setIsChange] = useState(false);

  return (
    <ChangeAlContext.Provider value={{ isChange, setIsChange }}>
      {children}
    </ChangeAlContext.Provider>
  );
}
