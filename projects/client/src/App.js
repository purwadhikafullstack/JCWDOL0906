// import dependencies
import { useDispatch } from "react-redux";
import { login } from "../src/redux/userSlice";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckLogin } from "./utils/checklogin";
import "./App.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChakraProvider, Img } from "@chakra-ui/react";
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
import StoreProductDetail from "./components/store/product/productDetail";
import ShoppingCart from "./pages/user/shoppingCart";
import UserProduct from "./pages/user/product";
import UserProfile from "./pages/user/profile/user";
import CheckOut from "./pages/user/checkOut";
import UserTransaction from "./pages/user/transaction";
import { Loading } from "./components/loading";
import { ChangePassword } from "./pages/user/profile/changepass";
import ModalPrescription from "./pages/user/prescription/prescriptionpage";

function App() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let keepLogin = async () => {
    let response = await CheckLogin();
    if (response.dataUser !== null) {
      dispatch(login(response.dataUser));
      localStorage.setItem("user", JSON.stringify(response.tokenUser));
    }

  };
  useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 4000);

    keepLogin();
  }, []);

  return (
    <>
      {isLoading ? (<Loading />) :
        (
          <ChakraProvider theme={theme} resetCss={false} position="relative">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <HomePage />}
                  errorElement={<ErrorPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/verification/:token" element={<Verification />} />
                <Route
                  path="*"
                  element={
                    <Dashboard />
                  }
                />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/confirm-email" element={<ConfirmEmail />} />
                <Route path="/store/product" element={<UserProduct />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/prescription" element={<ModalPrescription />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/store/product/detail/:id" element={<StoreProductDetail />} />
                <Route path="/myaccount" Component={UserProfile} />
                <Route></Route>
                <Route path="/mytransaction" element={<UserTransaction />} />
                <Route path="/mytransaction/checkout" element={<CheckOut />} />
                <Route
                  path="/mytransaction/waiting-payment"
                  element={<UserTransaction />}
                />
                <Route
                  path="/mytransaction/waiting-confirmation"
                  element={<UserTransaction />}
                />
                <Route path="/mytransaction/received" element={<UserTransaction />} />
                <Route path="/mytransaction/payment" element={<UserTransaction />} />
                <Route
                  path="/mytransaction/on-the-way"
                  element={<UserTransaction />}
                />
                <Route
                  path="/mytransaction/on-process"
                  element={<UserTransaction />}
                />
                <Route
                  path="/mytransaction/cancelled"
                  element={<UserTransaction />}
                />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        )
      }
    </>
  );
}
export default App;
