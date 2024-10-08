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
  const [indexAddress, setIndexAddress] = useState([]);
  const [addressRefetch, setAddressRefetch] = useState(null);
  const [guest, setGuest] = useState(null);
  const [showOrderGuest, setShowOrderGuest] = useState(null);
  const [buttonQuantity, setButtonQuantity] = useState();
  const [inventory, setInventory] = useState();
  const [idInventory, setIdInventory] = useState();
  const [discount, setDiscount] = useState();
  const [code, setCode] = useState();
  const [isCheckedPoint, setIsCheckedPoint] = useState(false);

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
        indexAddress,
        setIndexAddress,
        addressRefetch,
        setAddressRefetch,
        guest,
        setGuest,
        showOrderGuest,
        setShowOrderGuest,
        buttonQuantity,
        setButtonQuantity,
        inventory,
        setInventory,
        idInventory,
        setIdInventory,
        discount,
        setDiscount,
        code,
        setCode,
        isCheckedPoint,
        setIsCheckedPoint,
      }}
    >
      {children}
    </MilkContext.Provider>
  );
}

export default ContextMilk;
