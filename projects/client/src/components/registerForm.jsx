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
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import React from "react";
// import decode from "jwt-decode";
import Axios from "axios";
import Swal from "sweetalert2";


//importan redux
// import { useDispatch } from "react-redux";
// import { login } from "../redux/userSlice";



export const RegistrationForm = () => {
    const { 
        isOpen , 
        onOpen, 
        onClose } = useDisclosure()

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
        const url = process.env.REACT_APP_API_BASE_URL + "/auth/register"
        const result = await Axios.post (url, data);
        console.log(result);

        //untuk mereset kembali form
        document.getElementById("username").value ="";
        document.getElementById("email").value ="";
        document.getElementById("phonenumber").value ="";
        document.getElementById("password").value = "";
        document.getElementById("confirmation").value ="";

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
            tittle: "failed attempt",
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
        display={{base : "solid", md: "inline-flex"}}
        fontSize={"md"}
        fontWeight="bold"
        color={"blue.800"}
        bg="#81AED8"
        href={"#"}
        onClick={onOpen}
        pt={{ base: "3", md: 0}}
        borderRadius="15px"
        
        >
            Registration
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registration to your Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
                <form>
              <FormControl id="username" isRequired>
                <FormLabel mt={5}>Username</FormLabel>
                <Input
                type="text"
                />
                <FormLabel mb={5}>Email</FormLabel>
                <Input 
                id="email"
                type="email"
                />
                <FormLabel mt={5}>Phone Number</FormLabel>
                <Input
                id="phonenumber"
                type="phonenumber"
                />
                 <FormLabel mt={5}>Password</FormLabel>
                <Input
                id="password"
                type="password"
                />
                 <FormLabel mt={5}>Password Confirmation</FormLabel>
                <Input
                id="confirmation"
                type="password"
                />
              </FormControl>
            <ModalFooter>
              {/* <Button 
              mr={5}
              colorScheme='blue.500'>
                Register
              </Button> */}
              <Button onClick={()=>onRegister()}>Register</Button>
            </ModalFooter>
            </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };