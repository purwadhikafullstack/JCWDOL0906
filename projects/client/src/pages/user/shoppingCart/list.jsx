import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { rupiah, swalFailed } from "../../../helper";
import { Link, useNavigate } from "react-router-dom";
import {
  BsDash,
  BsDashCircle,
  BsDashLg,
  BsPlus,
  BsPlusCircle,
  BsPlusLg,
  BsTrash,
  BsTrash2,
} from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { add } from "../../../redux/cartSlice";
import ProductCard from "../../../components/store/product/productCard";
import { apiRequest } from "../../../helper/api";

const List = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [carts, setCart] = useState([]);
  const [recomendItem, setRecomendItem] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [paging, setPaging] = useState([]);
  const [records, setRecords] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [product, setProduct] = useState([]);
  const user = useSelector((state) => state.userSlice);
  const { cart, total_price } = useSelector((state) => state.cartSlice);
  console.log("carts1", carts);

  const getCart = async () => {
    try {
      const result = await apiRequest.get("/cart?page=1", {
        headers: {
          authorization: `Bearer ${user.value.verification_token}`,
        },
      });

      // console.log(result.data.data)
      console.log("GET");
      setCart(result.data.data);
      let data = result.data.data;
      let total_qty = 0;
      let total_price = 0;
      data.forEach((i) => {
        total_qty += i.qty;
        total_price += i.total_price;
      });
      dispatch(add({ cart: total_qty, total_price: total_price }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemQty = async (id, method) => {
    try {
      const result = await apiRequest.patch(
        "/cart/" + id,
        {
          method: method,
        },
        {
          headers: {
            authorization: `Bearer ${user.value.verification_token}`,
          },
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast({
          title: "",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };

  const deleteItem = async (id, method) => {
    try {
      const result = await apiRequest.delete("/cart/" + id, {
        headers: {
          authorization: `Bearer ${user.value.verification_token}`,
        },
      });
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const getRecomendItem = () => {
    let item = product.filter(
      (pr) => !carts.find((cr) => cr.product_id === pr.id)
    );
    setRecomendItem(item);
  };

  const getData = async () => {
    try {
      const result = await apiRequest.get("/store/product?page=" + pageNumber);
      setProduct(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  useEffect(() => {
    getCart();
    getData();
  }, [cart]);
  console.log("DATA USER", user.value.username);
  useEffect(() => {
    if (user.value.username === "") {
      setCart([]);
      getData();
    } else {
      getCart();
    }
  }, [user]);

  useEffect(() => {
    getRecomendItem();
  }, [carts]);

  const handleAccount = () => {
    navigate("/checkout");
  };

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex="2">
          <Stack
            spacing="6"
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Container maxW="container.xl" p={5} mt={5}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Keranjang
              </Heading>
              {carts.length > 0
                ? carts.map((i) => (
                    <Flex
                      borderWidth="1px"
                      rounded="lg"
                      padding="2"
                      width="full"
                      mt={2}
                      justifyContent="space-between"
                      bgColor="white"
                    >
                      <HStack>
                        <Image
                          rounded="lg"
                          width="120px"
                          height="120px"
                          fit="cover"
                          src={process.env.REACT_APP_IMAGE_API + i.image}
                          alt=""
                          draggable="false"
                          loading="lazy"
                        />
                        <Box pt="4">
                          <Stack spacing="0.5">
                            <Text fontWeight="medium">{i.product_name}</Text>
                            <Text
                              color={mode("gray.600", "gray.400")}
                              fontSize="sm"
                            >
                              {rupiah(i.price)}
                            </Text>
                          </Stack>
                        </Box>
                      </HStack>

                      <Flex alignItems="end">
                        <Button
                          variant="ghost"
                          w="fit-content"
                          size="sm"
                          ml={2}
                          onClick={() => deleteItem(i.product_id, "minus")}
                        >
                          <Icon as={BsTrash} h={5} w={5} alignSelf={"center"} />
                        </Button>

                        <Box>
                          <Flex alignItems="center">
                            <Button
                              variant="ghost"
                              w="fit-content"
                              size="sm"
                              ml={2}
                              onClick={() =>
                                updateItemQty(i.product_id, "minus")
                              }
                            >
                              <Icon
                                as={BsDashCircle}
                                h={5}
                                w={5}
                                alignSelf={"center"}
                              />
                            </Button>
                            <Text px={3} mb={0} fontWeight="medium">
                              {i.qty}
                            </Text>
                            <Button
                              variant="ghost"
                              w="fit-content"
                              size="sm"
                              mr={2}
                              onClick={() =>
                                updateItemQty(i.product_id, "plus")
                              }
                            >
                              <Icon
                                as={BsPlusCircle}
                                h={5}
                                w={5}
                                alignSelf={"center"}
                              />
                            </Button>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                  ))
                : "Cart is Empty"}
            </Container>
            <Container maxW="container.xl" p={5} mt={5}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Rekomendasi untukmu
              </Heading>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {recomendItem.length === 0 && user.value.username === ""
                  ? product.map((i, index) => (
                      <ProductCard
                        key={index}
                        image={process.env.REACT_APP_IMAGE_API + i.image}
                        product_name={i.product_name}
                        price={i.price}
                        id={i.id}
                        category={i.category}
                        description={i.description}
                        dose={i.dose}
                        indication={i.indication}
                        rules={i.rules}
                        unit={i.defaultUnit}
                        category_id={i.category_id}
                      />
                    ))
                  : recomendItem.map((i, index) => (
                      <ProductCard
                        key={index}
                        image={process.env.REACT_APP_IMAGE_API + i.image}
                        product_name={i.product_name}
                        price={i.price}
                        id={i.id}
                        category={i.category}
                        description={i.description}
                        dose={i.dose}
                        indication={i.indication}
                        rules={i.rules}
                        unit={i.defaultUnit}
                        category_id={i.category_id}
                      />
                    ))}
              </Grid>
            </Container>
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="full"
            bg="white"
          >
            <Heading size="md">Ringkasan Belanja</Heading>

            <Stack spacing="6">
              <Flex justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  Total {cart} Barang
                </Text>
                <Text fontSize="xl" fontWeight="extrabold">
                  {rupiah(total_price)}
                </Text>
              </Flex>
            </Stack>
            <Button
              colorScheme="blue"
              size="lg"
              fontSize="md"
              rightIcon={<FaArrowRight />}
              onClick={() => handleAccount()}
            >
              Beli
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default List;
