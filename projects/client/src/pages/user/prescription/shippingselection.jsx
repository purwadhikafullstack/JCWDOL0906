import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Select,
  Button,
  VStack,
  Image,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Textarea,
  Avatar,
  Radio,
  Stack,
  Text,
  Flex,
  RadioGroup,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Provider, useDispatch } from "react-redux";
import { swalFailed, swalSuccess } from "../../../helper";
import { Address } from "../profile/address";
import { addAddress, addCourier } from "../../../redux/cartSlice";
import { apiRequest } from "../../../helper/api";

const ShippingSelection = () => {
  const [origin, SetOrigin] = useState("153");
  const [destination, setDestination] = useState("151");
  const [weight, setWeight] = useState(1000);
  const [courier, setCourier] = useState("JNE");
  const [shippingCosts, setShippingCosts] = useState([]);
  const [serviceCost, setServiceCost] = useState([]);
  const dispatch = useDispatch();

 useEffect(() => {
  const fetchShippingCost = async () => {
    try {
      const tokenUser = JSON.parse(localStorage.getItem("user"));
      console.log("", tokenUser);

      const body = { origin, destination, weight, courier };
        const result = await apiRequest.post("/shipping", body, 
        {
          headers: {
            authorization: `Bearer ${tokenUser}`,
            key: "3c6f80ae7c2a7015198565033977602b",
          },
        });
        setShippingCosts(result?.data?.data?.results[0]?.costs);
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
    }
  };
  fetchShippingCost();
 }, [courier]);

 return (
  <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Card>
        <CardHeader>
          <Heading size="ml">Shipping</Heading>
        </CardHeader>
      </Card>
      <form onSubmit={() => { }}>
        <VStack spacing={4}>
          <Text
            w="full"
            fontWeight="bold"
            borderBottom="1px solid #b41974"
            pb={1}
            mb={2}
          >
            Choose Courier
          </Text>
          <FormControl>
            <Select
              value={courier}
              onChange={(e) => {
                setCourier(e.target.value);
                dispatch(addCourier({ courier: e.target.value }));
                // , setCouriers(e.target.value);
              }}
              id="courier"
            >
              <option value="jne">JNE</option>
              <option value="pos">POS</option>
              <option value="tiki">TIKI</option>
            </Select>
          </FormControl>

          <VStack w="full" align="left">
            <Text
              w="full"
              fontWeight="bold"
              borderBottom="1px solid #b41974"
              pb={1}
              mb={2}
            >
              Choose Service
            </Text>

            <FormControl w="full">
              <Select
                onChange={(e) => {
                  setServiceCost(e.target.value);
                }}
                id="service_cost"
                value={serviceCost}
              >
                {shippingCosts.map((item, index) => {
                  console.log(item);
                  return (
                    <>
                      <option value={item?.cost[0].value}>
                        <Flex>
                          <Text>{item?.service} </Text>
                          <Text> {item?.cost[0].etd} Days </Text>
                          <Text>
                            {Number(item.cost[0].value).toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </Text>
                        </Flex>
                      </option>
                    </>
                  );
                })}
              </Select>
            </FormControl>
          </VStack>
        </VStack>
      </form>
    </Box>
 )
};

export default ShippingSelection;