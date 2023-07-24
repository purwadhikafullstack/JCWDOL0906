import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  VStack,
  HStack,
  Image,
  Button,
  Input,
  Grid,
  Text,
  Select,
} from "@chakra-ui/react";
import { apiRequest } from "../../../../helper/api";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../../redux/cartSlice";
import { rupiah, swalFailed } from "../../../../helper";

function Prescription({ code }) {
  const dispatch = useDispatch();
  const [chosenProducts, setChosenProducts] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [image, setImage] = useState({});
  const [transactionCode, setTransactionCode] = useState({});
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [carts, setCart] = useState([]);
  const { cart, total_price } = useSelector((state) => state.cartSlice);

  const getTransactionByCode = async (code) => {
    try {
      let result = await apiRequest.get(`/transaction/${code}/code`);

      setTransactionCode(result.data.data.transaction[0]);
      setUserId(result.data.data.transaction[0].user_id);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getProduct = async () => {
    try {
      let result = await apiRequest.get("/product");
      setProducts(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);

    }
  };

  const handleProductSelect = (product) => {

    const newProduct = product.split(">");
    const existingProduct = chosenProducts.find(
      (p) => p.product_name === newProduct[1]
    );
    if (existingProduct) return; // Avoid adding duplicate products

    setChosenProducts([
      ...chosenProducts,
      {
        id: newProduct[0],
        product_name: newProduct[1],
        conversionUnit: newProduct[2],
        quantity: 1,
      },
    ]);
  };

  const handleQuantityChange = (productId, quantity) => {
    setChosenProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: quantity } : product
      )
    );
  };

  const totalPricePrescription = async () => {
    try {
      const result = await apiRequest.get("/cart/resep?user_id=" + userId);
      setCart(result.data.data);

      let data = result.data.data;
      let total_qty = 0;
      let total_price = 0;
      data.forEach((i) => {
        if (i.conversion_unit !== null) {
          total_qty += i.qty;
          total_price += i.total_price;
        }
      });
      dispatch(add({ cart: total_qty, total_price: total_price }));
    } catch (error) {

    }
  };

  const addPrescriptionToCart = async (product_id, qty, conversion_unit) => {
    try {
      let result = await apiRequest.post(
        "/cart/resep",
        { userId, product_id, qty, conversion_unit },
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
          },
        }
      );
      setTimeout(() => {
        totalPricePrescription();
      }, 2000);
    } catch (error) {
      swalFailed(error.response.data.message);

    }
  };

  useEffect(() => {
    getTransactionByCode(code);
    getProduct();
  }, []);

  return (
    <Grid templateColumns="1fr 1fr" gap={8} justifyContent="center">
      {/* Left Box */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
          Prescription {code}
        </Text>
        {/* Display uploaded picture from the user */}
        <Image
          src={process.env.REACT_APP_IMAGE_API + transactionCode.prescription}
          alt="Uploaded Picture"
        />
      </Box>

      {/* Right Box */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md" ml={4}>
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
          Drug List
        </Text>
        {/* List of products */}
        <VStack spacing={2} alignItems="stretch">
          <Select
            id="product"
            onChange={(e) => handleProductSelect(e.target.value)}
          >
            <option value=""> Drug List </option>
            {products.map((product, index) => {
              return (
                <option
                  key={product.id}
                  value={
                    product.id +
                    ">" +
                    product.product_name +
                    ">" +
                    product.conversionUnit
                  }
                >
                  {product.product_name}
                </option>
              );
            })}
          </Select>
        </VStack>
      </Box>

      {/* Chosen Products */}
      {/* Chosen Products */}
      <VStack
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        mt={4}
        width="100%"
        alignItems="stretch"
      >
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
          Prescription's Ingredients
        </Text>
        {chosenProducts.map((product) => (
          <Box key={product.id} borderWidth="1px" p={2} borderRadius="md">
            <HStack spacing={4}>
              <Box>{product.product_name}</Box>
              <HStack>
                <Input
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
                {/* <Button
                  onClick={() => {
                    product.quantity === 1
                      ? handleQuantityChange(product.id, product.quantity)
                      : handleQuantityChange(product.id, product.quantity - 1);
                  }}
                >
                  -
                </Button>
                <Text>
                  {product.quantity} {product.conversionUnit}
                </Text>
                <Button
                  onClick={() =>
                    handleQuantityChange(product.id, product.quantity + 1)
                  }
                >
                  +
                </Button> */}
              </HStack>
              <Button
                onClick={() =>
                  addPrescriptionToCart(
                    product.id,
                    product.quantity,
                    product.conversionUnit
                  )
                }
              >
                Add to Cart
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
          TOTAL {code} PAYMENT
        </Text>
        <Stack spacing="6">
          <Flex justify="space-between">
            <Text fontSize="xl" fontWeight="extrabold">
              {rupiah(total_price)}
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Prescription;
