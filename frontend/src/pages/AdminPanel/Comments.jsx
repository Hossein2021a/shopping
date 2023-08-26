import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Comments() {
  const queryClient = useQueryClient();
  const [showComment, setshowComment] = useState(false);
  const [Com, setCom] = useState("");
  const { register, handleSubmit, reset , formState: { errors } } = useForm();
  const [getid, setgetid] = useState(null);
  const [showanswer, setshowanswer] = useState(false);




  const getAllComments = async () => {
    const response = await fetch(`http://localhost:4000/v1/comments`, {
      method: "GET",
    });
    return await response.json();
  };

  const getCommnets = useQuery(["commentss"], getAllComments);
  if (getCommnets.isSuccess) {
    console.log(getCommnets.data);
  }
  const showCom = (id) => {
    const filtercomment = getCommnets.data?.filter(
      (coment) => coment._id === id
    );
    console.log(filtercomment);
    filtercomment.map((item) => setCom(item.body));
    setshowComment(true);
  };

  const deleteComments = async (id) => {
    const gettokens = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/comments/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${gettokens.token}`,
      },
    });
    return await response.json();
  };

  const removeComment = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries(["commentss"]);
    },
  });

  const removethisComment = (id) => {
    removeComment.mutateAsync(id);
  };

  const banuser = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/users/ban/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${gettok.token}`,
      },
    });

    return await response.json();
  };

  const banUsers = useMutation(banuser);

  const banuserr = (id) => {
    banUsers.mutateAsync(id);
    Swal.fire({
      text: "با موفقیت بن شد",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "باشه",
      width: "322",
    });
  };

  const AcceptComment = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:4000/v1/comments/accept/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${gettok.token}`,
        },
      }
    );

    return await response.json();
  };

  const AcceptCommentuser = useMutation(AcceptComment);

  const aceptserr = (id) => {
    AcceptCommentuser.mutateAsync(id);
    Swal.fire({
      text: "با موفقیت انجام شد",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "باشه",
      width: "322",
    });
  };

  const rejectComment = async (id) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:4000/v1/comments/reject/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${gettok.token}`,
        },
      }
    );

    return await response.json();
  };

  const rejectCommentuser = useMutation(rejectComment);

  const rejectserr = (id) => {
    rejectCommentuser.mutateAsync(id);
    Swal.fire({
      text: "با موفقیت انجام شد",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "باشه",
      width: "322",
    });
  };


  const answerComment = async (data) => {
    const gettok = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:4000/v1/comments/answer/${getid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gettok.token}`,
        },
        body : JSON.stringify(data)
      }
    );

    return await response.json();
  };

  const answerCommentuser = useMutation(answerComment);

  const answer = (id) => {
    setgetid(id)
    setshowanswer(true)
  }

  const onSubmit = (data) => {
    answerCommentuser.mutateAsync(data);
    setshowanswer(false)
    reset()
  }


  return (
    <div>
      <div className=" pl-8 pr-8 p-4">
        <table className="container">
          <thead>
            <tr>
              <th>
                <h1>شناسه</h1>
              </th>
              <th>
                <h1>نام کاربر</h1>
              </th>
              <th>
                <h1>دوره</h1>
              </th>
              <th>
                <h1>مشاهده</h1>
              </th>
              <th>
                <h1>پاسخ</h1>
              </th>
              <th>
                <h1>وضعیت</h1>
              </th>
              <th>
                <h1>حذف</h1>
              </th>
              <th>
                <h1>بن</h1>
              </th>
            </tr>
          </thead>

          {getCommnets.data && (
            <tbody>
              {getCommnets.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.creator && item.creator.name}</td>
                  <td>{item.course}</td>
                  <td>
                    <button
                      onClick={() => showCom(item._id)}
                      className="bg-blue-600 text-white p-2 pl-2 pr-2 rounded-md text-[12px]">
                      مشاهده
                    </button>
                    <p
                      className={`${
                        showComment ? "flex flex-col p-8 gap-5" : "hidden"
                      } bg-white rounded-md w-[400px]  text-black fixed top-[50%] right-[40%] `}>
                      <span> {Com}</span>
                      <button
                        className=" bg-main-bg pl-4 pr-4 p-1 text-white"
                        onClick={() => setshowComment(false)}>
                        تایید
                      </button>
                    </p>
                  </td>
                  <td>
                    <button 
                    onClick={() => answer(item._id)}
                    className="bg-blue-600 text-white p-2 pl-2 pr-2 rounded-md text-[12px]">
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => aceptserr(item._id)}
                        className="bg-blue-600 text-white p-2 pl-2 pr-2 rounded-md text-[12px]">
                        قبول
                      </button>
                      <button
                        onClick={() => rejectserr(item._id)}
                        className="bg-blue-600 text-white p-2 pl-2 pr-2 rounded-md text-[12px]">
                          
                        رد کامنت
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => removethisComment(item._id)}
                      className="bg-red-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => banuserr(item.creator._id)}
                      className="bg-yellow-600 p-2 pl-2 pr-2 rounded-md text-[12px]">
                      بن کردن
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className={`${showanswer ? "flex" : "hidden"} fixed top-[30%] right-[40%] bg-green-700 rounded-md shadow-lg p-8`}>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <textarea 
          {...register("body", { required: true })}
          placeholder="پاسخ خود را وارد نمایید" className="p-2 text-[12px] border-1 border-gray-300 select-none rounded-md" cols="50" rows="10"></textarea>
          <div className="flex items-center gap-3">
          <button className="w-full text-center bg-main-bg text-white rounded-md mt-4 text-[12px] p-2" type="submit">ارسال پاسخ</button>
          <button 
          onClick={() => {
            setshowanswer(false)
            reset()
          }}
          className="w-full text-center bg-red-500 text-white rounded-md mt-4 text-[12px] p-2" type="submit">لغو ارسال</button>

          </div>
    
        </form>
      </div>
    </div>
  );
}
