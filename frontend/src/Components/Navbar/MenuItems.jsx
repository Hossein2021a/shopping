import React, { useState } from "react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import Dropdown from "./Dropdown";
import { useStateContext } from "../../Contexts/Contextprovider";

import {Link} from "react-router-dom"

export default function MenuItems({item, depthlevel }) {
  const [dropdown, setdropdown] = useState(false);
  const { handleclick, screenSize, setscreenSize } = useStateContext();

  const onMouseEnter = () => {
    {
      screenSize > 1160 ? setdropdown(true) : "";
    }
  };
  const onMouseLeave = () => {
    {
      screenSize > 1160 ? setdropdown(false) : "";
    }
  };

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`pt-3 pb-3 last:border-none border-b-1 border-gray-300 xll:border-b-0 xll:p-0 xll:h-full xll:relative cursor-pointer text-[15px]`}>
        
      {item.submenus && item.submenus.length > 0 ? (
        <>
          <Link
          to={item.href}
            onClick={() => {
              {
                screenSize < 1160 ? setdropdown((prev) => !prev) : "";
              }
            }}
            className={`navbtn ${
              dropdown ? "coloring" : ""
            } navbtn flex items-center justify-between w-full xll:w-auto  xll:gap-1 xll:h-full text-thin   `}>
            {item.title}

            {screenSize > 1160 ? (
              screenSize > 1160 && depthlevel > 0 ? (
                <BiChevronLeft className=" relative bottom-0.5" />
              ) : (
                <BiChevronDown />
              )
            ) : screenSize < 1160 ? (
              <BiChevronLeft
                className={`leftarrow ${dropdown ? "arrow" : ""}`}
              />
            ) : (
              <BiChevronDown />
            )}
          </Link>
          <Dropdown
            submenu={item.submenus}
            dropdown={dropdown}
            depthlevel={depthlevel}
          />
        </>
      ) : (
        <Link
          className= {`${depthlevel > 0 ? "text-[13px]" : ""} min-w-full  h-full xll:flex items-center hover:text-green-700 text-thin`}
          to={item.href}>
          {item.title}
        </Link>
      )}
    </li>
  );
}
