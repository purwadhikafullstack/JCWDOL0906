import { useState, useEffect } from 'react';
import { VStack, HStack, Text, Stack, Button, Card, Select, Heading} from '@chakra-ui/react';
import { apiRequest } from "../helper/api";
import { swalFailed, swalSuccess } from "../helper/index";

const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const tokenUser = JSON.parse(localStorage.getItem("user"));
        console.log("", tokenUser);
        
        const result = await apiRequest.get("/address", 
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        });
        setDetail(result.data.data);
        console.log(result.data.data);
        const defaultAddress = detail.filter((addresses) => {
          return addresses.is_default == true;
        });
        setSelectedAddress(defaultAddress[0]);
      } catch (error) {
        swalFailed(error.response.data.message);
        console.log(error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <Card>
    <HStack w="full" allign="center" justify="space-between" paddingBottom={1} borderBottom="1px solid black">
    <Heading fontSize="18px" color="blue.800"> Alamat Pengiriman </Heading>
    </HStack>
    <Select>
    {detail.map((detail, index) =>
    detail.is_default ? (
    <option
    ise='lg'
    onClick={() => setSelectedAddress(detail)}
    >
    {detail.address_name + " " +  detail.province_name + " " + detail.city_name + " " + detail.postal_code}
     </option>
      ) : (
    <option
    sise='lg'
    onClick={() => setSelectedAddress(detail)}
    >
     {detail.address_name + " " + detail.province_name + " " + detail.city_name + " " + detail.postal_code}
     </option>
    )
    )}
    </Select>
    </Card>
  )
};

export default AddressSelection;
