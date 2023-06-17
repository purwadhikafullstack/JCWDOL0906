// import
import React, { Component } from "react";
// import Dashboard from "views/Dashboard/Dashboard.js";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
// import Profile from "views/Dashboard/Profile.js";
// import SignIn from "views/Pages/SignIn.js";
// import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  SupportIcon,
} from "./adminComponents/Icons/Icons";
import Product from "./adminComponents/Products";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    // component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Product,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Category",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    // component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "Report",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    // component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/rtl-support-page",
    name: "Q&A",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    // component: RTLPage,
    layout: "/rtl",
  },
  // {
  //   name: "ACCOUNT PAGES",
  //   category: "account",
  //   rtlName: "صفحات",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       rtlName: "لوحة القيادة",
  //       icon: <PersonIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       // component: Profile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/signin",
  //       name: "Sign In",
  //       rtlName: "لوحة القيادة",
  //       icon: <DocumentIcon color='inherit' />,
  //       // component: SignIn,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/signup",
  //       name: "Sign Up",
  //       rtlName: "لوحة القيادة",
  //       icon: <RocketIcon color='inherit' />,
  //       // component: SignUp,
  //       layout: "/auth",
  //     },
  //   ],
  // },
];
export default dashRoutes;
