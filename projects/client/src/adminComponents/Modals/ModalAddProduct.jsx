import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ModalAddProduct = ({
  Open,
  Close,
  isError,
  Data,
  Title,
  SetUnit,
  Cancel,
  Submit,
  setNewProduct,
}) => {
  console.log(Data);
  return (
    <>
      <Modal isOpen={Open} onClose={Close} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Title}</ModalHeader>
          <ModalCloseButton onClose={Close} />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError}>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" placeholder="Product Name" id="product_name" />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Price</FormLabel>
              <Input type="text" placeholder="Price" id="price" />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Image</FormLabel>

              <Input type="text" placeholder="Image" id="image" />
              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={Submit}>
              Save
            </Button>
            <Button onClick={Cancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
