import React, { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import verification
import verification from "../assets/verification.jpg";
import { 
  Text,
  Stack,
  Heading,
  Image,
 } from "@chakra-ui/react";

function Verification() {
  const navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:8000/api/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        // alert(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);


  return (
    <Stack alignContent="center" justifyContent="center" textAlign="center" py={10} px={6}>
      <Image alt={"Verification"} fit={"cover"} align={"center"} w={"400px"} src={verification} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your account is being verified
      </Heading>
      <Text color={"blue.300"}>Welcome to G-Medsnial, thank you for verifying your account. You can continue signing into your account!</Text>
    </Stack>
    // <div>
    //   <p>Your account is being verified </p>
    //   {/* <p>{token}</p> */}
    // </div>
  );
}

export default Verification;