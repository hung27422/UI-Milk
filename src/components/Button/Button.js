import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary,
  select,
  pointGift,
  checkout,
  delivery,
  payment,
  orderDone,
  waitConfirm,
  confirmOrderDone,
  discount,
  selectChoose,
  children,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  let props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    primary,
    select,
    pointGift,
    checkout,
    delivery,
    orderDone,
    waitConfirm,
    confirmOrderDone,
    discount,
    payment,
    selectChoose,
  });
  return (
    <Comp className={classes} {...props}>
      <span className={cx("title")}>{children}</span>
    </Comp>
  );
}

export default Button;
