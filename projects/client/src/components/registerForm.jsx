// import { ResetPassword } from "./ResetPasswordForm";
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
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import React from "react";
// import decode from "jwt-decode";
import Axios from "axios";
import Swal from "sweetalert2";
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from "../helper/api";
// import { ViewIcon, ViewOffIcon } from'@chakra-ui/icons';
// import { useState } from "react";

//importan redux
// import { useDispatch } from "react-redux";
// import { login } from "../redux/userSlice";

export const RegistrationForm = () => {

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Username is Required'),
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    phonenumber: Yup.string().required('Phone Number is required'),
    password: Yup.string().required('Password is Required'),
    confirmation: Yup.string().required('Password Confirmation is Required'),
  })

  const {
    isOpen, onOpen, onClose } = useDisclosure();
  // const [showPassword, setShowPassword] = useState(false);

  const onRegister = async () => {
    console.log("register");
    const data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone_number: document.getElementById("phonenumber").value,
      password: document.getElementById("password").value,
      password_confirmation: document.getElementById("confirmation").value
    };
    try {
      const url = "/auth/register"
      const result = await apiRequest.post(url, data);
      console.log(result);

      //untuk mereset kembali form
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phonenumber").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmation").value = "";

      //memberikan respon
      Swal.fire({
        icon: "success",
        title: "Registration Success",
        text: `${result.data.message}`,

        customClass: {
          container: "my-swal",
        },
      });
      onClose()
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "failed attempt",
        text: err.response.data.message,
        //  "something went wrong!",
        customClass: {
          container: "my-swal",
        }
      });
    }
  };

  return (
    <>
      <Button
        mx={2}
        display={{ base: "solid", md: "inline-flex" }}
        fontSize={"md"}
        fontWeight="bold"
        spacing={4}
        color={"blue.800"}
        bg="blue.100"
        href={"#"}
        onClick={onOpen}
        pt={{ base: "4", md: 0 }}
        borderRadius='10px'
      >
        SignUp
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} color="blue.800">Sign Up Now!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Formik
              initialValues={{
                username: '',
                email: '',
                phone_number: '',
                password: '',
                password_confirmation: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={onRegister}
            >
              <Form>
                <FormControl>
                  <FormLabel mt={4}>Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    type="text"
                    name="username"
                    borderColor="blue.300"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="div" style={{ color: "red" }} />
                </FormControl>
                <FormControl>
                  <FormLabel mt={4}>Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    type="email"
                    name="email"
                    borderColor="blue.300"
                    placeholder="Email Address"
                  />
                  <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                </FormControl>
                <FormControl>
                  <FormLabel mt={4}>Phone Number</FormLabel>
                  <Field
                    as={Input}
                    id="phonenumber"
                    type="phonenumber"
                    name="phonenumber"
                    borderColor="blue.300"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage name="phonenumber" component="div" style={{ color: "red" }} />
                </FormControl>
                <FormControl>
                  <FormLabel mt={4}>Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    type="password"
                    name="password"
                    borderColor="blue.300"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                </FormControl>
                <FormControl>
                  <FormLabel mt={4}>Password Confirmation</FormLabel>
                  <Field
                    as={Input}
                    id="confirmation"
                    type="password"
                    name="confirmation"
                    borderColor="blue.300"
                    placeholder="Passworc Confirmation"
                  />
                  <ErrorMessage name="confirmation" component="div" style={{ color: "red" }} />
                </FormControl>
                <ModalFooter>
                  <Button
                    display={{ base: "solid", md: "inline-flex" }}
                    fontSize={"md"} fontWeight="bold"
                    color={"blue.800"} bg="blue.100"
                    onClick={() => onRegister()}>Register</Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};