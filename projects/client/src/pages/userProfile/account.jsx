import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Image,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

const MyAccount = () => {
  const [fullName, setFullName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [gender, setGender] = useState();
  const [picture, setPicture] = useState();
  console.log(picture);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/profile/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((result) => {
        console.log(result);
        setFullName(result.data.result.full_name);
        setBirthdate(
          new Date(result.data.result.birthdate).toISOString().split("T")[0]
        );
        setGender(result.data.result.gender);
        setPicture("http://localhost:8000" + result.data.result.picture);
      });
  }, []);

  const updateDetailProfile = async (e) => {
    try {
      let picture = document.getElementById("picture").files[0];
      let full_name = document.getElementById("full_name").value;
      let birthdate = document.getElementById("birthdate").value;
      let gender = document.getElementById("gender").value;
      let formData = new FormData();
      let data = {
        full_name,
        birthdate,
        gender,
      };
      formData.append("full_name", full_name);
      formData.append("birthdate", birthdate);
      formData.append("gender", gender);

      formData.append("picture", picture);
      console.log(formData);

      let result = await axios.patch(
        "http://localhost:8000/api/auth/profile/edit",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      // modalUpdate.onClose();
      // getData();
      // swalSuccess(result.data.message);
    } catch (error) {
      // swalFailed(error.response.data.message);
    }
  };

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("My Account");

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const handleBreadcrumbClick = (breadcrumb) => {
    setCurrentBreadcrumb(breadcrumb);
  };

  // Perform save/update logic here

  return (
    <Box bg="white" minHeight="100vh">
      <Box p={4} maxWidth={400} mx="auto">
        <Box textAlign="left" mb={4}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => handleBreadcrumbClick("My Account")}
              >
                My Account
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => handleBreadcrumbClick("Address")}>
                Address
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => handleBreadcrumbClick("Transaction History")}
              >
                Transaction History
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => handleBreadcrumbClick("Logout")}>
                Logout
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        {currentBreadcrumb === "My Account" && (
          <form onSubmit={updateDetailProfile} encType="multipart/form-data">
            <VStack spacing={4}>
              <Center>
                <Avatar size="2xl" name={picture} src={picture} />
              </Center>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={fullName}
                  placeholder="Enter your full name"
                  id="full_name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Birthdate</FormLabel>
                <Input
                  type="date"
                  value={birthdate}
                  id="birthdate"
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                >
                  <option value="">Select gender</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  id="picture"
                  onChange={(e) =>
                    setPicture(URL.createObjectURL(e.currentTarget.files[0]))
                  }
                />
              </FormControl>
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
            </VStack>
          </form>
        )}
        {currentBreadcrumb === "Address" && (
          <Accordion mt={8} defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Address
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack spacing={4} align="flex-start">
                  {addresses.map((address, index) => (
                    <Box
                      key={index}
                      w="100%"
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                    >
                      {address}
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        ml={2}
                        onClick={() => handleDeleteAddress(index)}
                      />
                    </Box>
                  ))}
                  <FormControl>
                    <Textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Enter new address"
                    />
                  </FormControl>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={handleAddAddress}
                  >
                    Add Address
                  </Button>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
      </Box>
    </Box>
  );
};

export default MyAccount;
