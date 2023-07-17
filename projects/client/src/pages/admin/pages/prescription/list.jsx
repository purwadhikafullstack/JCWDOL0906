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

import React, { useState } from "react";
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

function Prescription() {
  const [chosenProducts, setChosenProducts] = useState([]);
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  // Function to handle product selection and quantity input
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

  return (
    <Grid templateColumns="1fr 1fr" gap={8} justifyContent="center">
      {/* Left Box */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
          Prescription
        </Text>
        {/* Display uploaded picture from the user */}
        <Image src="path_to_uploaded_picture" alt="Uploaded Picture" />
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
              {product.name}
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
              <Box>{product.name}</Box>
              <HStack>
                <Button
                  onClick={() =>
                    handleQuantityChange(product.id, product.quantity - 1)
                  }
                >
                  -
                </Button>
                <Text>{product.quantity}</Text>
                <Button
                  onClick={() =>
                    handleQuantityChange(product.id, product.quantity + 1)
                  }
                >
                  +
                </Button>
              </HStack>
              <Button>Add to Cart</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Grid>
  );
}

export default Prescription;
