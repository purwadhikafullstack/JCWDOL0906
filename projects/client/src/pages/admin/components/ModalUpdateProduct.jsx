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
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ModalUpdateProduct = ({
  Open,
  Close,
  isError,
  Title,
  Cancel,
  Submit,
  categories,
  setCategory,
  productName,
  categoryId,
  price,
  description,
  indication,
  dose,
  rules,
  setProductName,
  setCategoryId,
  setPrice,
  setDescription,
  setIndication,
  setDose,
  setRules,
}) => {

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
              <Input type="text" placeholder="Product Name" id="product_name" defaultValue={productName} onChange={setProductName} />
              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl>
              <FormLabel> Category </FormLabel>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                id="category_id"
                defaultValue={categoryId}
              >
                <option value="">Select categories </option>
                {categories.map((category, index) =>

                  <option value={category.id} key={index}>
                    {category.category_name}
                  </option>

                )}
              </Select>
            </FormControl>

            <FormControl isInvalid={isError}>
              <FormLabel>Price</FormLabel>
              <Input type="text" placeholder="Price" id="price" defaultValue={price} onChange={setPrice} />

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
              <Input type="text" placeholder="Description" id="description" defaultValue={description} onChange={setDescription} />
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
              <Input type="text" placeholder="Indication" id="indication" defaultValue={indication} onChange={setIndication} />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Dose</FormLabel>
              <Input type="text" placeholder="Dose" id="dose" defaultValue={dose} onChange={setDose} />

              {isError ? (
                <FormErrorMessage>Field is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel>Rules</FormLabel>
              <Input type="text" placeholder="Rules" id="rules" defaultValue={rules} onChange={setRules} />
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

export default ModalUpdateProduct;
