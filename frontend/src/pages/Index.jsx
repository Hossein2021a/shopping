import React, { useState } from "react";
import Buttons from "../Components/Buttons";
import { useStateContext } from "../Contexts/Contextprovider";
import first from "../../src/assets/images/1.png";
import sec from "../../src/assets/images/2.png";
import Typewriter from "typewriter-effect";
import Title from "../Components/Title";
import icon1 from "../assets/images/icon1.png";
import CourseBox from "../Components/CourseBox";

import Button from "../Components/Buttons";
import ProductSlider from "../Components/ProductSlider";
import Blogbox from "../Components/Blogbox";
import { Link } from "react-router-dom";
import moment from "jalali-moment";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import Counter from "../Components/Counter";

import {
  QueryClient,
  useQuery,
  useQueryClient,
  useMutation,
} from "react-query";

import "react-loading-skeleton/dist/skeleton.css";
import SkeletonBar from "../Components/SkeletonBar";

export default function Index() {
  const { screenSize } = useStateContext();
  const [isloading, setisloading] = useState(true);

  const getPopularproduct = async () => {
    const fetchProduct = await fetch(
      "http://localhost:4000/v1/courses/popular",
      {
        method: "GET",
      }
    );
    return await fetchProduct.json();
  };

  const query = useQuery(["popular"], getPopularproduct, {
    onSuccess: () => setisloading(false),
  });

  console.log(query.data);

  const getAllproduct = async () => {
    const fetchProduct = await fetch("http://localhost:4000/v1/courses", {
      method: "GET",
    });
    return await fetchProduct.json();
  };

  const allProduct = useQuery(["popular"], getAllproduct);

  const getAllBlog = async () => {
    const fetchProduct = await fetch("http://localhost:4000/v1/articles", {
      method: "GET",
    });
    return await fetchProduct.json();
  };

  const allarticle = useQuery(["article"], getAllBlog);

  // if (allarticle.isSuccess) {
  //   console.log(allarticle.data)

  // }

  return (
    <div className="mt-12">
      <div
        className={` ${
          screenSize > 950 ? "top-bg transition " : "top-bg-low pt-0"
        } `}>
        <div className="flex flex-col ">
          <div
            className={`${
              screenSize < 950
                ? "w-[100%] items-center pl-[2rem] pr-[2rem] text-center "
                : "w-[55%]  p-9"
            } flex justify-start flex-col`}>
            <div
              className={`${
                screenSize < 1200
                  ? "text-[30px] md:text-[25px] "
                  : "text-[34px]"
              } font-bold flex flex-col md:flex-row  `}>
              <h2> بزرگ‌ترین سایت آموزش </h2>
              <h2 className="hidden md:block"> &nbsp;</h2>

              <h2 className=" text-orange-500">
                <Typewriter
                  options={{
                    strings: [" دیجیتال مارکتینگ ", " برنامه نویسی"],
                    autoStart: true,
                    delay: 150,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .callFunction(() => {})
                      .pauseFor(1000)
                      .deleteAll()
                      .callFunction(() => {})
                      .start();
                  }}
                />
              </h2>
            </div>
            <p
              className={`${
                screenSize < 950 ? "w-[100%]" : "w-[84%]"
              } leading-[35px]  text-text-color mt-[25px] mb-[25px]`}>
              کسب‌وکار شما می‌تواند رشد کند. درآمد شما می‌تواند چند برابر شود.
              کافی است مسیر درست را بشناسید. در دوره‌های دیجیتال مارکتینگ نوین
              مهارت‌هایی یاد می‌گیرید که به شما کمک می‌کند کسب‌وکار اینترنتی
              خودتان را شروع کنید، رشد دهید یا به عنوان کارشناس دیجیتال مارکتینگ
              استخدام شوید.
            </p>
            <div className="flex gap-5 items-center">
              <Buttons
                text="آموزش بازاریابی"
                bgColor="#52ac66"
                color="rgb(255 255 255)"
                height="46px"
              />

              <Buttons
                text="خدمات بازاریابی"
                bgColor="#f46500"
                color="rgb(255 255 255)"
                height="46px"
              />
            </div>

            <div className={`${screenSize > 960 ? "box1" : "box2"} mt-24`}>
              <div
                className={`${
                  screenSize < 960 ? "flex-col" : "flex-row"
                } flex justify-center gap-4`}>
                <div className="shadow-2xl p-4 gap-2 md:gap-[2rem] flex items-center justify-between  rounded-md bg-white md:pl-[1rem] ">
                  <img className="w-[38px] sm:w-auto" src={first} />
                  <p className="flex flex-col items-center gap-2">
                    <span className="font-bold text-[15px] text-gray-800">
                      همکار رسمی گوگل
                    </span>
                    <span className=" text-gray-500 text-[13px]">
                      در کشور ایران، از سال 94
                    </span>
                  </p>
                  <span
                    style={{
                      WebkitTextStroke: "2px black",
                      WebkitTextFillColor: "white",
                    }}
                    className=" text-thin text-[35px] w-[75px] ">
                    <Counter count={200} />
                  </span>
                </div>

                <div className="shadow-2xl p-4 gap-2 md:gap-[2rem] flex items-center justify-between  rounded-md bg-white md:pl-[1rem] ">
                  <img className="w-[25px] sm:w-auto" src={sec} />
                  <p className="flex flex-col items-center gap-2">
                    <span className="font-bold text-[15px] text-gray-800">
                      برگزیدۀ جشنواره وب و موبایل
                    </span>
                    <span className=" text-gray-500 text-[13px]">
                      در 3 سال متوالی (97، 98 و 99)
                    </span>
                  </p>
                  <span
                    style={{
                      WebkitTextStroke: "2px black",
                      WebkitTextFillColor: "white",
                    }}
                    className=" text-thin text-[35px] w-[75px] ">
                    <Counter count={94} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p></p>
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <Title
          text1="جدیدترین دوره ها"
          text2="سکوی پرتاب موفقیت شما"
          icon={icon1}
        />

        {isloading && (
          <div
            className={`${
              screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
            <SkeletonBar num={8} />
          </div>
        )}

        {query.data && (
          <div
            className={`${
              screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
            {query.data.map((item) => (
              <CourseBox
                key={item._id}
                image={`${item.cover}`}
                title={item.name}
                teacherName={item.creator}
                time="17:9:00"
                price={`${item.price == 0 ? "رایگان" : item.price.toLocaleString()}`}
                score={item.courseAverageScore}
                link={`/course-info/${item.shortName}`}
                discount={
                  item.discount ? ((item.price * item.discount) / 100) : ""
                }
              />
            ))}
          </div>
        )}
      </div>

      {allProduct.data && (
        <div className="">
          <div className="mt-[1rem] mb-[7rem] sm:mb-[3rem]">
            <Title
              text1="پربازدیدترین دوره ها"
              text2="سکوی پرتاب موفقیت شما"
              icon={icon1}
            />
          </div>

          <div className="bg-bg-pattern h-[360px] lg:h-[400px] bg-center m-auto bg-[length:25rem] sm:bg-[length:43rem] md:bg-[length:60rem]   lg:bg-[length:70rem] bg-no-repeat flex items-center justify-center mb-[4rem]">
            <ProductSlider
              dir={"vertical"}
              slides={1}
              classNamei="mySwiper"
              eff="fade"
              firstnum="1"
              secondnum="1"
              lastnum="1"
              lastcol="1"
              over1500="1"
              val1={false}
              spacee="0"
              index={
                <>
                  {[...allProduct.data]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-6 mb-[85px] sm:m-0  ">
                          <div className=" max-w-[180px] sm:max-w-[220px]  md:min-w-[250px] sm:min-w-[220px] lg:min-w-[350px] sm:translate-x-12">
                            <img
                              className="border-8 shadow-lg  rounded-md border-orange-300"
                              src= {`http://localhost:4000/courses/covers/${item.cover}`}
                            />
                          </div>

                          <div className="flex flex-col gap-2 sm:gap-4 p-4 sm:translate-x-12  sm:text-right">
                            <span className="text-text-color text-14 ">
                              {moment(
                                item.createdAt
                                  .slice(0, 10)
                                  .replaceAll("-", "/"),
                                "YYYY/MM/DD"
                              )
                                .locale("fa")
                                .format("YYYY/MM/DD")
                                .slice(0, 10)}
                            </span>
                            <a className="text-title-color font-extrabold text-[14px] md:text-[16px] lg:text-18">
                              {item.name}
                            </a>
                            <p className=" text-[11px] pl-[2rem] pr-[2rem] sm:p-0 md:text-12 lg:text-[13px] text-justify">
                              {item.description}
                            </p>
                            <div className="mt-[1rem] sm:m-0">
                              <Link to={`/course-info/${item.shortName}`}>
                                <Button
                                  bgColor="rgb(82, 172, 102)"
                                  color="#fff"
                                  text="بیشتر ببینید"
                                  height="35px"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </>
              }
            />
          </div>
        </div>
      )}

      <div className="">
        <div className="mt-[1rem] mb-[7rem] sm:mb-[3rem]">
          <Title
            text1="پربازدیدترین دوره ها"
            text2="سکوی پرتاب موفقیت شما"
            icon={icon1}
          />
        </div>

        {allProduct.data && (
          <div className="p-8 w-[90%] m-auto ">
            <ProductSlider
              dir={"horizontal"}
              spacee="0"
              classNamei="mySwiper2"
              firstnum={2}
              secondnum={3}
              lastnum={3}
              lastcol={4}
              over1500={6}
              val1={true}
              index={
                <>
                  {allProduct.data.map((item) => (
                    <SwiperSlide key={item._id}>
                      <CourseBox
                        image={`${item.cover}`}
                        title={item.name}
                        teacherName={item.creator}
                        time="17:9:00"
                        price={`${item.price == 0 ? "رایگان" : item.price.toLocaleString()}`}
                        score={item.courseAverageScore}
                        link={`/course-info/${item.shortName}`}
                        discount={
                          item.discount
                            ? (item.price * item.discount) / 100
                            : ""
                        }
                      />
                    </SwiperSlide>
                  ))}
                </>
              }
            />
          </div>
        )}
      </div>

      {allarticle.data && (
        <div className=" mt-[3rem] ">
          <div className="md:p-12 p-8  flex flex-col md:flex-row items-center justify-between bg-green-50 w-[100%] m-auto bg-bg-patt gap-4 md:gap-0">
            <div className="gradia w-[100%] h-[70px] md:w-[20%] md:min-h-[432px] ml-[10px] rounded-md flex justify-center  ">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className=" text-semibold text-[20px] text-white ">
                  آخرین مقالات
                </p>
                <p className=" text-white text-[14px]">آینده نگر شوید</p>
              </div>
            </div>

            <div className=" m-auto w-[100%] md:w-[80%] ">
              <ProductSlider
                dir={"horizontal"}
                spacee="0"
                classNamei="mySwiper2"
                firstnum={2}
                secondnum={2}
                lastnum={3}
                lastcol={3}
                over1500={6}
                val1={true}
                index={
                  <>
                    {allarticle.data.slice(0, 6).map((item, index) => (
                      <SwiperSlide key={index}>
                        <Blogbox
                          image={`../src/assets/images/${item.cover}`}
                          title={item.title}
                          text={item.description}
                          comment="25"
                          date="1402/04/06"
                        />
                      </SwiperSlide>
                    ))}
                  </>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
