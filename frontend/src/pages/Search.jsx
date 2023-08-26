import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Title from "../Components/Title";
import icon1 from "../assets/images/icon1.png";
import CourseBox from "../Components/CourseBox";
import Blogbox from "../Components/Blogbox";
import SkeletonBar from "../Components/SkeletonBar";
import { useStateContext } from "../Contexts/Contextprovider";

export default function Search() {
  const { screenSize } = useStateContext();
  const { searchName } = useParams();
  const [getallproject, setgetallproject] = useState();
  const [getallblog, setgetallblog] = useState();


  const getSearchData = async () => {
    const response = await fetch(
      `http://localhost:4000/v1/search/${searchName}`,
      {
        method: "GET",
      }
    );
    return response.json();
  };

  const { data, isLoading, isSuccess } = useQuery(["search"], getSearchData, {
    onSuccess: (data) => {
      setgetallproject(data.allResultCourses);
      setgetallblog(data.allResultArticles);
    },
    refetchOnMount : false,
    refetchOnWindowFocus : false,
    refetchInterval: false
    
  });



  return (
    <div>
      <div>
        <div className="mb-10">
          <Title
            icon={icon1}
            text1="نتایج جستجوی در بین دوره ها"
            text2={getallproject && `تعداد نتایج : ${getallproject.length} پروژه`}
          />
        </div>

        <div className="flex flex-col gap-10 ">
          {isLoading && (
            <div
              className={`${
                screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
              <SkeletonBar num={4} />
            </div>
          )}

          {data && (
            <div
              className={`${
                screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
              {getallproject?.map((item) => (
                <CourseBox
                  key={item._id}
                  image={`../src/assets/images/${item.cover}`}
                  title={item.name}
                  teacherName="علی عبدی"
                  time="17:9:00"
                  price={`${item.price === 0 ? "رایگان" : item.price}`}
                  link={`/course-info/${item.shortName}`}
                />
              ))}
            </div>
          )}
        </div>
       
      </div>


      <div>
        <div className="mb-10">
          <Title
            icon={icon1}
            text1="نتایج جستجوی در بین مقالات"
            text2={getallblog && `تعداد نتایج : ${getallblog.length} مقاله`}
          />
        </div>

        <div className="flex flex-col gap-10 ">
          {isLoading && (
            <div
              className={`${
                screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
              <SkeletonBar num={4} />
            </div>
          )}

          {data && (
            <div
              className={`${
                screenSize < 1400 ? "w-[94%] m-auto" : "w-fit m-auto gap-8"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center   `}>
              {getallblog?.map((item) => (
              <Blogbox
              image={`../src/assets/images/${item.cover}`}
              title={item.title}
              text={item.description}
              comment="25"
              date="1402/04/06"
            />
              ))}
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
}
