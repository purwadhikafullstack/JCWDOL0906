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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";

// import {useNavigate, Link} from"react-router-dom";
import { RegistrationForm } from "../components/registerForm";
import { LoginForm } from "../components/loginForm";
import { SearchBar } from "../components/searchbar"
import logo_gmedsnial from "../assets/svg/logogmedsnial1.png"
import { useEffect, useState } from "react";

//imprt redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { DocumentIcon, PersonIcon, RocketIcon } from "../components/adminComponents/Icons/Icons";
import { NavLink } from "react-router-dom";
// import { logout } from "../redux/userSlice";

export const Navbar = () => {
  let navbarIcon = "black";
  const { isOpen, onToggle } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice)
  const handleLogOut = () => {
    localStorage.removeItem("user")
    dispatch(logout())
  };
  const username = useSelector((state) => state.userSlice.value.username)

  useEffect(() => {
    if (user.value.id || user.value.id === 1) {
      setIsLogin(true)
    } else { setIsLogin(false) }
  }, [user])
  // const token = localStorage.getItem("token")
  useEffect(() => {
  }, [username]);


  return (
    <Box>
      <Flex
        bg={useColorModeValue("blue.50", "blue.100")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={3}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
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
            height={'60px'}
            alt={"Icon Logo"}
            fit={"logo"} />

          <Flex ml="auto" alignItems="center" spacing={3}>

            <SearchBar />
            {isLogin ? (
              <div>
                <Menu direction="row">
                  <Avatar
                    as={MenuButton}
                    mr="4"
                    name={username}
                    size="md"
                    bg="blue.300"
                    textColor="white"
                  />
                  <MenuList>
                    <MenuItem>
                      My Account
                    </MenuItem>
                    <MenuItem>
                      Cart
                    </MenuItem>
                    <MenuItem>
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
  );
};