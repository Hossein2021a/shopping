import React from "react";
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CiTimer } from "react-icons/ci";
import Rating from "@mui/material/Rating";
import {Link} from "react-router-dom"






export default function CourseBox({ image, title, teacherName, time, price ,score , link , discount }) {
  return (
    <div
      style={{ boxShadow: "0 0 7px 0 #eaeff4", width: "inherit" }}
      className=" rounded-md flex flex-col items-center  max-w-[350px] mb-[2rem] bg-white ">
      <Link className="w-full" to={link}>
        <img
          loading="lazy"
          className=" rounded-t-sm overflow-hidden w-full h-[180px] "
          src={`http://localhost:4000/courses/covers/${image}`}
        />
      </Link>

      <div className="flex flex-col w-full p-4 pb-5 bg-sidepic bg-no-repeat bg-[length:25px]  relative top-1">
        <Link
          to={link}
          className="text-14 text-right text-demibold mb-[1rem] line-clamp-1 text-title-color">
          {title}
        </Link>

        <div className="flex items-center justify-between w-full text-text-color mb-[1rem]">
          <div className="flex items-center gap-2  ">
            <PiChalkboardTeacherThin className="text-xl" />
            <span className="text-[12px]">{teacherName}</span>
          </div>

          <Rating value={score} sx={{fontSize : "16px" , pointerEvents : "none"}} />
        </div>

        <div className="w-full border-t-2 border-gray-200 flex items-center justify-between pt-[0.5rem]  ">
          <div className="flex items-center gap-2">
            <CiTimer className="text-xl text-blue-500" />
            <span className="text-14 text-blue-500">{time}</span>
          </div>
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className={`${discount && discount ? "line-through" : ""} text-[#52ac66] text-14`}>{price}</span>
            <span className="text-red-500 text-14">{discount && discount !== 0 ? discount.toLocaleString() : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
