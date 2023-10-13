import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function DeleteProduct() {
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon className={cx("delete-icon")} icon={faTrash} />
    </div>
  );
}

export default DeleteProduct;
