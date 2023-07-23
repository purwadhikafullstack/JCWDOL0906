import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Link,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";

import React from "react";

import Axios from "axios";
import Swal from "sweetalert2";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//importan redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { apiRequest } from "../helper/api";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  
  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'

      backdropBlur='2px'
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo/>)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    const data = {
      emailOrUsername: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {
      const url = "/auth/login";
      const result = await apiRequest.post(url, data);
      console.log(result.data);
      localStorage.setItem("user", JSON.stringify(result.data.token));

      dispatch(login(result.data.data));

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: `${result.data.message}`,

        customClass: {
          container: "my-swal",
        },
      });
      onClose();
      if (result.data.data.role === 2) {
        navigate("/admin/dashboard");
      } 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "failed attempt",
        text: error.response.data.message
          ? error.response.data.message
          : "something went wrong!",

        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <Button
        display={{ base: "solid", md: "inline-flex" }}
        fontSize={"lg"}
        fontWeight="bold"
        color={"white"}
        bg="blue.800"
        href={"#"}
        onClick={() => {
          setOverlay(<OverlayTwo />)
          onOpen()}}
        pt={{ base: "3", md: 0 }}
        borderRadius="10px"
      >
        Masuk
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
      {overlay}
        <ModalContent>
          <ModalHeader textAlign={"center"} color="blue.800">
            Masuk Sekarang!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={onLogin}
            >
              <Form>
                <FormControl>
                  <FormLabel mt={5}>Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    type="email"
                    name="email"
                    borderColor="blue.800"
                    placeholder="Email Address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <FormLabel mt={5}>Password</FormLabel>
                  <InputGroup>
                  <Field
                    as={Input}
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    borderColor="blue.800"
                    placeholder="Password"
                  />
                    <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  backgroundColor="blue.800"
                  color="white"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
                </InputRightElement>
                </InputGroup>
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />

                </FormControl>
                <ModalFooter>
                  <Button
                    display={{ base: "solid", md: "inline-flex" }}
                    fontSize={"md"}
                    fontWeight="bold"
                    color={"white"}
                    bg="blue.800"
                    onClick={() => onLogin()}
                  >
                    Masuk
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
            <Link
              variant="link"
              onClick={() => {
                onClose();
                navigate("/confirm-email");
              }}
              color="blue.800"
              mt={5}
            >
              Lupa Password? Reset di sini
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
