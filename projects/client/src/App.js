import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "../src/components/loginForm";
import { RegistrationForm } from "../src/components/registerForm";
import Verification from "./pages/verification";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme/theme.js'
import Dashboard from "./adminLayouts/Admin";
import "./App.css";
import UserHome from "./pages/userHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
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

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<HomePage/>}errorElement={<ErrorPage/>}/>
          <Route path ="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegistrationForm /> }/>
          <Route path="/verification/:token" element={<Verification/>}/>
          <Route path="/userhome" element={<UserHome /> }/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

<Route path ="/" element={<HomePage/>} />
