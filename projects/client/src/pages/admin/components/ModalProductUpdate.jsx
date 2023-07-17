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

const ModalProductUpdate = ({
  Open,
  Close,
  isError,
  Data,
  Title,
  SetUnit,
  Cancel,
  Submit,
}) => {
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
              <Input type="file" placeholder="Image" id="image" />
              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Description</FormLabel>
              <Input type="text" placeholder="Description" id="description" />
              {/* <Textarea
                placeholder="Description"
                defaultValue={Data.description}
                onChange={SetUnit}
              /> */}

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Indication</FormLabel>
              <Input type="text" placeholder="Indication" id="indication" />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Dose</FormLabel>
              <Input type="text" placeholder="Dose" id="dose" />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Rules</FormLabel>
              <Input type="text" placeholder="Rules" id="rules" />
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

export default ModalProductUpdate;
