import React, { useContext, useEffect, useState } from "react";
import Logo from "../../src/assets/images/Logo.png";
import Logo2 from "../../src/assets/images/Logo2.png";
import Navbar from "./Navbar/Navbar";
import AuthContext from "../Contexts/authContext";
import {
  CiSearch,
  CiShoppingCart,
  CiUser,
  CiTextAlignLeft,
  CiPhone,
} from "react-icons/ci";
import { useStateContext } from "../Contexts/Contextprovider";
import Search from "./Navbar/Search";
import { Link } from "react-router-dom";



export default function Header() {


  const authContext = useContext(AuthContext);

  const { handleclick, screenSize, setscreenSize, isClicked } =
    useStateContext();
  const [openmenu, setopenmenu] = useState(false);

  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      document.removeEventListener("resize", handleResize);
    };
  }, []);

  const Navbutton = ({ customfunc, indexs }) => (
    <button
      type="button"
      onClick={customfunc}
      className={`${
        screenSize < 484
          ? "w-[42px] h-[42px] text-xl"
          : "w-[46px] h-[46px] text-2xl"
      } rounded-md bg-bg-light  text-[#7f8187] flex justify-center items-center hover:bg-[#e6eaf1] transition-[0.3s]`}>
      {indexs}
    </button>
  );

  return (
    <header>


      <div
        className={`${
          screenSize < 484 ? "pl-[1rem] pr-[1rem]" : "pl-[2rem] pr-[2rem]"
        } flex justify-between items-center text-14 h-[5rem]`}>
        <a href="/" className="xll:hidden">
          <img
            className={`${screenSize < 484 ? "w-[59px]" : "w-[140px]"}`}
            src={`${screenSize < 484 ? Logo2 : Logo} `}
            alt="امپراطور"
          />
        </a>

        <div
          className={`${
            screenSize < 1160 && openmenu === false
              ? "overflow-hidden max-w-0 p-0 transition-[0.5s] "
              : " xll:flex  xll:h-full xll:items-center xll:justify-center overflow-auto max-w-[280px] p-5 transition-[0.5s] z-10"
          }
        
        absolute right-0 top-0 bg-white shadow-lg w-[280px] h-screen overflow-auto xll:relative xll:shadow-none xll:overflow-visible xll:bg-transparent xll:w-auto xll:max-w-full xll:p-0`}>
          <Navbar />
        </div>

        <div className="flex items-center gap-1.5 relative">
          {screenSize > 700 ? (
            <button
              onClick={() => handleclick("profile")}
              className=" border-1 border-orange-400 pl-3 pr-3 rounded-md h-[46px] hover:bg-main-bg hover:text-white hover:border-green-600 transition-[0.3s] ">
              {authContext.islogin ? (
                <Link>
                  <span>{authContext.userinfo.name}</span>
                </Link>
              ) : (
                <a href="/signup"> ورود یا عضویت </a>
              )}
            </button>
          ) : (
            <Navbutton
              customfunc={() => handleclick("profile")}
              indexs={<CiUser />}
            />
          )}

          <Navbutton
            customfunc={() => handleclick("phone")}
            indexs={<CiPhone />}
          />

          <Navbutton
            customfunc={() => handleclick("search")}
            indexs={<CiSearch />}
          />

          <Navbutton
            customfunc={() => handleclick("basket")}
            indexs={<CiShoppingCart />}
          />

          {screenSize < 1160 ? (
            <Navbutton
              indexs={<CiTextAlignLeft />}
              customfunc={() => setopenmenu((prev) => !prev)}
            />
          ) : (
            ""
          )}

          {isClicked.search && <Search />}
        </div>
      </div>
    </header>
  );
}
