// Chakra imports
import {
  Portal,
  useDisclosure,
  Stack,
  Box,
  useColorMode,
  Image
} from "@chakra-ui/react";
import Configurator from "../adminComponents/Configurator/Configurator";
import Footer from "../adminComponents/Footer/Footer";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
  GMedsnialLogo
} from "../adminComponents/Icons/Icons";
// Layout adminComponents

import React, { useState } from "react";
import { Route, Routes, Switch } from "react-router-dom";
import routes from "../../routes";
// Custom Chakra theme
import FixedPlugin from "../adminComponents/FixedPlugin/FixedPlugin";
// Custom adminComponents
import MainPanel from "../adminComponents/Layout/MainPanel";
import PanelContainer from "../adminComponents/Layout/PanelContainer";
import PanelContent from "../adminComponents/Layout/PanelContent";
import bgAdmin from "../../assets/img/admin-background.png";
//=================================================================
import Sidebar from "../adminComponents/Sidebar/Sidebar";
import AdminNavbar from "../adminComponents/Navbars/AdminNavbar";
import ProtectedRoute from "../protectedRoute";
import logo_gmedsnial from "../../assets/svg/logogmedsnial3.png"
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
  // functions for changing the states from adminComponents
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "G-Medsnial";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (

          <Route
            path={prop.layout + prop.path}
            Component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <Box>
      <Box
        minH='40vh'
        w='100%'
        position='absolute'
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize='cover'
        top='0'
      />
      <Sidebar
        routes={routes}
        logo={
          <Stack direction='row' spacing='12px' align='center' justify='center'>
            {colorMode === "dark" ? (
              <Image
                src={logo_gmedsnial}
                height={'90px'}
                weight={'84px'}
              />
            ) : (
              <Image
                src={logo_gmedsnial}
                height={'90px'}
                weight={'84px'}
              />
            )}
          </Stack>
        }
        display='none'
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <ProtectedRoute>
              <PanelContainer>
                <Routes>
                  {getRoutes(routes)}
                </Routes>
              </PanelContainer>
            </ProtectedRoute>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
        />
      </MainPanel>
    </Box>
  );
}
