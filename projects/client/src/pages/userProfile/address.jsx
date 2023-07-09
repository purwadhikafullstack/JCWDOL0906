import React, { useEffect, useState } from "react";
import axios from "axios";
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

const cities = require("./city.json").rajaongkir.results;
const provinces = require("./province.json").rajaongkir.results;

const Address = () => {
  useEffect(() => {
    // axios.get("http://localhost:8000/api/auth/profile/", {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("userToken"),
    //   },
    // });
  }, []);

  const createAddressHandler = async (e) => {
    try {
      let detail = document.getElementById("detail").value;
      let province_id = document.getElementById("province_id").value;
      let city_id = document.getElementById("city_id").value;
      let label = document.getElementById("label").value;
      let is_default = document.getElementById("is_default").value;

      let data = {
        detail,
        province_id,
        city_id,
        label,
        is_default,
      };
      console.log(data);

      let result = await axios.post("http://localhost:8000/api/address", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      // swalSuccess(result.data.message);
    } catch (error) {
      // swalFailed(error.response.data.message);
    }
  };

  return (
    <Accordion mt={8} defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Create New Address
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack spacing={4} align="flex-start">
            <form onSubmit={createAddressHandler} encType="multipart/form-data">
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel> Address Name </FormLabel>
                  <Input
                    type="text"
                    // value={fullName}
                    placeholder="Address Name (rumah/kantor)"
                    id="label"
                    // onChange={(e) => {
                    //   setFullName(e.target.value);
                    // }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Province</FormLabel>
                  <Select
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="province_id"
                  >
                    <option value="">Select province</option>
                    {provinces.map((province, index) => {
                      return (
                        <option key={index} value={province.province_id}>
                          {"Provinsi" + " " + province.province}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel> City </FormLabel>
                  <Select
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="city_id"
                  >
                    <option value="">Select city</option>
                    {cities.map((city, index) => {
                      return (
                        <option key={index} value={city.city_id}>
                          {city.type + " " + city.city_name}
                        </option>
                      );
                    })}
                    //cities looping data city dan index
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel> Detail Address </FormLabel>
                  <Input
                    type="text"
                    // value={fullName}
                    placeholder="Enter your full address"
                    id="detail"
                    // onChange={(e) =>
                    //   setPicture(URL.createObjectURL(e.currentTarget.files[0]))
                    // }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel> Set as Main Address? </FormLabel>
                  <Select
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="is_default"
                  >
                    <option value="">Select as main address </option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </FormControl>
                <Button colorScheme="blue" type="submit">
                  Save
                </Button>
              </VStack>
            </form>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Address;
