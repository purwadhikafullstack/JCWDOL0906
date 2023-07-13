import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import UploadPrescriptionPage from "./prescriptionpage"
import { Navbar } from "../components/navbar";

const Prescription = () => {
  return (
    <Box bg={useColorModeValue("blue.50", "blue.100")}>
      <Navbar />
      <div className="home-container">
        {/* <SimpleSlider/> */}
        <UploadPrescriptionPage />
      </div>
    </Box>
  );
};

export default Prescription;