import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Checkbox, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "~/components/Button";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function UserInfo() {
  const { user } = useAuth0();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img
          className={cx("img-user")}
          src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
          alt=""
        />
        <div className={cx("info-user")}>
          <span className={cx("name")}>{user?.name}</span>
          <span className={cx("location")}>
            828 Sư Vạn Hạnh, Phường 12, Quận 10
          </span>
        </div>
      </div>
      <div className={cx("content")}>
        <TextField
          className={cx("input-data")}
          id="name"
          label={user?.name}
          placeholder="Nhập tên bạn muốn thay đổi"
          variant="outlined"
        />
        <TextField
          className={cx("input-data")}
          id="address"
          label="Địa chỉ"
          variant="outlined"
        />
        <TextField
          className={cx("input-data")}
          id="phone"
          label="Số điện thoại"
          variant="outlined"
        />
        <DatePicker className={cx("input-data")} label="Ngày sinh" />

        <TextField
          className={cx("input-data")}
          id="email"
          label="Email"
          variant="outlined"
        />
        <div className={cx("form-checkbox")}>
          <div className={cx("checkbox-item")}>
            <Checkbox defaultChecked />
            <span className={cx("name-checkbox")}>Nam</span>
          </div>
          <div className={cx("checkbox-item")}>
            <Checkbox defaultChecked />
            <span className={cx("name-checkbox")}>Nữ</span>
          </div>
        </div>
      </div>
      <div className={cx("btn-action")}>
        <Button userInfo>Lưu thay đổi</Button>
      </div>
    </div>
  );
}

export default UserInfo;
