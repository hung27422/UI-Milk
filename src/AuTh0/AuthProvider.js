import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root"));
function AuthProvider({ children }) {
  return root.render(
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
