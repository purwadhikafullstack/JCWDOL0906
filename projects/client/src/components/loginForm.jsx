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
  Alert,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import React from "react";
// import decode from "jwt-decode";
import Axios from "axios";
import Swal from "sweetalert2";
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";

//importan redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";



export const LoginForm = () => {

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    const data = {
      emailOrUsername: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {

      const url = process.env.REACT_APP_API_BASE_URL + "/auth/login";
      const result = await Axios.post(url, data);
      // console.log(result.data);
      localStorage.setItem("user", JSON.stringify(result.data.data))
      dispatch(login(result.data.data));

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: `${result.data.message}`,

        customClass: {
          container: "my-swal",
        },
      });
      onClose()
      if (result.data.data.role === 2) {
        navigate("/admin/dashboard")
      } else {
        navigate("/store/product")
      }

    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "failed attempt",
        text: error.response.data.message
          ? error.response.data.message
          : "something went wrong!",

        customClass: {
          container: "my-swal",
        }
      });
    }
  };

  return (
    <>
      <Button
        display={{ base: "solid", md: "inline-flex" }}
        fontSize={"md"}
        fontWeight="bold"
        color={"blue.800"}
        bg="blue.200"
        href={"#"}
        onClick={onOpen}
        pt={{ base: "3", md: 0 }}
        borderRadius='10px'
      >
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} color="blue.800">Login Now!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Formik
              initialValues={{
                email: '',
                password: '',
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
                    borderColor="blue.300"
                    placeholder="Email Address"
                  />
                  <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                  <FormLabel mt={5}>Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    type="password"
                    name="password"
                    borderColor="blue.300"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                  {/* <ResetPassword/> */}
                </FormControl>
                <ModalFooter>
                  <Button
                    mr={5} type="submit"
                    colorScheme='blue.800'>
                    Login
                  </Button>
                  <Button
                    display={{ base: "solid", md: "inline-flex" }}
                    fontSize={"md"} fontWeight="bold"
                    color={"blue.800"} bg="blue.100"
                    onClick={() => onLogin()}>Login</Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};