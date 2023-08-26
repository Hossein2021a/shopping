import React, { useState } from "react";
import "../../Components/Table/DataTable.css";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Category() {
  const [showform, setshowform] = useState(false);
  const [catId, setcatId] = useState("");
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { register: register1, handleSubmit: handleSubmit1 } = useForm();

  const getallCategory = async () => {
    const response = await fetch(`http://localhost:4000/v1/category`, {
      method: "GET",
    });
    return await response.json();
  };

  const { data, isSuccess } = useQuery(["category"], getallCategory, {
    refetchOnWindowFocus: false,
  });

  const addnewcategory = async (data) => {
    const gettokkk = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettokkk.token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const query = useMutation(addnewcategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const onSubmit = (data) => {
    query.mutateAsync(data);
    reset();
  };

  const removeCategory = async (id) => {
    const gettokkk = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettokkk.token}`,
      },
    });
    return await response.json();
  };

  const catQuery = useMutation(removeCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const removeCat = (id) => {
    catQuery.mutateAsync(id);
  };

  const editCategory = async (data) => {
    const gettokkk = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/category/${catId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettokkk.token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const editCatQuery = useMutation(editCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const onSubmitEdit = (data) => {
    editCatQuery.mutateAsync(data);
    setshowform(false);
  };

  const showformEdit = (id) => {
    setcatId(id);
    setshowform(true);

    if (isSuccess) {
      const getitems = data.filter((item) => item._id === id);
      getitems.map((item) => {
        setinput1(item.title);
        setinput2(item.name);
      });
    }
  };

  return (
    <div
      className={`${
        showform ? "pointer-events-none" : ""
      } pl-24 pr-24 p-8 w-full relative`}>
      <div className={`${showform ? "opacity-[0.5]" :""} w-full mb-8 bg-secondary-dark-bg p-8`}>
        <div className="text-center w-full text-white mb-8  ">
          فرم ویرایش دسته بندی
        </div>
        <form
          className="flex items-center justify-between gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="عنوان دسته بندی"
            className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 flex flex-col"
            {...register("title", { required: true })}
          />
          <input
            placeholder="نام دسته بندی"
            className="w-1/2 p-2 rounded-sm text-[12px] bg-[#2f3239] text-white border-1 border-gray-600 flex flex-col"
            {...register("name", { required: true })}
          />

          <button
            className=" bg-main-bg h-[2.1rem] text-14 rounded-sm pl-4 pr-4 text-white"
            type="submit">
            ارسال
          </button>
        </form>
      </div>

      <table className={`${showform ? "opacity-[0.5]" : ""} container`}>
        <thead>
          <tr>
            <th>
              <h1>شناسه</h1>
            </th>
            <th>
              <h1>عنوان</h1>
            </th>
            <th>
              <h1>ویرایش</h1>
            </th>
            <th>
              <h1>حذف</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <button
                    onClick={() => showformEdit(item._id)}
                    className="bg-blue-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeCat(item._id)}
                    className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div
        className={` ${
          showform ? "flex pointer-events-auto opacity-100 " : "hidden"
        } fixed top-[50%] right-[50%] mt-[-100px] mr-[-100px] opacity-100  items-center justify-center`}>
        <form
          className="flex flex-col gap-5 bg-secondary-dark-bg p-8 rounded-md"
          onSubmit={handleSubmit1(onSubmitEdit)}>
          <span className="text-white flex items-center justify-center">
            ویرایش دسته بندی
          </span>
          <input
            defaultValue={input1}
            className="p-2 min-w-[350px] text-14 rounded-sm"
            placeholder="عنوان راوارد نمایید"
            {...register1("title", { required: true })}
          />
          <input
            defaultValue={input2}
            className="p-2 min-w-[350px] text-14 rounded-sm"
            placeholder="لینک را وارد نمایید"
            {...register1("name", { required: true })}
          />

          <div className="flex justify-between gap-5 w-full">
            <button
              className=" bg-main-bg text-white rounded-sm pl-4 pr-4 p-2"
              type="submit">
              ارسال
            </button>
            <button
              className="text-white bg-red-600 rounded-sm pl-4 pr-4 p-2 "
              onClick={() => setshowform(false)}>
              لغو کردن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
