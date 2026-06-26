import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faBoxesStacked,
  faBoxOpen,
  faChartLine,
  faSquarePlus,
  faTruckFast,
  faTruckRampBox,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const link = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: faChartLine,
    role: ["1995", "1999"],
  },
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faBoxesStacked,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "products",
    icon: faTruckFast,
    role: ["1995", "1999"],
  },
  {
    name: "Orders",
    path: "orders",
    icon: faTruckRampBox,
    role: ["1995"],
  },
  {
    name: "Customer messages",
    path: "messages",
    icon: faMessage,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "user/add",
    icon: faUserPlus,
    role: ["1995"],
  },
  {
    name: "Add Category",
    path: "category/add",
    icon: faBoxOpen,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "product/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },
];
