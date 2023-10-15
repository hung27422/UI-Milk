import { createContext, useState } from "react";
export const MilkContext = createContext();

function ContextMilk({ children }) {
  const [currentUser, setCurrentUser] = useState(true);
  const [active, setActive] = useState("1");
  const [total, setTotal] = useState(8000);
  const [activeStep, setActiveStep] = useState(0);
  return (
    <MilkContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        active,
        setActive,
        total,
        setTotal,
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
