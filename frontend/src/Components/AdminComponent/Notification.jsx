import React from "react";
import { useQueryClient, useMutation } from "react-query";

export default function Notification({ noti }) {
  const queryClient = useQueryClient();

  const updatenotification = async (id) => {
    const getfromLocal = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:4000/v1/notifications/see/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${getfromLocal.token}`,
        },
      }
    );
    return await response.json();
  };

  const { mutateAsync } = useMutation(updatenotification, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(data);
    },
  });

  const updateNoti = (id) => {
    mutateAsync(id);
  };

  return (
    <div>
      <div className=" absolute right-12 top-[50px]">

        {noti.length !== 0 &&        
        <ul className=" bg-white p-4 rounded-sm flex flex-col gap-4">
          {noti.map((item, index) => (
            <li
              key={item._id}
              className="  text-[12px] flex items-center justify-between gap-4 ">
              <p className="bg-orange-500 text-right rounded-full w-[25px] h-[20px] flex items-center justify-center text-white text-[10px]">
                {index + 1}
              </p>
              <p className="text-right  w-full">{item.msg}</p>
              <button
                onClick={() => updateNoti(item._id)}
                className="bg-orange-500 p-1 rounded-md text-white">
                دیدم
              </button>
            </li>
          ))}
        </ul> }
 
      </div>
    </div>
  );
}
