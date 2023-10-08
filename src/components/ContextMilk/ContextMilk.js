import { createContext, useState } from "react";
export const MilkContext = createContext();

function ContextMilk({ children }) {
  const [currentUser, setCurrentUser] = useState(true);
  const [active, setActive] = useState("1");
  return (
    <MilkContext.Provider
      value={{ currentUser, setCurrentUser, active, setActive }}
    >
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
