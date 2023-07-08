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
import {
  HamburgerIcon,
  CloseIcon,
  Icon,
} from "@chakra-ui/icons";

// import {useNavigate, Link} from"react-router-dom";
import { RegistrationForm } from "../components/registerForm";
import { LoginForm } from "../components/loginForm";
import { SearchBar } from "../components/searchbar"
import logo_gmedsnial from "../assets/svg/logo_gmedsnial.svg"
import { useEffect, useState } from "react";

//imprt redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { DocumentIcon, PersonIcon, RocketIcon } from "../adminComponents/Icons/Icons";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { BsCart, BsCartPlus } from "react-icons/bs";
// import { logout } from "../redux/userSlice";

export const Navbar = () => {
  const navigate = useNavigate()
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
  const { cart } = useSelector((state) => state.cartSlice)
  console.log(cart)
  useEffect(() => {
    // console.log(user.value.id)
    if (user.value.id || user.value.id === 1) {
      setIsLogin(true)
    } else { setIsLogin(false) }
    // console.log(isLogin)
  }, [user])
  // const token = localStorage.getItem("token")
  useEffect(() => {
    // console.log(username)
  }, [username]);


  const location = useLocation()
  const path = location.pathname.split("/")[1]
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
            height={'30px'}
            alt={"Icon Logo"}
            fit={"logo"}
            onClick={() => navigate('store/product')}
          />

          <Flex ml="auto" alignItems="center" spacing={5}>
            {path === 'store' || path === 'cart' ? <Avatar size='sm' bg='blue.300' mr={3} icon={<BsCart fontSize='1.2rem' />} onClick={() => navigate('/cart')}>
              <AvatarBadge placement="bottom-start" borderColor='papayawhip' bg='tomato' boxSize='1.8em'>{cart}</AvatarBadge>
            </Avatar> : ''}

            <SearchBar />
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
                {/* <Button
            display={{base : "solid", md: "inline-flex"}}
            fontSize={"md"}
            fontWeight="bold"
            color={"blue.800"}
            bg="blue.200"
            pt={{ base: "3", md: 0}}
            borderRadius='10px'
            onClick={() => handleLogOut()}>
          LogOut
          </Button> */}
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