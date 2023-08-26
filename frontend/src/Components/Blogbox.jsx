import React from "react";
import {  PiChatsCircleLight } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";

export default function Blogbox({ image, title, date, comment, text }) {
  return (
    <div
      style={{ boxShadow: "0 0 7px 0 #eaeff4", width: "inherit" }}
      className=" rounded-md flex flex-col items-center  max-w-[350px] mb-[2rem] bg-white ">
      <a className="w-full p-2" href="#">
        <img
          className=" p-2 border-dashed border-1 border-gray-300 rounded-md overflow-hidden w-full "
          src={image}
        />
      </a>

      <div className="flex flex-col w-full pt-2 p-4 pb-5 bg-sidepic bg-no-repeat bg-[length:25px]  relative top-1">
        <a
          href="#"
          className="text-14 text-center text-demibold mb-[1rem]  pb-4 text-title-color line-clamp-1 h-[25px]
      ">
          {title}
        </a>

        <div className="flex items-center justify-between w-full text-text-color border-t-1 border-gray-200 pt-[0.5rem] mb-[1rem]">
          <div className="flex items-center gap-2  ">
            <CiCalendarDate className="text-xl text-green-600" />
            <span className="text-[12px]">{date}</span>
          </div>

          <div className="flex items-center gap-2">
          <PiChatsCircleLight className="text-xl text-green-600" />
            <span className="text-[13px]">{comment} دیدگاه</span>
          </div>
        </div>

        <div className="w-full border-gray-50 flex items-center justify-between  ">
          <div className=" rounded-md shadow-sm  ">
            
            <p className=" line-clamp-3 text-[11px] text-right  border-[1rem] border-transparent bg-gray-100 ">
          {text}
            </p>
           
          </div>
         
        </div>
      </div>
    </div>
  );
}
