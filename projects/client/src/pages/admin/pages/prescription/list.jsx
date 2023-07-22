// import {
//   Box,
//   Button,
//   Card,
//   Editable,
//   EditableInput,
//   EditablePreview,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   StatHelpText,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
//   useDisclosure,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";

// const Prescription = () => {
//   const textColor = useColorModeValue("gray.700", "white");
//   const { onOpen, onClose, isOpen } = useDisclosure();

//   return (
//     <Card p="5px" maxW={{ sm: "320px", md: "50%" }}>
//       <Flex direction="column">
//         <Flex align="center" justify="space-between" p="22px">
//           <Text fontSize="lg" color={textColor} fontWeight="bold">
//             Default Units
//           </Text>
//           <Button variant="primary" maxH="30px" onClick={onOpen}>
//             Add New
//           </Button>
//         </Flex>
//         <Box overflow={{ sm: "scroll", lg: "hidden" }}> Prescription</Box>
//       </Flex>
//     </Card>
//   );
// };

// export default Prescription;

import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Image,
  Button,
  Input,
  Grid,
  Text,
} from "@chakra-ui/react";
import { apiRequest } from "../../../../helper/api";
import { swalFailed, swalSuccess } from "../../../../helper";

// 1. ambil data transaction dari database dengan where code: code
// useState transaction buat simpan datanya, panggil useeffect apiRequest hit ke backend ambil data transaksi (routes transaction/:code)
// 2. foto resep, transaction.prescription taro di dlm image src
// 3. buat state products, useEffects getProducts, apireq get

//4. buat handler untuk submit botton (isi: hit api request.patch), backend 1. update table transaction dengan data yg baru
//2. create table transaction_details sesuai yg di prescription

// getCartByUserID di backend, kl dr fe function getcart panggil di useEffect, hit ke api ke halaman get/cart/:, hasilnya simpan
// di state cart yang menyimpan cart dr userID tertentu, mapping, harga, qty, subtotal hasil dr cart

function Prescription({ code }) {
  const [chosenProducts, setChosenProducts] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [image, setImage] = useState({});
  const [transactionCode, setTransactionCode] = useState({});
  const [products, setProducts] = useState([]);

  // Function to handle product selection and quantity input

  // const getTransaction = async (e) => {
  //   try {
  //     let result = await apiRequest.get("/transaction", {
  //       headers: {
  //         Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
  //       },
  //     });
  //     setTransactions(result.data.data);
  //     console.log(result.data.data);
  //   } catch (error) {
  //     swalFailed(error.response.data.message);
  //     console.log(error);
  //   }
  // };

  const getTransactionByCode = async (code) => {
    try {
      let result = await apiRequest.get(`/transaction/${code}/code`);
      console.log(result);
      setTransactionCode(result.data.data.transaction[0]);
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
      console.log(error);
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = chosenProducts.find((p) => p.id === product.id);
    if (existingProduct) return; // Avoid adding duplicate products

    setChosenProducts([...chosenProducts, { ...product, quantity: 1 }]);
  };

  const handleQuantityChange = (productId, quantity) => {
    setChosenProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: quantity } : product
      )
    );
  };

  const addPrescriptionToCart = async (product_id, qty) => {
    try {
      let result = await apiRequest.post(
        "/cart/resep",
        { product_id, qty },
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
          },
        }
      );
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
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
          {products.map((product) => (
            <Button
              key={product.id}
              onClick={() => handleProductSelect(product)}
              variant="outline"
            >
              {product.product_name}
            </Button>
          ))}
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
                <Button
                  onClick={() =>
                    handleQuantityChange(product.id, product.quantity - 1)
                  }
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
                </Button>
              </HStack>
              <Button
                onClick={() =>
                  addPrescriptionToCart(product.id, product.quantity)
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
        {chosenProducts.map((product) => (
          <Box key={product.id} borderWidth="1px" p={2} borderRadius="md">
            <Box>{product.quantity}</Box>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}

export default Prescription;
