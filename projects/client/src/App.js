// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme/theme.js'
import Dashboard from "./adminLayouts/Admin";
import Units from "./admin/pages/units";

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
  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <HashRouter>

        <Routes>
          <Route path="*" element={<Dashboard />} />
          {/* <Route path="/admin/unit" Component={Dashboard} /> */}
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
