"use client";
import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);

const LOGIN_USER = gql`
  mutation LoginUser($input: userLoginUserInput!) {
    loginUser(input: $input) {
      userCreatedPayload {
        apiToken
        message
      }
    }
  }
`;

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();
  const { apiToken, setApiToken } = useContext(MilkContext);
  const [loginUser] = useMutation(LOGIN_USER);
  const handleLogin = async () => {
    loginWithRedirect();
    // Thực hiện yêu cầu GraphQL để đăng nhập
    const input = {
      input: {
        email: user?.email,
        imageURL: user?.picture, // 'picture' thay thế cho 'imageURL' nếu cần
        name: user?.name || "null",
        roleId: user?.roleId || 1,
        token: user?.token || "1",
      },
    };

    try {
      const response = await loginUser({ variables: { input } });
      const userCreatedPayload = response.data.loginUser.userCreatedPayload;

      // Lấy giá trị apiToken từ phản hồi và lưu trữ nó trong local storage
      const token = userCreatedPayload.apiToken;
      setApiToken(token);

      // Xóa dòng console.log("API Token: " + apiToken); nếu bạn không cần hiển thị giá trị trên console
      console.log("API Token: " + token); // Hiển thị giá trị mới

      localStorage.setItem("email", user?.email);
      // Lưu giá trị vào local storage
      localStorage.setItem("apiToken", token);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };
  return (
    <button className={cx("btn-login")} onClick={handleLogin}>
      Log in
    </button>
  );
};

export default LoginButton;
