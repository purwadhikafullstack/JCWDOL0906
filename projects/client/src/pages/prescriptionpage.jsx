import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";

const UploadPrescriptionPage = () => {
  const [prescription, setPrescription] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const toast = useToast();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setPrescription(uploadedFile);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleShippingOptionChange = (event) => {
    setSelectedShippingOption(event.target.value);
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleRemoveFile = () => {
    setPrescription(null);
  };
   const handleCancel = () => {
    if (prescription) {
      URL.revokeObjectURL(prescription.preview);
    }
    setPrescription(null);
  };

  const handleSubmit = () => {
    if (!prescription || !selectedAddress || !selectedPaymentMethod || !selectedShippingOption || !agreeTerms) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all the required fields and agree to the terms.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Perform the upload, address selection, payment, and shipping logic here

    toast({
      title: "Prescription Uploaded",
      description: "Your prescription has been successfully uploaded.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Reset the form
    setPrescription(null);
    setSelectedAddress("");
    setSelectedPaymentMethod("");
    setSelectedShippingOption("");
    setAgreeTerms(false);
  };

  // Mock data for addresses, payment methods, and shipping options
  const mockAddresses = [
    { id: "address1", label: "Address 1" },
    { id: "address2", label: "Address 2" },
    { id: "address3", label: "Address 3" },
  ];

  const mockPaymentMethods = [
    { id: "method1", label: "Payment Method 1" },
    { id: "method2", label: "Payment Method 2" },
    { id: "method3", label: "Payment Method 3" },
  ];

  const mockShippingOptions = [
    { id: "option1", label: "Shipping Option 1" },
    { id: "option2", label: "Shipping Option 2" },
    { id: "option3", label: "Shipping Option 3" },
  ];

  return (
    <VStack spacing={5} align="center" py={8}>
      <Heading mb={8}>Upload Prescription</Heading>
      <Stack spacing={4} maxW="700px" width="100%" px={4}>
        <FormControl>
          <FormLabel fontSize="lg">Address</FormLabel>
          <Select value={selectedAddress} onChange={handleAddressChange} placeholder="Select an address" >
            {mockAddresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Upload Prescription</FormLabel>
          <InputGroup>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
            {prescription && (
              <InputRightElement>
                <Button variant="ghost" colorScheme="red" onClick={handleRemoveFile} aria-label="Remove file">
                  <MdDelete />
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
          {prescription && (
            <Box mt={2}>
              <Image src={URL.createObjectURL(prescription)} alt="Uploaded Prescription" maxH="200px" />
            </Box>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Payment Method</FormLabel>
          <Select value={selectedPaymentMethod} onChange={handlePaymentMethodChange} placeholder="Select a payment method">
            {mockPaymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Shipping</FormLabel>
          <Select
            value={selectedShippingOption}
            onChange={handleShippingOptionChange}
            placeholder="Select a shipping option"
          >
            {mockShippingOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Wrap align="center">
            <WrapItem>
              <Checkbox isChecked={agreeTerms} onChange={handleAgreeTermsChange}>
                I agree to the terms and conditions
              </Checkbox>
            </WrapItem>
          </Wrap>
        </FormControl>
        <Stack direction="row" spacing={3}>
          <Button display={{ base: "solid", md: "inline-flex" }}
                    fontSize={"md"}
                    fontWeight="bold"
                    color={"blue.800"}
                    bg="blue.200" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default UploadPrescriptionPage;
