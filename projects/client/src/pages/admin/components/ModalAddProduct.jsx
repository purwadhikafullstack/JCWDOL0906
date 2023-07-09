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
  // console.log(Data);

  return (
    <>
      <Modal isOpen={Open} onClose={Close} size="2xl">
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
            {/* <FormControl>
              <FormLabel>Category </FormLabel>
              <Select
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                id="is_default"
              >
                <option value="">Choose Category </option>
                <option value="0">Ibu dan Anak </option>
                <option value="1">Yes</option>
              </Select>
            </FormControl> */}
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
