import { Route, Routes } from "react-router-dom";
import GoogleCallback from "./Pages/Auth/AuthOperations/GoogleCallback";
import Users from "./Pages/Dashboard/Users/Users";
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
import Footer from "./Components/Website/Footer";
import Orders from "./Pages/Dashboard/Orders";
import MyOrders from "./Pages/Website/MyOrders";
import Messages from "./Pages/Dashboard/Messages";
import Wishlist from "./Pages/Website/Wishlist";
import AboutUs from "./Pages/Website/About/AboutUs";
import ScrollToTop from "./Components/Website/ScrollToTop/ScrollToTop";
import { Suspense, lazy, useEffect } from "react";
import Loding from "./Components/Loding/Loding";
import { useTheme } from "./Context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Home = lazy(() => import("./Pages/Website/Home/Landing/Home"));
const NavBar = lazy(() => import("./Components/Website/NavBar/NavBar"));
const Shop = lazy(() => import("./Pages/Website/Shop/Shop"));
const Settings = lazy(() => import("./Pages/Website/Settings/Settings"));
const Login = lazy(() => import("./Pages/Auth/AuthOperations/Login"));
const Register = lazy(() => import("./Pages/Auth/AuthOperations/Register"));
const RequireAuth = lazy(() => import("./Pages/Auth/Protecting/RequireAuth"));
const CatigoriesSearch = lazy(
  () => import("./Pages/Website/CatigoriesSearch/CatigoriesSearch"),
);
const SingleProduct = lazy(
  () =>
    import("./Components/Website/Home/Products/SingleProduct/SingleProduct"),
);
const SingleCategories = lazy(
  () => import("./Components/Website/SingleCategories/SingleCategories"),
);

export default function App() {
  const theme = useTheme();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refresh();
  }, []);

  return (
    <div className={theme === "dark" ? "bg-dark text-light" : "bg-light"}>
      <Suspense fallback={<Loding />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<NavBar />}>
            <Route element={<Footer />}>
              <Route element={<ScrollToTop />}>
                <Route path="/" element={<Home />} />
                <Route path="/catigories" element={<CatigoriesSearch />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/category/:id" element={<SingleCategories />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/settinges" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          <Route element={<RequireBack />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
      </Suspense>
    </div>
  );
}
