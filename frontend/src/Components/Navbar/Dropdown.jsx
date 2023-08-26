import React, { useState } from "react";
import MenuItems from "./MenuItems";

export default function Dropdown({ submenu, dropdown, depthlevel }) {
  depthlevel = depthlevel + 1;
  const getdepth = depthlevel > 1 ? " xll:top-[-10px] xll:right-[135px] " : "";

  return (
    <ul
      className={`dropdown ${getdepth} ${
        dropdown
          ? "xll:shadow-main xll:rounded-lg  show overflow-visible max-h-[1000px] pointer-events-auto xll:absolute pr-[10px] xll:min-w-[200px] xll:flex xll:flex-col xll:gap-3 xll:justify-between xll:pr-[1rem] xll:pt-[1rem] xll:pb-[1rem] xll:opacity-1 bg-white  "
          : "table-column overflow-hidden max-h-0 pointer-events-none pr-[10px] xll:relative xll:pr-0 xll:opacity-0 bg-white   "
      }`}>
      {submenu.map((item, index) => (
        <MenuItems item={item} key={index} depthlevel={depthlevel} />
      ))}
    </ul>
  );
}
