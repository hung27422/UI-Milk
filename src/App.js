import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/routes";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { MilkContext } from "./components/ContextMilk/ContextMilk";
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
function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setApiToken } = useContext(MilkContext);
  const [loginUser] = useMutation(LOGIN_USER, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (isAuthenticated) {
      const input = {
        input: {
          email: user?.email,
          imageURL: user?.picture, // 'picture' thay thế cho 'imageURL' nếu cần
          name: user?.name || "null",
          phoneNumber: "0987654321",
          roleId: user?.roleId || 1,
          token: user?.token || "1",
        },
      };
      const getAPI = async () => {
        try {
          const response = await loginUser({ variables: { input } });
          const userCreatedPayload = response.data.loginUser.userCreatedPayload;

          // Lấy giá trị apiToken từ phản hồi và lưu trữ nó trong local storage
          const token = userCreatedPayload.apiToken;
          setApiToken(token);

          // Lưu giá trị vào local storage
          localStorage.setItem("apiToken", token);
        } catch (error) {
          console.error("Lỗi tạo user:", error);
        } finally {
          console.log("Tạo user thành công");
        }
      };
      getAPI();
    }
  }, [isAuthenticated]);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((router, index) => {
            let Layout = DefaultLayout;
            if (router.layout) {
              Layout = router.layout;
            }
            const Page = router.component;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
