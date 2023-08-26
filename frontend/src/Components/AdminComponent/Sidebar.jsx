import React from "react";
import { useStateContext } from "../../Contexts/Contextprovider"
import { SlPuzzle } from "react-icons/sl";
import { TfiClose } from "react-icons/tfi";
import { Link, NavLink } from "react-router-dom";
import {links} from "../../assets/data/dummy"


export default function Sidebar() {
  const { activeMenu, setactiveMenu, currentColor, scrrensize } =
    useStateContext();

  const handlecloseSidebar = () => {
    if (activeMenu && scrrensize <= 1024) {
      setactiveMenu(false);
    }
  };

  const activelink = 'flex items-center text-gray-100 dark:text-gray-100 gap-5 p-2 pr-4 rounded-lg text-md m-3 transition-all'
  const normallink = 'flex items-center text-gray-700 dark:hover:text-black dark:text-gray-200 gap-5 p-2 pr-4 rounded-lg text-md m-3 hover:bg-light-gray transition-all'

  return (
    <div className=" mr-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center mt-4 dark:text-white text-slate-900 ml-4 ">
            <Link
              to="/"
              onClick={handlecloseSidebar}
              className="flex items-center gap-3 mr-3 text-xl font-bold tracking-tight">
              <span className="border-2 border-gray-500 rounded-full p-[5px] flex items-center justify-center">
                <SlPuzzle className="text-lg flex items-center justify-center " />
              </span>

              <span>پازلـــ</span>
            </Link>

          
              <button
                className="border-2 hover:bg-light-gray hover:text-gray-900 border-gray-500 rounded-full p-[3px] flex items-center justify-center"
                onClick={() => setactiveMenu((prev) => !prev)}>
                <TfiClose />
              </button>
          </div>

          <div className="mt-10 ">

            {links.map((item)=>(

              <div key={item.title}>
                <p className=" text-gray-400 mt-4 mr-2">{item.title}</p>
                {item.links.map((link)=>(
                  <NavLink onClick={handlecloseSidebar} key={link.name} to={`/${link.to}`} style={({isActive})=> ({backgroundColor:isActive ? "#6528F7" : ""})} className={({isActive})=> isActive ? activelink : normallink}>

                    {link.icon}
                    {link.name}


                  </NavLink>
                ))}
                </div>
              
            ))}
         
          </div>
        </>
      )}
    </div>
  );
}
