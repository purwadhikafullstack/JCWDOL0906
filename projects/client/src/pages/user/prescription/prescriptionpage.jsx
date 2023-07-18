import { Box, Button, Card, Flex, FormControl, FormLabel, HStack, Heading, Input, Select, Stack, Text, VStack} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { apiRequest } from "../../../helper/api";
import { swalFailed, swalSuccess } from "../../../helper/index";
import FooterUserPage from "../../../components/footer";
import ShippingSelection from "../prescription/shippingselection";
import { useDispatch } from "react-redux";
import { addCourier } from "../../../redux/cartSlice";
import { addAddress } from "../../../redux/cartSlice";
import Swal from 'sweetalert2';
const PrescriptionPage = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState();
  const inputFileRef = useRef();
  const [courier, setCourier] = useState("JNE");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();


  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setImg(URL.createObjectURL(event.target.files[0]));
  };
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      setSelectedFile(values.file);
      setImg(URL.createObjectURL(values.file));
    },
  });

  const addPrescription = async () => {
try {
  const prescription = document.getElementById("prescription").files[0];
  const shipping = document.getElementById("shipping").value;
  const address_id = document.getElementById("address_id").value;
  const formData = new FormData();
  const data = {
    shipping,
    address_id
  }
  formData.append("prescription", selectedFile, prescription);
  formData.append("shipping", shipping);

  const result = await apiRequest.post("/prescription", formData,
  {
    headers: {
      authorization : "Bearer" + localStorage.getItem("user"),
    },
  }
  );
  alert(result.data.message);
  console.log(result);

  Swal.fire({
        icon: 'success',
        title: 'Upload Prescription Succes',
        text: error.result.data.message,
        customClass: {
          container: 'my-swal',
        },
      });
} catch (error) {
  console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed Attempt',
        text: error.result.data.message,
        customClass: {
          container: 'my-swal',
        },
      });
    }
  };

  const getAddresses = async () => {
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
  
    useEffect(() => {
      getAddresses();
    }, []);

  return (
    <Box>
      <Stack spacing={4} p={4} mr="10" mb="10" ml="10">
          <Heading color="blue.800" fontSize="18px" >Unggah Resep</Heading>
          <Flex align="center">
            <Input
              type="file"
              id="file"
              name="file"
              display="none"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
                formik.submitForm();
              }}
              ref={inputFileRef}
            />
            <Button color="white" backgroundColor="blue.800" onClick={() => inputFileRef.current.click()}>
              <MdOutlineFileUpload /> Upload Image
            </Button>
          </Flex>
        {img && (
          <Box align="center" w="full">
            <img src={img} alt="" width={300} height={300} />
          </Box>
        )}
        <HStack w="full" allign="center" justify="space-between" paddingBottom={1} borderBottom="1px solid black">
    <Heading fontSize="18px" color="blue.800"> Alamat Pengiriman </Heading>
    </HStack>
    <Select>
    {detail.map((detail, index) =>
    detail.is_default ? (
    <option
          size="lg"
          name="1"
          onClick={() => {
            setSelectedAddress(detail);
            dispatch(addAddress({ address_id: detail.id }));
            }}
         >
             {detail.label + " " + detail.address_name + " " + detail.province_name + " " + detail.city_name + " " + detail.postal_code}
           </option>
            ) : (
           <option
           sise='lg'
           onClick={() => setSelectedAddress(detail)}
         >
             {detail.label + " " + detail.address_name + " " + detail.province_name + " " + detail.city_name + " " + detail.postal_code}
            </option>
           )
         )}
    </Select>
        <Heading color="blue.800" fontSize="18px" >Jasa Kurir</Heading>
        <FormControl>
        <Select
          value={courier}
          onChange={(e) => {
            setCourier(e.target.value);
            dispatch(addCourier({ courier: e.target.value}));
          
          }}
          id='courier'
        >
        <option value="jne">JNE</option>
        <option value="pos">POS</option>
        <option value="tiki">TIKI</option>
        </Select>
        </FormControl>
        <Button
          color="white"
          backgroundColor="blue.800"
          onClick={onsubmit}
          isDisabled={!selectedFile}
        >
          Upload
        </Button>
      </Stack>
      <FooterUserPage/>
    </Box>
  );
};

export default PrescriptionPage;
