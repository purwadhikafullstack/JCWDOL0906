import { Box, Button, Card, Flex, FormControl, FormLabel, HStack, Heading, Input, Stack, Text, VStack} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
// import ModalChangeAddress from "../ModalChangeAddress";
import { apiRequest } from "../helper/api";
import { swalFailed, swalSuccess } from "../helper/index";
import AddressSelection from "../components/addrescselection";

const ModalUploadPrescription = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState();
  const inputFileRef = useRef();

  const formData = new FormData();
  formData.append("prescription", selectedFile);

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

  return (
    <Box>
      <Stack spacing={4} p={4} mr="10" mb="10" ml="10">
        <Card>
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
        </Card>
        {img && (
          <Box align="center" w="full">
            <img src={img} alt="" width={300} height={300} />
          </Box>
        )}
        {<AddressSelection/>}
        <Button
          color="white"
          backgroundColor="blue.800"
          // onClick={uploadFile}
          isDisabled={!selectedFile}
        >
          Upload
        </Button>
      </Stack>
    </Box>
  );
};

export default ModalUploadPrescription;
