import React, { useEffect, useState, useContext } from "react";
import { FaHome } from "react-icons/fa";
import { GoChevronLeft, GoCommentDiscussion } from "react-icons/go";
import { TfiUnlock } from "react-icons/tfi";
import { PiChartLineUp, PiStudentLight } from "react-icons/pi";
import "./Courseinfo.css";
import { useForm } from "react-hook-form";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { json, useParams } from "react-router-dom";
import moment from "jalali-moment";
import AuthContext from "../Contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";

import {
  MdOutlineCastForEducation,
  MdTimelapse,
  MdLanguage,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useStateContext } from "../Contexts/Contextprovider";
import ControlledAccordions from "../Components/Acordion";

import {
  QueryClient,
  useQuery,
  useQueryClient,
  useMutation,
} from "react-query";

export default function Courseinfo() {
  const { screenSize } = useStateContext();
  const { courseName } = useParams();
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const [courseDetail, setcourseDetail] = useState({});
  const [visible, setvisible] = useState(2);
  const [getid, setgetid] = useState("");
  const [priceitem, setpriceitem] = useState("");
  const [openmodal, setopenmodal] = useState(false);
  const [openmodal2, setopenmodal2] = useState(false);
  const [bon, setbon] = useState("");
  const [messagebon, setmessagebon] = useState("");

  const showMoreItems = () => {
    setvisible((prev) => prev + 1);
  };

  const getdata = async () => {
    const GetFromLocal = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:4000/v1/courses/${courseName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            GetFromLocal === null ? "null" : GetFromLocal.token
          }`,
        },
      }
    );
    return response.json();
  };

  const query = useQuery(["namecourse"], getdata, {
    onSuccess: setcourseDetail,
  });

  if (query.isSuccess) {
    console.log(query.data);
  }

  //important
  useEffect(() => {
    return () => {
      queryClient.removeQueries("namecourse");
      setvisible(2);
    };
  }, [courseName]);
  //important

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCommnets = async (data) => {
    const GetFromLocal = JSON.parse(localStorage.getItem("user"));

    const fetchComment = await fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetFromLocal.token}`,
      },
      body: JSON.stringify({
        ...data,
        courseShortName: courseName,
      }),
    });

    return await fetchComment.json();
  };

  const { mutateAsync, data } = useMutation(getCommnets, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(data);
    },
  });

  const onSubmit = (data) => {
    const notify = () => toast.error("شما در سایت ثبت نام نکرده اید");
    const notify12 = () =>
      toast.error("نظر شما پس از تایید نمایش داده خواهد شد");

    if (authContext.islogin === false) {
      notify();
    } else {
      mutateAsync(data);
      notify12();
      reset();
    }
  };

  const registerCourse = async (id) => {
    const GetFromLocal = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:4000/v1/courses/${id}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GetFromLocal.token}`,
        },
        body: JSON.stringify({ price: priceitem }),
      }
    );
    return response.json();
  };

  const regToCourse = useMutation(registerCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["namecourse"]);
    },
  });

  const registerinfree = (id) => {
    regToCourse.mutateAsync(id);
    setopenmodal(false);
    setopenmodal2(false);
  };

  const setOff = async (id) => {
    const GetFromLocal = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(`http://localhost:4000/v1/offs/${bon}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetFromLocal.token}`,
      },
      body: JSON.stringify({ course: id }),
    });
    return await response.json();
  };

  const offToCourse = useMutation(setOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(["namecourse"]);
    },
  });
  if (offToCourse.isSuccess) {
    console.log(offToCourse.data);
  }

  const offClick = (id) => {
    offToCourse.mutateAsync(id).then((res) => {
      console.log(res.message);
      if (res.message == "This code already used.") {
        setmessagebon("این کد قبلا استفاده شده است");
      } else if (res.message == "Code is not valid") {
        setmessagebon("این کد نامعتبر است");
      }  else {
        setmessagebon("تخفیف با موفقیت اعمال شد");
      }
    });
  };

  const registerCoursewithoff = async (id) => {
    const GetFromLocal = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:4000/v1/courses/${id}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GetFromLocal.token}`,
        },
        body: JSON.stringify({price: priceitem -(priceitem * (offToCourse.data && offToCourse.data.percent /100))}),
      }
    );
    return response.json();
  };

  const regToCourseoff = useMutation(registerCoursewithoff, {
    onSuccess: () => {
      queryClient.invalidateQueries(["namecourse"]);
    },
  });

  const registerinfreee = (id) => {
    regToCourseoff.mutateAsync(id);
    setopenmodal2(false);
  };

  return (
    <>
      <div className="md:pl-8 md:pr-8 pr-4 pl-4 w-auto course-bg h-full max-w-[1500px] m-auto ">
        <div>
          <div className=" bg-[#eeeeee91] flex items-center gap-6 p-4 shadow-sm rounded-md mt-4  ">
            <FaHome className="text-gray-400 bg-white w-[35px] h-[35px] p-[8px] rounded-md" />
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <a href="" className="text-[14px] text-text-color ">
                  امپراطور
                </a>
                <GoChevronLeft className="text-sm  text-text-color" />
              </li>
              <li className="flex items-center gap-2">
                <a href="" className="text-[14px] text-text-color ">
                  امپراطور
                </a>
                <GoChevronLeft className="text-sm  text-text-color" />
              </li>
              <li className="flex items-center gap-2">
                <a href="" className="text-[14px] text-text-color ">
                  امپراطور
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`${
              screenSize < 950 ? " flex-col-reverse " : ""
            } flex items-center w-full mt-8 gap-10`}>
            <div
              className={`${
                screenSize < 950 ? "w-full items-center pr-0" : ""
              } w-1/2 flex flex-col items-start gap-6 pr-8`}>
              <span className=" text-extrabold text-title-color text-[18px] md:text-[24px]">
                {courseDetail && <span>{courseDetail.name}</span>}
              </span>
              <p className=" text-text-color pr-2 text-[15px] text-justify max-w-[90%] leading-[30px]">
                {courseDetail && courseDetail.description}
              </p>
              <div className=" flex items-center gap-4">
                <button className=" bg-main-bg text-white p-3 rounded-md shadow-md text-center ">
                  <p className="text-[14px] ">انجام مشاوره</p>
                </button>
                <button className=" bg-orange-500 text-white p-3 rounded-md shadow-md text-center ">
                  <p className="text-[14px] "> تماس با ما</p>
                </button>
              </div>
            </div>
            <div
              className={`${
                screenSize < 950 ? "w-full items-center justify-center" : ""
              } w-1/2  flex justify-end`}>
              <video
                controls
                width="600px"
                height="240"
                className=" rounded-md shadow-lg">
                <source
                  src="../src/assets/videos/1.mp4"
                  type="video/mp4"></source>
              </video>
            </div>
          </div>

          <div
            className={`${
              screenSize < 900 ? " flex-col" : ""
            } w-full justify-between mt-12 flex flex-row  pl-1 m-auto h-fit`}>
            <div className=" m-auto md:pl-12 grow-0  ">
              <div className=" flex flex-col gap-4">
                <span
                  className="text-bold border-b-1 border-green-400 border-dotted text-title-color text-[22px] pt-0 mt-0 
               w-full p-4">
                  <p className=" w-fit drop-shadow-lg">
                    چرا دوره راه‌اندازی کسب و کار نوین؟
                  </p>
                </span>

                <img
                  className=" min-w-[250px] w-[650px]  m-auto rounded-md shadow-lg"
                  src="../src/assets/images/blogs.jpg"
                />
                <div className="md:w-[90%] m-auto">
                  <div className="text-justify mt-4 leading-8 text-title-color ">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                  <div className="text-justify mt-4 leading-8 text-title-color">
                    با دوره‌ی ۰ تا ۱۰۰ آموزش طراحی سایت و فروشگاه اینترنتی، با
                    تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویسی CSS HTML PHP
                    WordPress میتوانید به تمام سوال‌های بالا جواب مثبت دهید. با
                    این آموزش می‌توانید هر نوع سایت خبری و فروشگاهی را با طراحی
                    اختصاصی خودتان راه‌اندازی کنید. علاوه بر این شما یاد می‌گیرد
                    با کمک بوت‌استرپ سایت خود را ریسپانسیو کنید تا بهترین نمایش
                    را در مویایل و تبلت داشته باشد.این تمام ماجرا نیست. شاید شما
                    بخواهید از قالب‌های حرفه‌ای خارجی استفاده کنید. در این دوره
                    شما یادمی‌گیرد که چطور قالب‌های حرفه‌ای را فارسی‌سازی و
                    راست‌چین کنید تا برای سایت‌های فارسی مناسب باشد.با دیدن این
                    دوره شما می‌توانید به عنوان یک طراح‌سایت و توسعه‌دهنده
                    front-end وردپرس کسب درآمد کنید، پس باید بدانید که چطور
                    پروژه قبول کنید و با مشتریان خود قرارداد ببندید. بخش پایانی
                    این دوره مخصوص شما است تا بتوانید مثل یک طراح حرفه‌ای
                    قرارداد ببندید و با خیالی آسوده از تخصص خود کسب درآمد کنید.
                  </div>
                </div>
              </div>

              <div
                style={{ boxShadow: "rgb(234, 239, 244) 0px 0px 7px 0px" }}
                className="w-[90%] m-auto mt-12 hidden md:flex items-center  rounded-md p-8 gap-4 mb-4">
                <img
                  className="w-[200px] rounded-full "
                  src="../src/assets/images/12.jpg"
                  alt=""
                />
                <div className="flex flex-col gap-2 text-14">
                  <span>مدرس</span>
                  <span className="text-[18px] font-bold ">سعید رهبری</span>
                  <p className="text-justify leading-6">
                    مدیرعامل نوین - فعالیت در حوزه اینترنت از سال 81 -
                    برگزارکننده دوره‌های آموزشی برای بیش از 4000 نفر - مشاور بیش
                    از 10 کسب‌وکار بزرگ اینترنتی - مدرس دوره‌های استراتژی کسب و
                    کار، فروش اینترنتی و بازاریابی دیجیتال
                  </p>
                </div>
              </div>

              {query.isSuccess &&
                (query.data.sessions.length !== 0 ? (
                  <div className="w-[90%] m-auto mt-12">
                    <span className="text-bold text-[18px]">
                      سرفصل های آموزش
                    </span>
                    <div className="mt-4">
                      <ControlledAccordions
                        allData={query.data && query.data}
                        items={courseDetail.sessions}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                ))}

              <div className="w-[90%] m-auto mt-12">
                <p className=" font-bold text-[18px]">امتیاز و دیدگاه ها</p>

                <div
                  className={`${
                    screenSize < 1200 ? " flex-col" : ""
                  } flex gap-8 mt-4`}>
                  <div
                    className={`${
                      screenSize < 1200
                        ? "relative"
                        : "sticky top-[1rem] h-full"
                    }`}>
                    <form
                      className="flex flex-col gap-4 items-center w-full md:min-w-[350px]"
                      onSubmit={handleSubmit(onSubmit)}>
                      <textarea
                        className=" outline-none border-1 max-h-[200px] p-1 w-full rounded-md border-gray-300 pr-2"
                        name=""
                        id=""
                        cols="5"
                        rows="8"
                        {...register("body", { required: true })}></textarea>
                      {errors.body?.type === "required" && (
                        <p
                          className="text-red-600 text-[11px] text-right w-full"
                          role="alert">
                          این فیلد اجباری می باشد
                        </p>
                      )}

                      <div className="flex items-center w-full justify-between">
                        <div className="w-full  border-gray-300 p-2 border-1 rounded-md max-w-[48%] text-center text-[12px] bg-gray-100">
                          امتیاز شما به این دوره؟
                        </div>
                        <div className="rating w-full text-left flex justify-end">
                          <input
                            {...register("score", {
                              required: {
                                value: true,
                              },
                            })}
                            value={5}
                            id="star5"
                            type="radio"></input>
                          <label htmlFor="star5"></label>
                          <input
                            {...register("score", {
                              required: {
                                value: true,
                              },
                            })}
                            value={4}
                            id="star4"
                            type="radio"></input>
                          <label htmlFor="star4"></label>
                          <input
                            {...register("score", {
                              required: {
                                value: true,
                              },
                            })}
                            value={3}
                            id="star3"
                            type="radio"></input>
                          <label htmlFor="star3"></label>
                          <input
                            {...register("score", {
                              required: {
                                value: true,
                              },
                            })}
                            value={2}
                            id="star2"
                            type="radio"></input>
                          <label htmlFor="star2"></label>
                          <input
                            {...register("score", {
                              required: {
                                value: true,
                              },
                            })}
                            value={1}
                            id="star1"
                            type="radio"></input>
                          <label htmlFor="star1"></label>
                        </div>
                      </div>

                      <button
                        className="w-full hover:opacity-[0.9] bg-main-bg text-white h-[2.5rem] rounded-md mt-2"
                        type="submit">
                        ارسال دیدگاه
                      </button>
                      <ToastContainer rtl />
                    </form>
                  </div>
                  {query.data && (
                    <div className="w-full ">
                      <div className="w-full">
                        {query.data.comments.length !== 0 ? (
                          <ul className="w-full">
                            {query.data.comments
                              .slice(0, visible)
                              .map((item) => (
                                <li
                                  key={item._id}
                                  className="w-full p-4 gap-4 flex flex-col mb-5 rounded-md"
                                  style={{
                                    boxShadow:
                                      "rgb(234, 239, 244) 0px 0px 7px 0px",
                                  }}>
                                  <div className="flex items-center justify-between  border-b-1 border-dashed pb-2">
                                    <div className="flex items-center gap-2">
                                      <img
                                        className="rounded-full w-[40px]"
                                        src="../src/assets/images/123.png"
                                      />
                                      <div className="flex flex-col gap-1">
                                        <div className="flex gap-1 items-center">
                                          <span className=" text-text-color text-[12px]">
                                            {item.creator.name}
                                          </span>
                                          <span className=" text-orange-500 font-bold rounded-md p-1 text-[10px] ">
                                            {item.creator.role === "ADMIN"
                                              ? "مدیر سایت"
                                              : courseDetail.isUserRegisteredToThisCourse
                                              ? "خریدار محصول"
                                              : "کاربر سایت"}
                                          </span>
                                        </div>

                                        <span className=" text-text-color text-[10px]">
                                          {moment(
                                            item.createdAt
                                              .slice(0, 10)
                                              .replaceAll("-", "/"),
                                            "YYYY/MM/DD"
                                          )
                                            .locale("fa")
                                            .format("YYYY/MM/DD")}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Rating
                                        value={item.score}
                                        onChange={(event, newValue) => {
                                          setValue(newValue);
                                        }}
                                        sx={{
                                          fontSize: "1rem",
                                          pointerEvents: "none",
                                        }}
                                      />
                                      <button className="bg-main-bg text-white pl-2 pr-2 h-[2rem] rounded-md shadow-md text-center text-[10px]">
                                        پاسخ دادن
                                      </button>
                                    </div>
                                  </div>
                                  <div>
                                    <p className=" text-justify text-[13px] text-title-color leading-6">
                                      {item.body}
                                    </p>
                                  </div>

                                  {item.answerContent !== null && (
                                    <ul>
                                      <li className="pl-4 pr-4">
                                        <div className=" bg-gray-100 rounded-md shadow-sm flex flex-col p-6 ">
                                          <span className="flex items-center gap-2 border-b-1 pb-2  border-dashed border-gray-400">
                                            <img
                                              className="rounded-full w-[20px] "
                                              src="../src/assets/images/123.png "
                                            />
                                            <span className="text-[13px] text-gray-600">
                                              {item.answerContent.creator.name}
                                            </span>
                                            <span className="text-[10px] text-red-600 font-bold">
                                              {item.answerContent.creator
                                                .role === "ADMIN"
                                                ? "مدیریت"
                                                : "کاربرسایت"}
                                            </span>
                                          </span>
                                          <span className="text-[13px] pt-3">
                                            {item.answerContent.body}
                                          </span>
                                        </div>
                                      </li>
                                    </ul>
                                  )}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <p className="bg-orange-500 text-white w-full rounded-md text-center p-2 ">
                            هنوز کامنتی ثبت نشده است
                          </p>
                        )}
                      </div>

                      {query.data.comments.length !== 0 ? (
                        <div className="w-full">
                          <button
                            onClick={showMoreItems}
                            className={`${
                              visible === courseDetail.comments.length  || visible >  courseDetail.comments.length 
                                ? " pointer-events-none bg-slate-400"
                                : ""
                            } w-full rounded-md bg-main-bg text-white text-center h-9 hover:opacity-[0.9] transition-all shadow-md`}>
                            دیدن موارد بیشتر
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`${
                screenSize < 950 ? "hidden" : ""
              } sticky top-[1rem] w-[300px] h-fit shrink-0  `}>
              <ul>
                <li className="  bg-gray-100  p-4 flex items-center flex-col rounded-md gap-4">
                  {query.data && (
                    <div className=" text-[24px] text-title-color bg-white p-2 rounded-md w-full text-center flex items-center justify-center gap-1 ">
                      {query.data.price === 0 ? (
                        <span className="text-[18px] text-green-800">
                          رایگان
                        </span>
                      ) : (
                        <div className="flex items-center">
                          <div
                            className={`${
                              courseDetail && courseDetail.discount
                                ? " line-through text-14 ml-2"
                                : ""
                            }`}>
                            {query.data && query.data.price.toLocaleString()}
                          </div>

                          {query.data && (
                            <div className="text-red-500">
                              {query.data.discount !== 0
                                ? (
                                    (query.data.price * query.data.discount) /
                                    100
                                  ).toLocaleString()
                                : ""}
                            </div>
                          )}
                          <span className="text-orange-600 text-[12px] mr-1">
                            تومان
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className=" w-full">
                    {courseDetail &&
                    courseDetail.isUserRegisteredToThisCourse ? (
                      <button className="relative bg-main-bg text-white w-full flex justify-center items-center p-3 rounded-md shadow-md text-center ">
                        <p className="text-[14px] ">
                          شما دانشجوی این دوره هستید
                        </p>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setpriceitem(query.data && query.data.price);
                          if (query.data && query.data.price === 0) {
                            setopenmodal(true);
                          } else {
                            setopenmodal2(true);
                          }
                        }}
                        className="relative bg-main-bg text-white w-full flex justify-center items-center p-3 rounded-md shadow-md text-center ">
                        <p className="text-[18px] ">شرکت در این دوره</p>
                        <TfiUnlock className=" text-xl text-bold absolute right-2" />
                      </button>
                    )}
                  </div>
                </li>

                <li className="bg-gray-100 p-6 rounded-md mt-4 mb-4  ">
                  <p className="flex items-center gap-2  text-title-color mb-4">
                    <PiChartLineUp className="text-2xl" />
                    <span className="text-[15px]"> درصد پیشرفت دوره:</span>
                    <span className="text-[15px]">35%</span>
                  </p>

                  <div className="demo-preview mb-6">
                    <div className="progress progress-striped active">
                      <div
                        role="progressbar progress-striped"
                        className={`w-[35%] rounded-md progress-bar`}>
                        <span className=" text-[0px]">پیشرفت دوره</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-title-color ">
                    <div className="flex items-center gap-1">
                      <GoCommentDiscussion className="text-2xl " />
                      <p className="text-sm">
                        {query.isSuccess && courseDetail.comments.length}
                      </p>
                      <p className="text-sm">دیدگاه</p>
                    </div>
                    <div>|</div>
                    <div className="flex items-center gap-1">
                      <PiStudentLight className="text-2xl" />
                      <p className="text-sm">
                        {courseDetail && courseDetail.courseStudentsCount}
                      </p>
                      <p className="text-sm">دانشجو</p>
                    </div>
                  </div>
                </li>

                <li className="bg-gray-100 rounded-md p-4 ">
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-2 text-title-color">
                      <HiOutlineStatusOnline className="text-xl" />
                      <p className="text-[15px]">نوع دوره : </p>
                      <p className="text-[15px]">آنلاین</p>
                    </li>
                    <li className="flex items-center gap-2 text-title-color">
                      <MdOutlineCastForEducation className="text-xl" />
                      <p className="text-[15px]">وضعیت دوره : </p>
                      <p className="text-[15px]">
                        {courseDetail && courseDetail.status === "start"
                          ? "در حال برگذاری"
                          : "پایان یافته"}{" "}
                      </p>
                    </li>
                    <li className="flex items-center gap-2 text-title-color">
                      <MdTimelapse className="text-xl" />
                      <p className="text-[15px]">شروع دوره : </p>
                      <p className="text-[15px]">
                        {query.isSuccess &&
                          moment(
                            courseDetail.createdAt
                              .slice(0, 10)
                              .replaceAll("-", "/"),
                            "YYYY/MM/DD"
                          )
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                      </p>
                    </li>
                    <li className="flex items-center gap-2 text-title-color">
                      <SlCalender className="" />
                      <p className="text-[15px]">آخرین به روزرسانی:</p>
                      <p className="text-[15px]">
                        {query.isSuccess &&
                          moment(
                            courseDetail.updatedAt
                              .slice(0, 10)
                              .replaceAll("-", "/"),
                            "YYYY/MM/DD"
                          )
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                      </p>
                    </li>
                    <li className="flex items-center gap-2 text-title-color">
                      <MdLanguage className="text-xl" />
                      <p className="text-[15px]"> زبان دورره : </p>
                      <p className="text-[15px]">فارسی</p>
                    </li>
                    <li className="flex items-center gap-2 text-title-color">
                      <MdOutlineSupportAgent className="text-xl" />
                      <p className="text-[15px]"> پشتیبانی دورره : </p>
                      <p className="text-[15px]">
                        {courseDetail && courseDetail.support}
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          openmodal ? "flex" : "hidden"
        } flex-col items-cente justify-center w-[350px] h-[200px] rounded-md shadow-md bg-gray-600 text-white p-4 fixed top-[40%] right-[50%] mr-[-100px]`}>
        <p className="mb-8 w-full text-center">آیا اطمینان دارید ؟</p>
        <div className="flex items-center justify-center w-full gap-4">
          <button
            onClick={() => registerinfree(query.data && query.data._id)}
            className="w-1/2 flex items-center bg-main-bg justify-center p-1 rounded-md">
            بله
          </button>
          <button
            onClick={() => setopenmodal(false)}
            className="w-1/2 flex items-center bg-main-bg justify-center p-1 rounded-md">
            خیر
          </button>
        </div>
      </div>

      <div
        className={`${
          openmodal2 ? "flex" : "hidden"
        } flex-col gap-6 items-cente justify-center w-[450px] h-[200px] rounded-md shadow-md bg-gray-600 text-white p-4 fixed top-[20%] right-[45%] mr-[-100px]`}>
        <p className="w-full text-center">آیا اطمینان دارید ؟</p>
        <input
          onInput={(event) => setbon(event.target.value)}
          className="w-full mb-3 relative h-[2rem] rounded-md text-[12px] pr-3 text-black"
          placeholder="کد تخفیف خود را وارد نمایید"
        />
        <p className="flex top-[7rem]  text-red-200 text-[12px] absolute">
          {`${messagebon}`}
        </p>
        <div className="flex items-center justify-center w-full gap-4">
          <button
            onClick={() => offClick(query.data && query.data._id)}
            className="w-1/2 flex items-center bg-main-bg justify-center p-2 rounded-md text-[12px]">
            اعمال کد تخفیف
          </button>
          <button
            onClick={() => registerinfree(query.data && query.data._id)}
            className="w-1/2 flex items-center bg-main-bg justify-center  rounded-md text-[12px] p-2">
            خرید بدون کد تخفیف
          </button>

          <button
          onClick={() => registerinfreee(query.data && query.data._id)}
           className="w-1/2 flex items-center bg-main-bg justify-center  rounded-md text-[12px] p-2">
            خرید
          </button>
        </div>
      </div>

      <div
        className={`${
          screenSize > 800 ? "hidden" : ""
        } fixed bottom-0 flex gap-4 w-full pl-[2rem] pr-[2rem] justify-center items-center m-auto bg-white p-2`}>
        <button className=" bg-main-bg text-white w-full h-[2.5rem]  rounded-md shadow-md text-center ">
          <p className="text-[15px] ">شرکت در این دوره</p>
        </button>
        <button className=" bg-gray-400 text-white w-full  h-[2.5rem] rounded-md shadow-md text-center ">
          <p className="text-[15px] ">تماس با ما</p>
        </button>
      </div>
    </>
  );
}
