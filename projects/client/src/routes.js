// import
import React, { Component } from 'react';
import Product from './admin/pages/product';
import Units from './admin/pages/units';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "./adminComponents/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    // component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Product,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    // component: Billing,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    rtlName: "آرتيإل",
    icon: <DocumentIcon color='inherit' />,
    // component: RTLPage,
    layout: "/admin",
  },
  {
    path: "/qna",
    name: "Q&A",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    // component: RTLPage,
    layout: "/admin",
  },
  {
    path: "/unit",
    name: "Units",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: Units,
    layout: "/admin",
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
