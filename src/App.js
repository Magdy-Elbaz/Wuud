import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Website/Home/Landing/Home";
import Register from "./Pages/Auth/AuthOperations/Register";
import Login from "./Pages/Auth/AuthOperations/Login";
import GoogleCallback from "./Pages/Auth/AuthOperations/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import UpdateUser from "./Pages/Dashboard/Users/EditUser";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Err404 from "./Pages/Auth/Error/404/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/Dashboard/Categories/Categories";
import AddCategory from "./Pages/Dashboard/Categories/AddCategory";
import EditCategory from "./Pages/Dashboard/Categories/EditCategory";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import EditProduct from "./Pages/Dashboard/Products/EditProduct";
import NavBar from "./Components/Website/NavBar/NavBar";
import CatigoriesSearch from "./Pages/Website/CatigoriesSearch/CatigoriesSearch";
import SingleProduct from "./Components/Website/Home/Products/SingleProduct/SingleProduct";
import Footer from "./Components/Website/Footer";
import SingleCategories from "./Components/Website/SingleCategories/SingleCategories";
import Shop from "./Pages/Website/Shop/Shop";
import Profile from "./Pages/Website/Profile/Profile";
import Orders from "./Pages/Dashboard/Orders";
import MyOrders from "./Pages/Website/MyOrders";
import Messages from "./Pages/Dashboard/Messages";
import Wishlist from "./Pages/Website/Wishlist";
import AboutUs from "./Pages/Website/About/AboutUs";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<NavBar />}>
          <Route element={<Footer />}>
            <Route path="/" element={<Home />} />
            <Route path="/catigories" element={<CatigoriesSearch />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/category/:id" element={<SingleCategories />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<AboutUs />} />

            <Route element={<RequireBack />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>
        </Route>

        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/*" element={<Err404 page="home" />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="page/404" element={<Err404 page="dashboard" />} />
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              {/* Users */}
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/add" element={<AddUser />} />
              {/* Orders */}
              <Route path="orders" element={<Orders />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<EditCategory />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<EditProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
