"use client";
import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

const cx = classNames.bind(styles);
const RENEW_TOKEN = gql`
  mutation RenewToken($input: userRenewTokenInput!) {
    renewToken(input: $input) {
      userCreatedPayload {
        apiToken
        message
      }
    }
  }
`;
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const [renewToken] = useMutation(RENEW_TOKEN, {
    fetchPolicy: "network-only",
  });
  const userIdLocal = localStorage.getItem("userId");
  const { setApiToken } = useContext(MilkContext);

  const handleLogin = async () => {
    const userRenewTokenInput = {
      input: {
        id: userIdLocal,
      },
    };

    try {
      const response = await renewToken({
        variables: { input: userRenewTokenInput.input },
      });
      // Access the data from the response
      const userCreatedPayload = response.data.renewToken.userCreatedPayload;
      // Retrieve and store the apiToken
      const token = userCreatedPayload.apiToken;
      setApiToken(token);
      localStorage.setItem("apiToken", token);
      console.log("kq", token);
    } catch (error) {
      console.error("Lỗi tạo token:", error);
    } finally {
      console.log("Tạo token thành công");
    }
    loginWithRedirect();
  };
  return (
    <button className={cx("btn-login")} onClick={handleLogin}>
      Log in
    </button>
  );
};

export default LoginButton;
