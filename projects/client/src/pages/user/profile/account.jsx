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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Avatar,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import Address from "./address";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { apiRequest } from "../../../helper/api";

const MyAccount = () => {
  const [fullName, setFullName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [gender, setGender] = useState();
  const [picture, setPicture] = useState();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  useEffect(() => {
    apiRequest
      .get("/auth/profile", {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        },
      })
      .then((result) => {
        setFullName(result.data.result.full_name);
        setBirthdate(
          new Date(result.data.result.birthdate).toISOString().split("T")[0]
        );
        setGender(result.data.result.gender);
        setPicture(
          process.env.REACT_APP_IMAGE_API + result.data.result.picture
        );
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

      let result = await apiRequest.patch("/auth/profile/edit", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
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
    <Box textAlign="left" mb={4}>
      <Tabs
        onChange={handleTabChange}
        isFitted
        variant="soft-rounded"
        colorBackground="blue.800"
      >
        <TabList mb={4}>
          <Tab
            onClick={() => handleTabChange(0)}
            _selected={{ color: "white", bg: "blue.800" }}
          >
            <FaUser /> My Account
          </Tab>
          <Tab
            onClick={() => handleTabChange(1)}
            _selected={{ color: "white", bg: "blue.800" }}
          >
            <FaMapMarkerAlt /> Address
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <Address />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyAccount;
