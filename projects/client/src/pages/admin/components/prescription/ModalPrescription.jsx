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
import Prescription from "../../pages/prescription/list";

const ModalPrescription = ({
  Open,
  Close,
  isError,
  Title,
  Cancel,
  Submit,
  checkOutPrescription,
  code,
}) => {
  return (
    <>
      <Modal isOpen={Open} onClose={Close} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Title}</ModalHeader>
          <ModalCloseButton onClose={Close} />
          <ModalBody pb={6}>
            <Prescription code={code} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={checkOutPrescription}>
              Check Out
            </Button>
            <Button onClick={Cancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPrescription;
