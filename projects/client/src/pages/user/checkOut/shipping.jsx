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
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Provider } from "react-redux";
import { swalFailed, swalSuccess } from "../../../helper";
import { Address } from "../../userProfile/address";

const Shipping = ({ serviceCost, setServiceCost }) => {
  const [origin, setOrigin] = useState("153");
  const [destination, setDestination] = useState("151");
  const [weight, setWeight] = useState(1000);
  const [courier, setCourier] = useState("jne");
  const [shippingCosts, setShippingCosts] = useState([]);
  const [showAddress, setShowAddress] = useState("");
  const [selectedCityID, setSelectedCityId] = useState(0);

  // logic buat ambil city id yg is default terus disimpan di destination
  // berat total dari produk yang ada di cart simpan di weight
  //   const fetchUserAddress = async() => {
  //     try {
  //         await axiosInstance.get(`/user/address/${userSelector?.id}`).then((res) => {
  //             const data = res.data.result
  //             setUserAddress([...data])
  //             data.map((val) => {
  //                 val.isDefault ? setAddressDefault({...val}) : null
  //             })

  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // const fetchDataCart = async() => {
  //     try {
  //         await axiosInstance.get(`/cart/${userSelector?.id}`).then((res) => {
  //             const data = res.data.result
  //             setCart([...data])
  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // const renderDataCart = () => {
  //     return cart ? cart?.map((val) => {
  //         totalPrice += (val.product_price * val.quantity)
  //         return (
  //             <>
  //                 <CartCard
  //                     product_name = {val.product.product_name}
  //                     product_price = {val.product_price}
  //                     quantity = {val.quantity}
  //                     image_url = {val.product.product_imgs[0].img_url}
  //                     product_stock = {val.product.product_stocks[0].main_stock}
  //                     product_id = {val.product_id}
  //                     user_id = {userSelector?.id}
  //                     cart_id = {val.id}
  //                 />
  //             </>
  //         )
  //     }) : <div></div>
  // }

  // const selectedAddress = () => {
  //     return (
  //         <VStack w='full' p={2} fontSize={16} align='start'>
  //             <HStack w='full' align='center' justify='space-between'>
  //                 <Text fontWeight='bold'>{addressDefault.name}, +62{addressDefault.phone_number}</Text>
  //                 <ModalChangeAddress
  //                     userAddress = {userAddress}
  //                 />
  //             </HStack>

  //             <Text w='60%'>{addressDefault.address_line}, {addressDefault.province}, {addressDefault.city}, {addressDefault.post_code} </Text>
  //         </VStack>
  //     )
  // }

  // const renderDataOrder = async() => {
  //     const order = await axiosInstance.post("/order", {
  //         user_id: userSelector?.id,
  //         order_price: totalPrice,
  //         user_address_id: addressDefault?.id,
  //         shipping_price: shippingPrice
  //     })

  //     cart.map(async(val) => {
  //         try {
  //             await axiosInstance.post('/order/detail', {
  //                     product_id: val.product_id,
  //                     user_id: userSelector?.id,
  //                     quantity: val.quantity,
  //                     product_price: val.product_price,
  //                     order_id : order?.data.result.id
  //                 }
  //             )
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     })

  //     router.push(`/payment/${order.data.result.id}`)

  // }

  // const deliveryCost = async (courier) => {
  //     console.log(courier)
  //     const body = {
  //         origin: 457,
  //         destination: addressDefault?.city_id,
  //         weight: 10000,
  //         courier: courier
  //     }

  //     try {
  //         await axios.post("https://api.rajaongkir.com/starter/cost", {"origin": "455", "destination": `${addressDefault?.city_id}`, "weight": `1000`, "courier": courier }  , {headers: {"key" : "0e29b3cb4f74364cf38c45d5d71ad96e"}}, qs.stringify(body)).then((res) => {
  //             console.log(res)
  //             const data = res.data.rajaongkir.results[0]
  //             setDeliveryOption(data.costs)
  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // useEffect(() => {
  //     fetchUserAddress()
  //     selectedAddress()
  //     fetchDataCart()
  //     renderDataCart()
  //     deliveryCost()
  // }, [autoRender, router?.isReady])

  const getAddress = async (e) => {
    try {
      let result = await axios.get("http://localhost:8000/api/address", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      setShowAddress(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
    }
  };

  // const createAddressHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let detail = document.getElementById("detail").value;
  //     let province_name = province.split("/")[1];
  //     let province_id = province.split("/")[0];
  //     let city_name = city.split("/")[1];
  //     let city_id = city.split("/")[0];
  //     let label = document.getElementById("label").value;
  //     let postal_code = document.getElementById("postal_code").value;
  //     let is_default = document.getElementById("is_default").value;

  //     let data = {
  //       detail,
  //       province_name,
  //       province_id,
  //       city_name,
  //       city_id,
  //       label,
  //       is_default,
  //       postal_code,
  //     };
  //     console.log(data);

  //     let result = await axios.post("http://localhost:8000/api/address", data, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("userToken"),
  //       },
  //     });
  //     getAddress();
  //     // swalSuccess(result.data.message);
  //   } catch (error) {
  //     // swalFailed(error.response.data.message);
  //   }
  // };

  // const cityFilter = async (e) => {
  //   try {
  //     const arrayCity = cities.filter(
  //       (e) => e.province_id === province.split("/")[0]
  //     );
  //     setNewCity(arrayCity);
  //     console.log(arrayCity);
  //   } catch (error) {}
  // };

  // const codeFilter = (e) => {
  //   const arrayCode = codes.filter((e) => e.city_id === city.split("/")[0]);
  //   setCode(arrayCode);
  //   console.log(arrayCode);
  // };

  // useEffect(() => {
  //   getAddress();
  // }, []); lalu simpan di sebuah state address, setAddress
  // get address ada state setAddress, bikin logic buat ambil yang is_default
  //drop down spt di fe address

  const getShippingCost = async () => {
    try {
      let body = { origin, destination, weight, courier };
      console.log(body);
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
      console.log(result);
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
                    <Radio size="lg" name="1" colorScheme="blue" defaultChecked>
                      {detail.label +
                        " " +
                        detail.detail +
                        " " +
                        detail.province_name +
                        " " +
                        detail.city_name +
                        " " +
                        detail.postal_code}
                    </Radio>
                  ) : (
                    <Radio size="lg" name="1" colorScheme="blue">
                      {detail.label +
                        " " +
                        detail.detail +
                        " " +
                        detail.province_name +
                        " " +
                        detail.city_name +
                        " " +
                        detail.postal_code}
                    </Radio>
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
              onChange={(e) => setCourier(e.target.value)}
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

          <Button colorScheme="blue" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Shipping;
