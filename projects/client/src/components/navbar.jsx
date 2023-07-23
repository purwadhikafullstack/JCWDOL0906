import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Menu,
  Button,
  MenuGroup,
  Badge,
  AvatarBadge,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, Icon } from "@chakra-ui/icons";

import { RegistrationForm } from "../components/registerForm";
import { LoginForm } from "../components/loginForm";
// import { SearchBar } from "../components/searchbar";
import logo_gmedsnial from "../assets/svg/logogmedsnial1.png";
import { useEffect, useState } from "react";
import MyAccount from "../pages/user/profile/account";

//imprt redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCart, BsCartPlus } from "react-icons/bs";
// import {
//   DocumentIcon,
//   PersonIcon,
//   RocketIcon,
// } from "../components/adminComponents/Icons/Icons";

import { clear } from "../redux/cartSlice";

export const Navbar = () => {

  const { isOpen, onToggle } = useDisclosure();
  // const [isLogin, setIsLogin] = useState(false);
  const isLogin = localStorage.getItem("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    dispatch(clear());
    navigate("/");
  };
  const handleAccount = () => {
    navigate("/myaccount");
  };
  const username = useSelector((state) => state.userSlice.value.username);
  const { cart } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    console.log("role", user.value.role);
    if (user.value.role === 2) {
      navigate("/admin/dashboard");
    }
    // console.log("value", user.value.id);
    // if (user.value.id) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false);
    // }
  }, [user]);


  useEffect(() => {
    // console.log(username)
  }, [username]);

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <>
      <Box>
        <Flex
            bg={useColorModeValue("blue.50", "blue.100")}
          color={useColorModeValue("gray.600", "white")}
          minH={"70px"} // Adjust the minimum height to make the navbar slightly bigger
          py={{ base: 3 }} // Adjust the vertical padding to make the navbar slightly bigger
          px={{ base: 4 }}
          borderBottom={3}
          borderStyle={"solid"}
          borderColor={useColorModeValue("black")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start", lg: "flex-end" }}
            alignItems="center"
          >
            <Image
              src={logo_gmedsnial}
              height={"70px"}
              alt={"Icon Logo"}
              fit={"logo"}
              onClick={() => navigate("store/product")}
            />
            <Flex ml="auto" alignItems="center" spacing={5}>
              {path === "store" || path === "cart" || user.value.role === 1 ? (
                <Avatar
                  size="sm"
                  bg="blue.300"
                  mr={3}
                  icon={<BsCart fontSize="1.2rem" />}
                  onClick={() => navigate("/cart")}
                >
                  <AvatarBadge
                    placement="bottom-start"
                    borderColor="papayawhip"
                    bg="tomato"
                    boxSize="1.8em"
                  >
                    {cart}
                  </AvatarBadge>
                </Avatar>
              ) : (
                ""
              )}
              {/* <SearchBar /> */}
              {isLogin ? (
                <div>
                  <Menu direction="row">
                    <Avatar
                      as={MenuButton}
                      mx="4px"
                      name={username}
                      size="sm"
                      bg="blue.300"
                      textColor="white"
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleAccount()}>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/change-password")}>
                        Change Password
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/mytransaction")}>
                        Transaction
                      </MenuItem>
                      <MenuItem onClick={() => handleLogOut()}>
                        Log Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ) : (
                <div>
                  <RegistrationForm />
                  <LoginForm />
                </div>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
