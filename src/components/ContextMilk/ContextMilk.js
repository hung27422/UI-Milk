import { createContext, useState } from "react";
export const MilkContext = createContext();

function ContextMilk({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [active, setActive] = useState("1");
  const [total, setTotal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState();
  const [idProduct, setIdProduct] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showTotal, setShowTotal] = useState(false);
  const [soluong, setSoluong] = useState(1);
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
        products,
        setProducts,
        idProduct,
        setIdProduct,
        cartItem,
        setCartItem,
        showTotal,
        setShowTotal,
        soluong,
        setSoluong,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
