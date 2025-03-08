import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-zse8qge31om0dwlh.us.auth0.com"
      clientId="TU4SOfr30wC8StvIXjf3AMgtNFNNnsAp"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/",
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
export default AuthProvider;
