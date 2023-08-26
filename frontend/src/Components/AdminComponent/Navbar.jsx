import React, { useEffect } from "react";
import { useStateContext } from "../../Contexts/Contextprovider";
import { FiMenu } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatText } from "react-icons/bs";
import { RiNotification2Line } from "react-icons/ri";
import avatar from "../../assets/images/avatar.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Cart from "./Cart";
import Chat from "./Chat";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { useQuery } from "react-query";
export default function Navbar() {
  const {
    setactiveMenu,
    handleclickadmin,
    isclickedAdmin,
    setisclickedAdmin,
    currentColor,
    scrrensize,
  } = useStateContext();

  useEffect(() => {
    if (scrrensize <= 900) {
      setactiveMenu(false);
    } else {
      setactiveMenu(true);
    }
  }, [scrrensize]);

  const NavButton = ({ custonFunc, icon, color, dotColor }) => (
    <button
      type="button"
      onClick={custonFunc}
      style={{ color }}
      className="relative hover:bg-gray-100 p-3 text-white hover:text-black rounded-full text-xl flex items-center">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"></span>
      {icon}
    </button>
  );
  const getdata = JSON.parse(localStorage.getItem("user"));

  const getadmin = async () => {
    const response = await fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${getdata.token}`,
      },
    });
    return await response.json();
  };

  const query = useQuery(["me"], getadmin, {
    refetchOnWindowFocus: false,
  });

  // if(query.data){
  //   console.log(query.data)
  // }


  return (
    <div className="flex border-b-1 border-gray-600 justify-between items-center relative pb-1">

      <div className="flex items-center">
      <NavButton
        title="منو"
        custonFunc={() => setactiveMenu((prev) => !prev)}
        color={currentColor}
        icon={<FiMenu />}></NavButton>

        
<NavButton
          title="اطلاع رسانی"
          custonFunc={() => handleclickadmin("notification")}
          color={currentColor}
          dotColor="#03C9D7"
          icon={<RiNotification2Line />}></NavButton>

</div>

      <div className=" flex flex-row-reverse">
    

        <div
          className="flex items-center justify-center gap-2 cursor-pointer ml-4 mt-[3px] p-1 hover:bg-gray-100 rounded-lg"
          onClick={() => handleclickadmin("profile")}>
          {query.data && (
            <>
              <img src={avatar} className="rounded-full w-7 h-7" />
              <p className="">
                <span className=" text-gray-400 text-14 select-none">
                  سلام ،
                </span>
                <span className=" text-gray-400 text-14">
                  {" "}
                  {query.data.name}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </>
          )}
        </div>



      
        {isclickedAdmin.notification && <Notification noti = {query.data && query.data.notifications
} />}
        {isclickedAdmin.profile && <UserProfile />}
      </div>
    </div>
  );
}
