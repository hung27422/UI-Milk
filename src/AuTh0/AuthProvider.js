import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-jsawhwvxx4erzy36.jp.auth0.com"
      clientId="5Y7zJIqmMkeDhbPc1xxOOim0o1SubZ7i"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
export default AuthProvider;
