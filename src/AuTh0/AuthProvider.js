import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-zse8qge31om0dwlh.us.auth0.com"
      clientId="6mNu2Dwxqvai9vX65n26bX59ZB82DspH"
      authorizationParams={{
        redirect_uri: "https://ui-milk.vercel.app/",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
export default AuthProvider;
