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

export const Verification = () =>  {
  let navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    console.log(tokenVerification)
    try {
      if (token) {
        const response = await axios.post(
          process.env.REACT_APP_API_BASE_URL + "/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        console.log(response)
        setTimeout(() => {
          navigate("/");
        }, 4000);
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
      <Image alt={"Verification"} fit={"cover"} align={"center"} w={"500px"} src={verification} />
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