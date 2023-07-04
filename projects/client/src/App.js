import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "../src/components/loginForm";
import { RegistrationForm } from "../src/components/registerForm";
import { ResetPassword } from "./pages/reset";
import { ConfirmEmail } from "./pages/confirmemail"
import Verification from "../src/pages/verification";
// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../src/theme/theme';
import Dashboard from "./adminLayouts/Admin";

import "./App.css";
// import UserHome from "./pages/userHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../src/redux/userSlice";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() =>{
    const userLogin = JSON.parse(localStorage.getItem("user"))
if (userLogin) {
  dispatch(login(userLogin))
};
  },[]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<HomePage/>}errorElement={<ErrorPage/>}/>
          <Route path ="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegistrationForm /> }/>
          <Route path="/verification/:token" element={<Verification/>}/>
          {/* <Route path="/userhome" element={<UserHome /> }/> */}
          <Route path="*" element={<Dashboard />} />
          <Route path="/admin/unit" Component={Dashboard} />
          <Route path="/resetpassword/:token" element={<ResetPassword/>} />
          <Route path="/confirmemail" element={<ConfirmEmail/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
