import React from "react";
import "./DataTable.css";
import Swal from "sweetalert2";

import { useQuery, useMutation, useQueryClient } from "react-query";

export default function DataTable({ data1 }) {
  const queryClient = useQueryClient();

  const deleteUser = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${gettok.token}`,
      },
    });
    return await response.json();
  };

  const { mutateAsync } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const removeUser = (id) => {
    Swal.fire({
      text: "آیا اطمینان دارید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله اطمینان دارم",
      cancelButtonText: "خیر لغو شود",
      width: "322",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };

  const banUserfunc = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/users/ban/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${gettok.token}`,
      },
    });
    console.log(response);
    return await response.json();
  };

  const query = useMutation(banUserfunc, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        icon: "success",
        title: "کاربر مورد نظر بن شد",
        showConfirmButton: true,
        confirmButtonText: "تایید",
        width: "322",
        confirmButtonColor: "#3085d6",
      });
    },
  });

  const banUser = (id) => {
    Swal.fire({
      text: "آیا اطمینان دارید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله اطمینان دارم",
      cancelButtonText: "خیر لغو شود",
      width: "322",
    }).then((result) => {
      if (result.isConfirmed) {
        query.mutateAsync(id);
      }
    });
  };

  return (
    <div>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>شناسه</h1>
            </th>
            <th>
              <h1>نام و نام خانوادگی</h1>
            </th>
            <th>
              <h1>ایمیل</h1>
            </th>
            <th>
              <h1>حذف</h1>
            </th>
            <th>
              <h1>بن</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {data1 &&
            data1.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
           
                <td>
                  <button
                    onClick={() => removeUser(item._id)}
                    className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => banUser(item._id)}
                    className="bg-yellow-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                    بن کردن
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
