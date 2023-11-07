import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import classNames from "classnames/bind";
import styles from "./AvatarUser.module.scss";
import { NavLink } from "react-router-dom";
import configs from "~/configs";
const cx = classNames.bind(styles);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    marginRight: "12px",
  },
}));

export default function AvatarUse() {
  const { user } = useAuth0();

  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className={cx("box-item")}>
              <NavLink to={configs.routes.profile} className={cx("box-link")}>
                Tài khoản của tôi
              </NavLink>
            </div>
            <div className={cx("box-item")}>
              <NavLink to={configs.routes.detailorder} className={cx("box-link")}>Đơn mua</NavLink>
            </div>
          </React.Fragment>
        }
      >
        <Button>
          <img className={cx("avatar")} src={user.picture} alt="avatar" />
        </Button>
      </HtmlTooltip>
    </div>
  );
}
