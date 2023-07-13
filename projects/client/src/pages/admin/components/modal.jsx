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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ModalEditForm = ({
  Open,
  Close,
  isError,
  Data,
  Title,
  SetUnit,
  Cancel,
  Submit,
}) => {
  console.log(Data);
  return (
    <>
      <Modal isOpen={Open} onClose={Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Title}</ModalHeader>
          <ModalCloseButton onClose={Close} />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError}>
              <FormLabel>Unit name</FormLabel>
              <Input
                placeholder="Unit name"
                id="unit"
                defaultValue={Data.unit_name}
                onChange={SetUnit}
              />
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

export default ModalEditForm;
