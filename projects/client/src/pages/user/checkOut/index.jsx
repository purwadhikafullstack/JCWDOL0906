import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FooterUserPage from "../../../components/footer";
import { Navbar } from "../../../components/navbar";
import List from "./list";
import Shipping from "./shipping";

const CheckOut = () => {
  const [serviceCost, setServiceCost] = useState(0);
  const [courier, setCourier] = useState(" ");
  const [selectedAddress, setSelectedAddress] = useState(0);

  return (
    <Box bg={useColorModeValue("blue.50", "blue.100")}>
      <Navbar />
      <div className="home-container">
        <List
          serviceCost={serviceCost}
          courier={courier}
          selectedAddress={selectedAddress}
        />
        <Shipping
          serviceCost={serviceCost}
          setServiceCost={setServiceCost}
          courier={courier}
          setCourier={setCourier}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>
      <FooterUserPage />
    </Box>
  );
};

export default CheckOut;
