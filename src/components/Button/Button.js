import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary,
  select,
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
  });
  return (
    <Comp className={classes} {...props}>
      <span className={cx("title")}>{children}</span>
    </Comp>
  );
}

export default Button;
