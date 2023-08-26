import React from "react";
import { get, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Off() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const getAllCourses = async () => {
    const response = await fetch(`http://localhost:4000/v1/courses`, {
      method: "GET",
    });
    return await response.json();
  };

  const { data } = useQuery(["coursesss"], getAllCourses, {
    refetchOnWindowFocus: false,
  });

  const getAllOff = async () => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/v1/offs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettok.token}`,
      },
    });

    if (response.status === 200 ) {
      return await response.json();
    }
  };

  const getOff = useQuery(["Offs"], getAllOff, {
    onError: () => {
      "nothing";
    },
  });

  const creatOff = async (data) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/v1/offs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettok.token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  const makeOff = useMutation(creatOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Offs"]);
    },
  });

  const onSubmit = (data) => {
    makeOff.mutateAsync(data);
    reset();
  };

  const deleteOff = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/offs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gettok.token}`,
      },
    });
    return await response.json();
  };
  const removeOff = useMutation(deleteOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Offs"]);
    },
  });

  const removethisOff = (id) => {
    removeOff.mutateAsync(id);
  };

  return (
    <div className=" pl-12 pr-12 mt-8">
      <div className=" w-full bg-secondary-dark-bg p-8">
        <span className=" text-white font-body text-[18px] mb-6 flex items-center justify-center">
          فرم ساخت کد تخفیف
        </span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-6 justify-between">
            <input
              placeholder="نام کد تخفیف"
              className="w-full h-9 rounded-md text-[13px] pr-2 "
              {...register("code", { required: true })}
            />
            <input
              placeholder="درصد کد تخفیف"
              className="w-full h-9 rounded-md text-[13px] pr-2 "
              {...register("percent", { required: true })}
            />
          </div>
          <div className="flex items-center gap-6 justify-between">
            <input
              placeholder="بیشترین تخفیف"
              className="w-full h-9 rounded-md text-[13px] pr-2 "
              {...register("max", { required: true })}
            />
            <div className="container ">
              <div className="select w-full h-[36px]">
                <select
                  className="w-full h-9 rounded-md"
                  {...register("course", { required: true })}>
                  <option>انتخاب کنید ...</option>
                  {data &&
                    data.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <button
            className=" bg-main-bg rounded-md text-14 text-white p-2  w-[150px]"
            type="submit">
            ارسال
          </button>
        </form>
      </div>

      {getOff.data && (
        <table className="container mt-8">
          <thead>
            <tr>
              <th>
                <h1>شناسه</h1>
              </th>
              <th>
                <h1>نام کد تخفیف</h1>
              </th>
              <th>
                <h1>سازنده کد</h1>
              </th>
              <th>
                <h1> تعداد مجاز</h1>
              </th>
              <th>
                <h1>مقدار کد (درصد)</h1>
              </th>
              <th>
                <h1>تعداد استفاده شده</h1>
              </th>
              <th>
                <h1>حذف</h1>
              </th>
            </tr>
          </thead>

          <tbody>
            {getOff.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.code}</td>
                <td>{item.creator}</td>
                <td>{item.max}</td>
                <td>{item.percent}</td>
                <td>{item.uses}</td>

                <td>
                  <button
                    onClick={() => removethisOff(item._id)}
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
