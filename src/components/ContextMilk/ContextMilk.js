import { createContext, useState } from "react";
export const MilkContext = createContext();

function ContextMilk({ children }) {
  const [currentUser, setCurrentUser] = useState(true);
  return (
    <MilkContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
