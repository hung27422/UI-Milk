import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import CardItem from "../CartItem/CardItem";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
const cx = classNames.bind(styles);
function CardContent() {
  const [isActiveCard, setIsActiveCard] = useState(1);
  const handleCardClick = (id) => {
    setIsActiveCard(id);
  };
  return (
    <div className={cx("payment-card")}>
      <div className={cx("select-card")}>
        <CardItem
          id={1}
          src={
            "https://admin.tamlyvietphap.vn/uploaded/Images/Original/2020/10/16/logo_vietcombank_1610091313.jpg"
          }
          isActiveCard={isActiveCard}
          handleCardClick={handleCardClick}
        />
        <CardItem
          id={2}
          src={"https://www.onlinecasinoreportsvn.com/images/zalopay-big.png"}
          isActiveCard={isActiveCard}
          handleCardClick={handleCardClick}
        />
      </div>
      <div className={cx("input-card")}>
        <TextField
          id="outlined-basic"
          label="Số tài khoản"
          variant="outlined"
          className={cx("input-number")}
        />
        <FormGroup className={cx("check-save")}>
          <FormControlLabel
            className={cx("input-checkbox")}
            control={<Checkbox defaultChecked />}
            label="Lưu thông tin thanh toán"
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default CardContent;
