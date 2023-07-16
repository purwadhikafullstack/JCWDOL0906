import { Flex, Grid } from "@chakra-ui/react";
import React from "react";
import TransactionList from "./list";

const Transaction = () => {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "120px", lg: "100px" }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <TransactionList />
      </Grid>
    </Flex>
  );
};

export default Transaction;
