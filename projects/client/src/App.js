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
// import UserProduct from "./pages/user/product";
import StoreProductDetail from "./components/store/product/productDetail";
import ShoppingCart from "./pages/user/shoppingCart";
import UserProduct from "./pages/user/product";
import logo_gmedsnial from "./assets/svg/logogmedsnial1.png"
import MyAccount from "./pages/user/profile/account";
import Address from "./pages/user/profile/address";
import UserProfile from "./pages/user/profile/user";
import CheckOut from "./pages/user/checkOut";
import UserTransaction from "./pages/user/transaction";
// import ProtectedRoute from "./protected/protectedroute";
import { Loading } from "./components/loading";
import { ChangePassword } from "./pages/user/profile/changepass";
import Prescriptions from "./components/prescription";
import ModalPrescription from "./pages/user/prescription/prescriptionpage";

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
  const [isLoading, setisLoading] = useState(true);


  let keepLogin = async () => {
    let response = await CheckLogin();
    console.log(response);
    if (response.dataUser !== null) {
      dispatch(login(response.dataUser));
      localStorage.setItem("user", JSON.stringify(response.tokenUser));
    }
    // setisLoading(false);
  };
  useEffect(() => {
    // setisLoading(true);
    const userLogin = JSON.parse(localStorage.getItem("user"));
    // if (userLogin) {
    //   dispatch(login(userLogin));
    // }
    setTimeout(() => {
      setisLoading(false);
    }, 3000);

    keepLogin();
  }, []);

  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={
            <HomePage />}
            errorElement={<ErrorPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route path="/userhome" element={<UserHome /> }/>
          <Route
            path="*"
            element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
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
          <Route path="/admin/unit" Component={Dashboard} />
        </Routes> */}
        {isLoading ? <div
          style={{
            display: "flex",
            height: "80vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={logo_gmedsnial}
            className="w-30 h-25 align-middle rounded-full animate-bounce"
          />
        </div> : <Routes>
          <Route path="/" element={
            <HomePage />}
            errorElement={<ErrorPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route
            path="*"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/store/product" element={<UserProduct />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/prescription" element={<ModalPrescription />} />
          <Route path="/checkout" element={<CheckOut />} />

          <Route
            path="/store/product/detail/:id"
            element={<StoreProductDetail />}
          />
          {/* <Route path="/myaccount" Component={MyAccount} /> */}
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

          {/* <Route path="/admin/unit" Component={Dashboard} /> */}
        </Routes>}


      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
