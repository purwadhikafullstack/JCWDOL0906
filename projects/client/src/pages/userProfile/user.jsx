import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import MyAccount from "./account";
import { Navbar } from "../../components/navbar";

const UserProfile = () => {
  return (
    <Box bg={useColorModeValue("blue.50", "blue.100")}>
      <Navbar />
      <div className="home-container">
        {/* <SimpleSlider/> */}
        <MyAccount />
      </div>
    </Box>
  );
};

export default UserProfile;
