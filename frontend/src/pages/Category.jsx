import React, { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiSortDescending } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import CourseBox from "../Components/CourseBox";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonBar from "../Components/SkeletonBar";
import { useStateContext } from "../Contexts/Contextprovider";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";
import ReactPaginate from "react-paginate";

export default function Category() {
  const [val, setVal] = useState(1);
  const [age, setAge] = React.useState("");
  const { screenSize } = useStateContext();
  const { categoryName } = useParams();
  const queryClient = useQueryClient();

  const [getdata, setgetdata] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [aftersort, setaftersort] = useState([]);
  const [search, setsearch] = useState("");
  


  const [pageCount, setpageCount] = useState(0);
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(()=>{

    switch(age) {
      case "free" : { 
        const getfilterdata = aftersort.filter((item)=> item.price === 0)
        setgetdata(getfilterdata)
        break
      }
      case "notfree" :{
        const getfilterdataa = aftersort.filter((item)=> item.price !== 0)
        setgetdata(getfilterdataa)
        break
      }
      case "last" : {
        setgetdata(aftersort)
        break
      }
      case "first" : {
        const fistarr = aftersort.slice().reverse()
        setgetdata(fistarr)
        break
      }
      default: {
        setgetdata(aftersort)
        break
      }
    }

  },[age])


  useEffect(()=>{
   
    const getsearchitem = aftersort.filter((item)=>{
      return item.name.toLowerCase().includes(search)
    })
    setgetdata(getsearchitem)

  },[search])

  const handleSearch = (ev) =>{
    setsearch(ev)
  }




  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(getdata.slice(itemOffset, endOffset));
    setpageCount(Math.ceil(getdata.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, getdata  ]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % getdata.length;
    setItemOffset(newOffset);
  };



  

  const getalldata = async () => {
    const response = await fetch(
      `http://localhost:4000/v1/courses/category/${categoryName}`,
      {
        method: "GET",
      }
    );
    return response.json();
  };

  const { data, isLoading } = useQuery(["products"], getalldata, {
    refetchOnWindowFocus : false,
    onSuccess: (data) => {
      setaftersort(data);
      setgetdata(data)
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries("products");
    };
  }, [categoryName]);

  const valHandler = (value) => {
    setVal(value);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <div className="pr-16 pl-16 mt-8">
      <div className=" border-1 border-gray-200 rounded-md shadow-dm pr-4 pl-4 flex items-center justify-between flex-col sm:flex-row gap-8">
        <div className="flex items-center">
          <div className="p-2 pt-4 pb-4">
            <ul className="flex gap-2 items-center">
              <li
                onClick={() => valHandler(1)}
                className={`${
                  val === 1 ? "bg-main-bg text-white" : ""
                } w-[35px] h-[35px] cursor-pointer border-1 border-gray-200 rounded-md flex items-center justify-center`}>
                <button>
                  <HiOutlineSquares2X2 className="text-xl" />
                </button>
              </li>

              <li
                onClick={() => valHandler(2)}
                className={`${
                  val === 2 ? "bg-main-bg text-white" : ""
                } w-[35px] h-[35px] cursor-pointer border-1 border-gray-200 rounded-md flex items-center justify-center`}>
                <button>
                  <PiSortDescending className="text-xl" />
                </button>
              </li>
            </ul>
          </div>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <FormControl
                sx={{ m: 1, minWidth: 120, fontSize: "14px" }}
                size="small">
                <InputLabel
                  sx={{
                    width: "70px",
                    textAlign: "left",
                    background: "white",
                    fontSize: "14px",
                  }}
                  id="demo-select-small-label">
                  مرتب سازی
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  dir="rtl"
                  value={age}
                  label="Age"
                  onChange={handleChange}>
                  <MenuItem sx={{ fontSize: "14px" }} value="پیش فرض">
                    پیش فرض
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="free">
                    بر اساس رایگان
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="notfree">
                    بر اساس غیر رایگان
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="last">
                     براساس آخرین
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="first">
                    بر اساس اولین
                  </MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </CacheProvider>
        </div>

        <div className=" relative flex items-center">
          <input
            className=" text-[14px] max-w-[20rem] border-1 border-gray-300 rounded-md pr-3 h-[2.5rem]"
            type="text"
            placeholder="جستجو..."
            onChange={(event) => handleSearch(event.target.value)}
          />
          <CiSearch className=" cursor-pointer absolute left-3 text-gray-600 text-xl" />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-10 ">
          {isLoading && (
            <div
              className={`${
                screenSize < 1400 ? "w-[98%] m-auto" : "w-fit m-auto gap-8"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center mt-8   `}>
              <SkeletonBar num={4} />
            </div>
          )}

          <div
            className={`${
              screenSize < 1400 ? "w-[98%] m-auto" : "w-fit m-auto gap-8"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center mt-8 gap-4  `}>
            {currentItems.map((item) => (
              <CourseBox
                key={item._id}
                image={`${item.cover}`}
                title={item.name}
                teacherName={item.creator}
                time="17:9:00"
                price={`${item.price === 0 ? "رایگان" : item.price}`}
                score={item.courseAverageScore}
                link={`/course-info/${item.shortName}`}
              />
            ))}
          </div>
        </div>

         {pageCount > 1 &&      
         <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="←"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="→"
            renderOnZeroPageCount={null}
            containerClassName ="pagin"
            pageClassName ="pager"
            pageLinkClassName = "linkable"
            activeClassName ="activeClassName"
            disabledClassName = "disabledClassName"
            previousClassName ="prenNext"
            nextClassName="prenNext"
            previousLinkClassName="linkprev"
            nextLinkClassName="linkprev"
          />
        </>  }

        {getdata.length === 0 && <span className="w-full text-white p-2 rounded-md inline-block text-center bg-main-bg">هیچ دوره ای منتشر نشده است</span>}

      
      </div>
    </div>
  );
}
