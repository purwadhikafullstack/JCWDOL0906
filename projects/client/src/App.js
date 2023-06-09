// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
// import { useEffect, useState } from "react";
import NotFound from "./error/404";
import Convertion from "./admin/pages/units/conversion";


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
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/conversion-unit" element={<Convertion />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
