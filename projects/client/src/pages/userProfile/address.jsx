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
  Radio,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Provider } from "react-redux";
import { swalFailed, swalSuccess } from "../../helper";
import { apiRequest } from "../../helper/api";

const cities = require("./city.json").rajaongkir.results;
const provinces = require("./province.json").rajaongkir.results;
const codes = require("./city.json").rajaongkir.results;

const Address = () => {
  useEffect(() => {
    // axios.get("http://localhost:8000/api/auth/profile/", {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("userToken"),
    //   },
    // });
  }, []);

  const [province, setProvince] = useState(" ");
  console.log(province);
  const [city, setCity] = useState(" ");
  const [code, setCode] = useState([]);
  const [newCity, setNewCity] = useState([]);
  const [detail, setDetail] = useState([]);

  const getAddress = async (e) => {
    try {
      let result = await apiRequest.get("/address", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      setDetail(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
    }
  };

  const createAddressHandler = async (e) => {
    e.preventDefault();
    try {
      let detail = document.getElementById("detail").value;
      let province_name = province.split("/")[1];
      let province_id = province.split("/")[0];
      let city_name = city.split("/")[1];
      let city_id = city.split("/")[0];
      let label = document.getElementById("label").value;
      let postal_code = document.getElementById("postal_code").value;
      let is_default = document.getElementById("is_default").value;

      let data = {
        detail,
        province_name,
        province_id,
        city_name,
        city_id,
        label,
        is_default,
        postal_code,
      };
      console.log(data);

      let result = await axios.post("http://localhost:8000/api/address", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      getAddress();
      // swalSuccess(result.data.message);
    } catch (error) {

      // swalFailed(error.response.data.message);
    }
  };

  const cityFilter = async (e) => {
    try {
      const arrayCity = cities.filter(
        (e) => e.province_id === province.split("/")[0]
      );
      setNewCity(arrayCity);
      console.log(arrayCity);
    } catch (error) { }
  };

  const codeFilter = (e) => {
    const arrayCode = codes.filter((e) => e.city_id === city.split("/")[0]);
    setCode(arrayCode);
    console.log(arrayCode);
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    cityFilter();
  }, [province]);

  useEffect(() => {
    codeFilter();
  }, [city]);

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
                    placeholder="Address Name (rumah/kantor)"
                    id="label"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Province</FormLabel>
                  <Select
                    // value={}
                    onChange={(e) => setProvince(e.target.value)}
                    id="province_id"
                  >
                    <option value="">Select province</option>
                    {provinces.map((province, index) => {
                      return (
                        <option
                          key={index}
                          value={province.province_id + "/" + province.province}
                        >
                          {"Provinsi" + " " + province.province}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel> City </FormLabel>
                  <Select
                    onChange={(e) => setCity(e.target.value)}
                    id="city_id"
                  >
                    <option value="">Select city</option>
                    {newCity.map((city, index) => {
                      return (
                        <option
                          key={index}
                          value={city.city_id + "/" + city.city_name}
                        >
                          {city.type + " " + city.city_name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel> Postal Code </FormLabel>
                  <Select id="postal_code">
                    <option value=""> Code Area </option>
                    {code.map((code, index) => {
                      return (
                        <option key={index} value={code.postal_code}>
                          {code.postal_code}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel> Detail Address </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your full address"
                    id="detail"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel> Set as Main Address? </FormLabel>
                  <Select id="is_default">
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

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Your Addresses
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack spacing={4} align="flex-start">
            <Stack>
              {detail.map((detail, index) =>
                detail.is_default ? (
                  <Radio size="lg" name="1" colorScheme="blue" defaultChecked>
                    {detail.label +
                      " " +
                      detail.detail +
                      " " +
                      detail.province_name +
                      " " +
                      detail.city_name +
                      " " +
                      detail.postal_code}
                  </Radio>
                ) : (
                  <Radio size="lg" name="1" colorScheme="blue">
                    {detail.label +
                      " " +
                      detail.detail +
                      " " +
                      detail.province_name +
                      " " +
                      detail.city_name +
                      " " +
                      detail.postal_code}
                  </Radio>
                )
              )}
            </Stack>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Address;
