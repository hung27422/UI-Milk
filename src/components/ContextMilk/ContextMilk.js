import { createContext, useState } from "react";
export const MilkContext = createContext();

function ContextMilk({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [active, setActive] = useState("1");
  const [total, setTotal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepOrder, setActiveStepOrder] = useState(0);
  const [products, setProducts] = useState();
  const [idProduct, setIdProduct] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showTotal, setShowTotal] = useState(false);
  const [nameSize, setNameSize] = useState("");
  const [isChecked, setIsChecked] = useState(1);
  const [priceSize, setPriceSize] = useState();
  const [apiToken, setApiToken] = useState(null);
  const [countQuantity, setCountQuantity] = useState(0);

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
        activeStepOrder,
        setActiveStepOrder,
        products,
        setProducts,
        idProduct,
        setIdProduct,
        cartItem,
        setCartItem,
        showTotal,
        setShowTotal,
        quantity,
        setQuantity,
        nameSize,
        setNameSize,
        isChecked,
        setIsChecked,
        priceSize,
        setPriceSize,
        apiToken,
        setApiToken,
        countQuantity,
        setCountQuantity,
      }}
    >
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
