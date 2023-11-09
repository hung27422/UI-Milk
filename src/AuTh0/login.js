"use client";
import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";

const cx = classNames.bind(styles);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    loginWithRedirect();
  };
  return (
    <button className={cx("btn-login")} onClick={handleLogin}>
      Log in
    </button>
  );
};

export default LoginButton;
