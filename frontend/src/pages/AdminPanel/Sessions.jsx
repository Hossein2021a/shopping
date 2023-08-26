import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useForm } from "react-hook-form";

export default function Sessions() {
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit } = useForm();
  const [Getid, setGetid] = useState("");

  const getAllSession = async () => {
    const response = await fetch(`http://localhost:4000/v1/courses/sessions`, {
      method: "GET",
    });
    return await response.json();
  };

  const getData = useQuery(["sesion"], getAllSession);

  const getCat = async () => {
    const response = await fetch(`http://localhost:4000/v1/courses`, {
      method: "GET",
    });
    return await response.json();
  };

  const getAllCourse = useQuery(["course"], getCat);

  const sendSession = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("time", data.time);
    formData.append("video", data.video[0]);
    formData.append("free", data.free);

    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:4000/v1/courses/${Getid}/sessions`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${gettok.token}`,
        },
        body: formData,
      }
    );
    return response.json();
  };

  const createSession = useMutation(sendSession, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sesion"]);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    createSession.mutateAsync(data);
  };

  const removeSession = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${gettok.token}`,
      },
    });
    return await response.json();
  };

  const deleteSession = useMutation(removeSession, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sesion"]);
    },
  });

  const delSession = (id) => {
    deleteSession.mutateAsync(id);
  };

  return (
    <div className="pr-8 pl-8 p-4 mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-8   bg-secondary-dark-bg p-8 rounded-md">
        <div className="flex w-full items-center gap-6">
          <input
            placeholder="عنوان"
            className="w-full h-9 rounded-md text-[13px] pr-2 "
            {...register("title", { required: true })}
          />
          <input
            placeholder="زمان ویدئو"
            className="w-full h-9 rounded-md text-[13px] pr-2 "
            {...register("time", { required: true })}
          />
        </div>

        <div className="radio-button-container  flex flex-col gap-3 ">
          <div className="flex items-center justify-between w-full gap-6">
            <div className="container w-1/2">
              <div className="select w-full">
                <select onChange={(event) => setGetid(event.target.value)}>
                  <option hidden>دوره مورد نظر خود را انتخاب نمایید...</option>
                  {getAllCourse.data?.map((item) => (
                    <option
                      className="text-14"
                      key={item._id}
                      value={`${item._id}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2 flex justify-center flex-col items-center mt-2 gap-2">
              <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                رایگان:
              </label>
              <div className="flex items-center justify-center gap-3 w-full">
                <div className="radio-button">
                  <input
                    type="radio"
                    {...register("free", {
                      required: {
                        value: true,
                      },
                    })}
                    value={1}
                    className="radio-button__input"
                    id="radio1"></input>
                  <label className="radio-button__label" htmlFor="radio1">
                    <span className="radio-button__custom"></span>
                    می باشد
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    {...register("free", {
                      required: {
                        value: true,
                      },
                    })}
                    value={0}
                    type="radio"
                    className="radio-button__input"
                    id="radio2"></input>
                  <label className="radio-button__label" htmlFor="radio2">
                    <span className="radio-button__custom"></span>
                    نمی باشد
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">

        <input
                {...register("video", { required: true })}
                placeholder="انتخاب"
                type="file"
                className="flex h-10 w-full rounded-md  border-1 border-gray-600 bg-[#2f3239] text-white  px-3 py-2 text-sm  file:border-0 file:bg-main-bg file:text-gray-200 file:text-sm  file:rounded-md "></input>


          <button
            className=" bg-main-bg rounded-md text-14 text-white p-2  w-[150px]"
            type="submit">
            ارسال
          </button>
        </div>
      </form>

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
              <h1>دوره</h1>
            </th>
            <th>
              <h1>زمان</h1>
            </th>
            <th>
              <h1>رایگان</h1>
            </th>
            <th>
              <h1>لینک ویدئو</h1>
            </th>
          </tr>
        </thead>
        {getData.data && (
          <tbody>
            {getData.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.course && item.course.name}</td>
                <td>{item.time}</td>
                <td>{item.free === 1 ? "رایگان" : "غیر رایگان"}</td>
                <td>
                  <button
                    onClick={() => delSession(item._id)}
                    className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
