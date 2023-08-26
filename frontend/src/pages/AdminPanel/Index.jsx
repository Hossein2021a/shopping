// import "./App.css";
import { FiSettings } from "react-icons/fi";
import Sidebar from "../../Components/AdminComponent/Sidebar";
import Navbar from "../../Components/AdminComponent/Navbar";
import { useStateContext } from "../../Contexts/Contextprovider";
import { Route, Routes } from "react-router-dom";
import User from "./User";
import Courses from "./Courses";
import Category from "./Category";
import Comments from "./Comments";
import Off from "./Off";
import Menus from "./Menus";
import Sessions from "./Sessions"
import Home from "./Home"


export default function App() {
  const { activeMenu, isClicked, currentColor, cuurentMode } =
    useStateContext();

  return (
    <div className={cuurentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
   

        {activeMenu ? (
          <div
            className={`w-72 transition-all fixed shrink-0 top-[55px] lg:top-0  dark:bg-secondary-dark-bg bg-white`}
            style={{ zIndex: isClicked.cart ? "10" : "10009" }}>
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 transition-all">
            <Sidebar />
          </div>
        )}

        <div
          className={`dark:bg-main-dark-bg bg-gray-100 min-h-screen max-w-full grow ${
            activeMenu && "lg:pr-72"
          }
          `}>
          <div
            style={{ zIndex: "100000" }}
            className=" sticky top-0 left-0 dark:bg-main-dark-bg p-2 bg-main-bg">
            <Navbar />
          </div>

          <Routes>
            <Route path="users" element={<User />} />
            <Route path="courses" element={<Courses />} />
            <Route path="category" element={<Category />} />
            <Route path="comments" element={<Comments />} />
            <Route path="off" element={<Off />} />
            <Route path="menus" element={<Menus />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="home" element={<Home />} />
          
          </Routes>

        </div>
      </div>
    </div>
  );
}
