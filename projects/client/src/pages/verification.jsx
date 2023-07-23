import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//import verification
import verification1 from "../assets/verification1.jpg";
import { Text, Stack, Heading, Image, Box } from "@chakra-ui/react";
import { apiRequest } from "../helper/api";

export const Verification = () => {
  let navigate = useNavigate();
  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await apiRequest.post(
          "/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) { alert(err.response.data)}};

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <Stack
      alignContent="center"
      justifyContent="center"
      textAlign="center"
      py={10}
      px={6}
      spacing={6}
    >
      <Box w="100%" maxW="500px" mx="auto">
        <Image
          alt={"Verification"}
          fit={"cover"}
          w="100%"
          h="auto"
          src={verification1}
        />
      </Box>
      <Heading as="h2" size="xl" fontWeight="bold" mt={6} mb={2}>
        Your account is being verified
      </Heading>
      <Text color={"blue.300"} fontWeight="bold">
        Welcome to G-Medsnial, thank you for verifying your account. You can
        continue signing into your account!
      </Text>
    </Stack>
  );
};
export default Verification;
