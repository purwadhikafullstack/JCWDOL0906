// import dependencies
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../src/redux/userSlice";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckLogin } from "./utils/checklogin";
// import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "../src/components/loginForm";
import { RegistrationForm } from "../src/components/registerForm";
import { ResetPassword } from "./pages/reset";
import { ConfirmEmail } from "./pages/confirmemail";
import Verification from "../src/pages/verification";
import theme from "../src/theme/theme";
import Dashboard from "./components/adminLayouts/Admin";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import UserProduct from "./pages/user/product";
import StoreProductDetail from "./components/store/product/productDetail";
import ShoppingCart from "./pages/user/shoppingCart";
import UserProduct from "./pages/user/product";
import MyAccount from "./pages/userProfile/account";
// import ProtectedRoute from "./protected/protectedroute";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  let [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  let keepLogin = async () => {
    let response = await CheckLogin();
    console.log(response);
    if (response.dataUser !== null) {
      dispatch(login(response.dataUser));
      localStorage.setItem("user", JSON.stringify(response.tokenUser));
    }
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    // if (userLogin) {
    //   dispatch(login(userLogin));
    // }
    keepLogin();
  }, []);

  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verification/:token" element={<Verification />} />
          {/* <Route path="/userhome" element={<UserHome /> }/> */}
          <Route
            path="*"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/store/product" element={<UserProduct />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route
            path="/store/product/detail/:id"
            element={<StoreProductDetail />}
          />
          <Route path="/myaccount" Component={MyAccount} />
          {/* <Route path="/admin/unit" Component={Dashboard} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
