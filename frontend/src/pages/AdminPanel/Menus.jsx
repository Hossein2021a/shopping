import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "react-query";

export default function Menus() {
  const { register, reset, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const [parent, setparent] = useState(-1);

  const getAllmenus = async () => {
    const response = await fetch(`http://localhost:4000/v1/menus/topbar`, {
      method: "GET",
    });
    return await response.json();
  };
  const getAllTopMenu = useQuery(["menu"], getAllmenus);

  const getAllparentmenus = async () => {
    const response = await fetch(`http://localhost:4000/v1/menus`, {
      method: "GET",
    });
    return await response.json();
  };
  const getAllTopparentMenu = useQuery(["menuParent"], getAllparentmenus);

  const findparent = (parent) => {
    if (getAllTopparentMenu.isSuccess) {
      const finds = getAllTopparentMenu.data.filter(
        (item) => item._id === parent
      );
      return finds.map((item) => item.title);
    }
  };

  const createAllparentmenus = async (data) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettok.token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const creatmenu = useMutation(createAllparentmenus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["menu"]);
      queryClient.invalidateQueries(["menuParent"]);
    },
  });

  const onSubmit = (data) => {
    const newdat = { ...data, parent: undefined };

    if (data.parent === "-1") {
      creatmenu.mutateAsync(newdat);
    } else {
      creatmenu.mutateAsync(data);
    }
    reset();
  };

  const deleteAllparentmenus = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/menus/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettok.token}`,
      },
    });
    return await response.json();
  };

  const removemenu = useMutation(deleteAllparentmenus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["menu"]);
      queryClient.invalidateQueries(["menuParent"]);
    },
  });

  const remoemenu = (id) => {
    removemenu.mutateAsync(id);
  };

  return (
    <div className=" pr-12 pl-12 mt-4">
      <div className=" w-full bg-secondary-dark-bg p-8">
        <span className=" text-white font-body text-[18px] mb-6 flex items-center justify-center ">
          فرم ساخت منو
        </span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-6 justify-between">
            <input
              placeholder="عنوان"
              className="w-full h-9 rounded-md text-[13px] pr-3 "
              {...register("title", { required: true })}
            />
            <input
              placeholder="لینک"
              className="w-full h-9 rounded-md text-[13px] pr-3 "
              {...register("href", { required: true })}
            />
          </div>
          {getAllTopparentMenu.data && (
            <div className="container ">
              <div className="select w-2/5 h-[36px]">
                <select
                  placeholder="دسته بندی والد را انتخاب کنید"
                  className="w-full h-9 rounded-md"
                  {...register("parent", { required: true })}>
                  <option hidden>لطفا یک گزینه را انتخاب نمایید ...</option>

                  <option value={parent}>منوی اصلی</option>
                  {getAllTopparentMenu.data.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            className=" bg-main-bg rounded-md text-14 text-white p-2 flex justify-center items-center  w-[150px]"
            type="submit">
            ارسال
          </button>
        </form>
      </div>

      {getAllTopMenu.data && (
        <table className="container mt-8">
          <thead>
            <tr>
              <th>
                <h1>شناسه</h1>
              </th>
              <th>
                <h1>عنوان</h1>
              </th>
              <th>
                <h1>مقصد</h1>
              </th>
              <th>
                <h1>فرزند</h1>
              </th>

              <th>
                <h1>حذف</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllTopparentMenu.isSuccess &&
              getAllTopparentMenu.data.map((item) => (
                <tr className="mb-8" key={item._id}>
                  <td>{"منوی اصلی"}</td>
                  <td>{item.title}</td>
                  <td>{item.href}</td>
                  <td>ندارد</td>
                  <td>
                    <button
                      onClick={() => remoemenu(item._id)}
                      className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            {getAllTopMenu.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.href}</td>
                <td>{findparent(item.parent)}</td>
                <td>
                  <button
                    onClick={() => remoemenu(item._id)}
                    className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
