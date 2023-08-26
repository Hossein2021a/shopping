import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from 'react-loading-skeleton';


export default function SkeletonBar({num}) {
  return (
    Array(num).fill(0).map((item , index)=>(
      <SkeletonTheme baseColor="#F0F0F0" highlightColor="#E8E8E8" direction="rtl" key={index}>
      <div
        style={{ width: "inherit" }}
        className=" rounded-md flex flex-col items-center border-1 p-4  max-w-[350px] mb-[2rem] ">
        <div>
          <Skeleton width={260} height={200}   />
        </div>
        <div className=" w-full   relative top-1">
  
          <div className="flex items-center justify-center w-full  mb-[0.3rem]">
          <Skeleton width={260} height={20}   />
  
          </div>
  
          <div className="w-full flex items-center justify-center gap-4  ">
          <Skeleton width={122} height={20}   />
          <Skeleton width={122} height={20}   />
  
          </div>
         
          <div className="w-full flex items-center justify-center gap-4  ">
          <Skeleton width={122} height={20}   />
          <Skeleton width={122} height={20}   />
  
          </div>
        </div>
      </div>
      </SkeletonTheme>
    ))


  );
}
