import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { motion } from "framer-motion"; 
import logogmedsnial2 from "../assets/svg/logogmedsnial2.png";

export function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", 
      }}
    >
      <motion.div
        animate={{ rotate: 360 }} 
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
      >
        <Image src={logogmedsnial2} boxSize="200px" />
      </motion.div>
    </div>
  );
};
