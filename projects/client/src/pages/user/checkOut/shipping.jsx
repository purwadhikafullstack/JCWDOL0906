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

const Shipping = ({
  serviceCost,
  setServiceCost,
  couriers,
  setCouriers,
  address,
  setAddress,
}) => {
  const [origin, setOrigin] = useState("153");
  const [destination, setDestination] = useState("151");
  const [weight, setWeight] = useState(1000);
  const [courier, setCourier] = useState("jne");
  const [shippingCosts, setShippingCosts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [detail, setDetail] = useState([]);

  const dispatch = useDispatch();

  const getAddress = async (e) => {
    try {
      let result = await axios.get("http://localhost:8000/api/address", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      setDetail(result.data.data);
      const defaultAddress = detail.filter((address) => {
        return address.is_default == true;
      });
      setSelectedAddress(defaultAddress[0]);
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log("eror", error);
    }
  };

  const getShippingCost = async () => {
    try {
      let body = { origin, destination, weight, courier };
      let result = await axios.post(
        "http://localhost:8000/api/shipping",
        body,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            key: "3c6f80ae7c2a7015198565033977602b",
          },
        }
      );
      setShippingCosts(result?.data?.data?.results[0]?.costs);
    } catch (error) {
      // swalFailed(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    getShippingCost();
  }, [courier]);

  // const handleAccount = () => {
  //   navigate("/ordersuccess");
  // };

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Card>
        <CardHeader>
          <Heading size="ml">Shipping Address</Heading>
        </CardHeader>
      </Card>

      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Your Addresses
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={4} align="flex-start">
              <Stack>
                {detail.map((detail, index) =>
                  detail.is_default ? (
                    <Button
                      size="lg"
                      name="1"
                      colorScheme="blue"
                      onClick={() => {
                        setSelectedAddress(detail);
                        dispatch(addAddress({ address_id: detail.id }));
                      }}
                    >
                      {detail.label +
                        " " +
                        detail.address_name +
                        " " +
                        detail.province_name +
                        " " +
                        detail.city_name +
                        " " +
                        detail.postal_code}
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      name="1"
                      colorScheme="blue"
                      onClick={() => setSelectedAddress(detail)}
                    >
                      {detail.label +
                        " " +
                        detail.address_name +
                        " " +
                        detail.province_name +
                        " " +
                        detail.city_name +
                        " " +
                        detail.postal_code}
                    </Button>
                  )
                )}
              </Stack>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <form onSubmit={() => {}}>
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
  );
};

// check out di klik, tampilin modal yg nampilin detail transaksi dan gambar payment bank bca beswerta no rek nya

export default Shipping;
