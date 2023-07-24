// import
import React, { Component } from "react";
import Product from "./pages/admin/pages/product";
import Units from "./pages/admin/pages/units";
import CategoryList from "./pages/admin/pages/category/list";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  SupportIcon,
  DocumentIcon,
} from "./components/adminComponents/Icons/Icons";
import Transaction from "./pages/admin/pages/transaction";

var dashRoutes = [
  {
    path: "/products",
    name: "Products",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Product,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: CategoryList,
    layout: "/admin",
  },
  {
    path: "/unit",
    name: "Units",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: Units,
    layout: "/admin",
  },
  {
    path: "/transanction",
    name: "Transaction",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: Transaction,
    layout: "/admin",
  },
];
export default dashRoutes;
