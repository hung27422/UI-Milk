import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import ContextMilk from "./components/ContextMilk/ContextMilk";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthProvider from "./AuTh0/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <AuthProvider>
        <ApolloProvider client={client}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ContextMilk>
              <App />
            </ContextMilk>
          </LocalizationProvider>
        </ApolloProvider>
      </AuthProvider>
    </GlobalStyles>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
