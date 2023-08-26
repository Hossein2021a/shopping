import React from "react";
import DataTable from "../../Components/Table/DataTable";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { useForm } from "react-hook-form";


export default function User() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient()


  const getAllusers = async () => {
    const getme = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getme.token}`,
      },
    });
    return await response.json();
  };

  const query = useQuery(["users"], getAllusers);

  // if (query.isSuccess) {
  //   console.log(query.data);
  // }


  const sendnewUser= async (data) => {
    const response = await fetch(`http://localhost:4000/v1/auth/register` , {
      method:"POST" ,
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(data)
    })
    return await response.json()
  }

  const { mutateAsync } = useMutation(sendnewUser , {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"])
    },
  });

  const onSubmit = (data) => {
    mutateAsync(data)
    reset()
  };


  return (
    <div className="pr-24 pl-24 p-8">
      <div className="w-full bg-secondary-dark-bg p-8 mb-8">
        <p className="flex items-center justify-center text-white mb-8 bg-main-bg p-1 rounded-sm">
          فرم ثبت کاربر جدید
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between gap-4 pb-4">

  
            <input
              placeholder="نام و نام خانوادگی"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 relative"
              {...register("name", { required: true , maxLength: 40})}
            />
            {errors.name?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>
            )}
         


            <input
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 relative"
              placeholder="نام کاربری"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>
              )}
          </div>

          <div className="flex items-center justify-between gap-4 pb-4">
            <input
              placeholder="ایمیل"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 flex flex-col"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>

            )}

            <input
              placeholder="تلفن"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600"
              {...register("phone", { required: true })}
            />
            {errors.phone?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>
              )}
          </div>

          <div className="flex items-center justify-between gap-4 pb-8">
            <input
              placeholder="پسورد"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>
              )}

            <input
              placeholder="تکرار پسورد"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">اجباری است</span>
              )}
          </div>

          <button
            className="flex justify-start items-start bg-main-bg w-fit p-1 pl-6 pr-6 rounded-sm text-white"
            type="submit">
            ارسال
          </button>
        </form>
      </div>
      <div className="">{<DataTable data1={query.data && query.data} />}</div>
    </div>
  );
}
