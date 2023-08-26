import React from "react";
import { Menuitem } from "./Menuitem";
import MenuItems from "./MenuItems";
import Logo from "../../assets/images/Logo.png";

import { useQuery } from "react-query";
import api from "../../Components/UserApi";

export default function Navbar() {
  const query = useQuery(["topbar"], () => api.get("/v1/menus"));

  const depthlevel = 0;

  return (
    <div className="xll:flex xll:items-center xll:gap-14 xll:h-full ">
      <a href="/" className="m-auto pb-6 pt-1 xll:p-0">
        <img className="w-[145px] bg-cover" src={Logo} alt="" />
      </a>
      {query.isSuccess && (
        <ul className="text-[16px] text-[#7f8187] xll:flex xll:items-center xll:gap-5 xll:justify-center xll:h-full ">
          {query.data.data?.map((item, index) => (
            <MenuItems item={item} key={index} depthlevel={depthlevel} />
          ))}
        </ul>
      )}
    </div>
  );
}
