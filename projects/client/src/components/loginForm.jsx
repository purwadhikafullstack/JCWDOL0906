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
import { useNavigate } from "react-router-dom";

//importan redux
// import { useDispatch } from "react-redux";
// import { login } from "../redux/userSlice";



export const LoginForm = () => {
    const { 
        isOpen, 
        onOpen, 
        onClose } = useDisclosure()
  
    // const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const onLogin = async () => {
      const data = {
        emailOrUsername: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
       try {
        
        const url = process.env.REACT_APP_API_BASE_URL + "/auth/login";
        const result = await Axios.post (url, data);
        console.log(result.data);

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
          navigate("/admindashboard")
        } else {
          alert("You are not an admin")
        }
      
       } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            tittle: "failed attempt",
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
            Login
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login to your Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
                <form>
              <FormControl>
                <FormLabel mb={5}>Email</FormLabel>
                <Input 
                id="email"
                type="email"
                />
                <FormLabel mt={5}>Password</FormLabel>
                <Input
                id="password"
                type="password"
                />
                {/* <ResetPassword/> */}
              </FormControl>
            <ModalFooter>
              <Button 
              mr={5} type="submit"
              colorScheme='blue.800'>
                Login
              </Button>
              <Button onClick={()=>onLogin()}>Login</Button>
            </ModalFooter>
            </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };