import React, { useState } from "react";
import "../../Components/Table/DataTable.css";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function DataTable() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getAllCourses = async () => {
    const response = await fetch(`http://localhost:4000/v1/courses`, {
      method: "GET",
    });
    return await response.json();
  };

  const { data, isSuccess } = useQuery(["cours"], getAllCourses, {
    refetchOnWindowFocus: false,
  });

  const removeCourses = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${gettok.token}`,
      },
    });
    return await response.json();
  };

  const delCourse = useMutation(removeCourses, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cours"]);
    },
  });

  const removeCours = (id) => {
    Swal.fire({
      title: "آیا اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> بله مطمئنم',
      cancelButtonText: '<i class="fa fa-thumbs-down">خیر</i>',
      width: "352",
    }).then((result) => {
      if (result.isConfirmed) {
        delCourse.mutateAsync(id);
      }
    });
  };

  const getCategory = async () => {
    const response = await fetch(`http://localhost:4000/v1/category`);
    return await response.json();
  };

  const getCat = useQuery(["cate"], getCategory, {
    refetchOnWindowFocus: false,
  });

  const creatcourse = async (data) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("cover", data.cover[0]);
    formData.append("shortName", data.shortName);
    formData.append("price", Number(data.price) );
    formData.append("status", data.status);
    formData.append("categoryID", data.categoryID);


    const gettokk = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${gettokk.token}`,
      },
      body: formData
    });

    return response.json()

  };

  const makeCourse = useMutation(creatcourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cours"]);
    },
  });

  const onSubmit = (data) => {
    makeCourse.mutateAsync(data)


  };

  return (
    <div>
      <div className="w-full bg-secondary-dark-bg p-8 mb-8">
        <p className="flex items-center justify-center text-white mb-8 bg-main-bg p-1 rounded-sm">
          فرم افزودن محصول جدید
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between gap-4 pb-4">
            <input
              placeholder="نام دوره"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 relative"
              {...register("name", { required: true, maxLength: 40 })}
            />
            {errors.name?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">
                اجباری است
              </span>
            )}

            <input
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 relative"
              placeholder="توضیحات دوره"
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">
                اجباری است
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pb-4">
            <input
              placeholder="لینک دوره"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 flex flex-col"
              {...register("shortName", { required: true })}
            />
            {errors.shortName?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">
                اجباری است
              </span>
            )}

            <input
              placeholder="قیمت دوره"
              className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600"
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <span className="text-red-600 text-[9px] w-[53px]  ">
                اجباری است
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pb-8 mt-4 ">
            <div className="grid w-full max-w-xs items-center gap-3">
              <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-center">
                کاور دوره:
              </label>
              <input
                {...register("cover", { required: true })}
                placeholder="انتخاب"
                type="file"
                className="flex h-10 w-full rounded-md  border-1 border-gray-600 bg-[#2f3239] text-white  px-3 py-2 text-sm  file:border-0 file:bg-main-bg file:text-gray-200 file:text-sm  file:rounded-md "></input>
              {errors.cover?.type === "required" && (
                <span className="text-red-600 text-[9px] w-[53px]  ">
                  اجباری است
                </span>
              )}
            </div>

            <div className="radio-button-container w-1/2 flex flex-col gap-3 ">
              <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                وضعیت دوره:
              </label>
              <div className="flex items-center gap-3">
                <div className="radio-button">
                  <input
                    type="radio"
                    {...register("status", {
                      required: {
                        value: true,
                      },
                    })}
                    value="start"
                    className="radio-button__input"
                    id="radio1"></input>
                  <label className="radio-button__label" htmlFor="radio1">
                    <span className="radio-button__custom"></span>
                    در حال برگزاری
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    {...register("status", {
                      required: {
                        value: true,
                      },
                    })}
                    value="presell"
                    type="radio"
                    className="radio-button__input"
                    id="radio2"></input>
                  <label className="radio-button__label" htmlFor="radio2">
                    <span className="radio-button__custom"></span>
                    پیش فروش
                  </label>
                </div>
              </div>
            </div>

            <div className=" items-center justify-between  flex flex-col gap-3">
              <label
                className="text-sm text-gray-400 font-medium leading-none 
            peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                دسته بندی دوره:
              </label>

              <div className="container">
                <div className="select">
                  <select {...register("categoryID", { required: true })}>
                    {getCat.data?.map((item) => (
                      <option key={item._id} value={`${item._id}`}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            className="flex justify-start items-start bg-main-bg w-fit p-1 pl-6 pr-6 rounded-sm text-white"
            type="submit">
            ارسال
          </button>
        </form>
      </div>

      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>شناسه</h1>
            </th>
            <th>
              <h1>عنوان</h1>
            </th>
            <th>
              <h1>مبلغ</h1>
            </th>
            <th>
              <h1>وضعیت</h1>
            </th>
            <th>
              <h1>لینک</h1>
            </th>
            <th>
              <h1>مدرس</h1>
            </th>
            <th>
              <h1>دسته بندی</h1>
            </th>

            <th>
              <h1>حذف</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price === 0 ? "رایگان" : item.price}</td>
                <td>{item.status}</td>
                <td>{item.shortName}</td>
                <td>{item.creator}</td>
                <td>{item.categoryID.name}</td>

                <td>
                  <button
                    onClick={() => removeCours(item._id)}
                    className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
