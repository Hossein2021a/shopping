import React from "react";
import { Bar } from "react-chartjs-2";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      rtl: true,
      titleFont: {
        family: "IRANSansXFaNum",
      },
      bodyFont: {
        family: "IRANSansXFaNum",
      },
    },
    legend: {
      rtl: true,
      textDirection: "rtl",
      display: true,
      labels: {
        color: "#fff",
        font: {
          family: "IRANSansXFaNum",
        },
      },
    },
  },
  scales: {
    yAxes: {
      barPercentage: 1.6,
      grid: {
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 125000,
        padding: 2,
        backdropPadding: 2,
        backdropColor: "#fff",
        color: "#fff",
        font: {
          family: "IRANSansXFaNum",
          size: 12,
        },
        major: {
          enable: true,
        },
      },
    },
    xAxes: {
      barPercentage: 1.6,
      grid: {
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        color: "#fff",
        font: {
          family: "IRANSansXFaNum",
          size: 12,
        },

        major: {
          enable: false,
        },
      },
    },
  },
};

export default function Home() {
  const labels = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد"];

  const data = {
    labels,
    font: { family: "iransans" },

    datasets: [
      {
        label: "نیمه اول سال",
        data: [3, 6, 9, 11, 14],
        backgroundColor: "#fff",
        borderColor: "#fff",
        bodyFontColor: "#fff",
      },

      {
        label: "نیمه دوم سال",
        data: [3, 5, 8, 2, 15],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "#fff",
        bodyFontColor: "#fff",
      },
    ],
  };

  const getingInfo = async () => {
    const response = await fetch(`http://localhost:4000/v1/infos/index`, {
      method: "GET",
    });
    return await response.json();
  };

  const getAllinfiData = useQuery(["Allinfiodata"], getingInfo);

  if (getAllinfiData.isSuccess) {
    console.log(getAllinfiData.data);
  }

  const getingInfoo = async () => {
    const gettokkk = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`http://localhost:4000/v1/infos/p-admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${gettokkk.token}`,
      },
    });
    return await response.json();
  };

  const getAllinfiDataa = useQuery(["Allinfiodata"], getingInfoo);

  if (getAllinfiDataa.isSuccess) {
    console.log(getAllinfiDataa.data);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-center ">
        <div className=" bg-bg-hero-pattern flex items-center justify-center w-full flex-col h-44 lg:h-64 bg-center  bg-cover rounded-lg text-center  ">
          <div className="flex flex-col ">
            <span className=" font-bold pb-2 dark:text-gray-100">
              مجموع کاربران سایت :
            </span>
            <span className="text-xl dark:text-gray-200">
              {getAllinfiDataa.data &&
                getAllinfiDataa.data.usersCount + " " + "کاربر"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-2 justify-between"></div>

      <div className=" flex gap-10 justify-center flex-wrap ">
        <div className="bg-white dark:bg-secondary-dark-bg dark:text-gray-200 ds mt-4 p-4 rounded-2xl w-full flex flex-col ">
          <span className="flex justify-between items-center p-4">
            <span>به روز رسانی درآمدها</span>
            <span className="flex gap-5">
              <span className="flex items-center justify-center">
                <span className="w-1.5 h-1.5 ml-1 inline-block rounded-full bg-white "></span>
                <span className="">هزینه ها</span>
              </span>

              <span className="flex items-center justify-center">
                <span className="w-1.5 h-1.5 ml-1 inline-block rounded-full  bg-green-400"></span>
                <span className="text-green-400"> دوره</span>
              </span>
            </span>
          </span>

          <div className="flex md:flex-row-reverse md:flex-wrap md:mt-4 justify-evenly items-center flex-col-reverse">
            <div className=" w-2/5 items-center flex flex-col md:border-r-1 md:border-gray-500 pr-5 p-5 min-w-[200px] text-lg">
              <div className="pb-8 text-center">
                <div className="mb-2 text-center">
                  <span className="text-center bg-green-100 dark:text-gray-500 rounded-3xl p-1 pr-2 pl-2 text-sm ">
                    تعداد دوره های منتشر شده
                  </span>
                </div>
                <div className="flex flex-row-reverse justify-center  items-center gap-2 ">
                  <span className=" font-semibold">
                    {getAllinfiDataa.data &&
                      getAllinfiDataa.data.coursesCount + " " + "دوره "}
                  </span>
                  <span className="text-xs text-gray-100 bg-green-500 rounded-3xl p-1">
                    45%
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-2 ">
                  <span className="text-center bg-green-100 dark:text-gray-500 rounded-3xl p-1 pr-2 pl-2 text-sm  ">
                    مجموع زمان آموزش های منتشر شده :
                  </span>
                </div>

                <div className="flex text-center justify-center  flex-row-reverse items-center gap-2 ">
                  <span className="  font-semibold">
                    {getAllinfiDataa.data &&
                      getAllinfiDataa.data.totalTime + " " + "ساعت "}
                  </span>
                </div>
              </div>

              <div className="pt-6 text-sm">
                <button>دانلود گزارش</button>
              </div>
            </div>

            <div className=" text-white w-3/5 p-8">
              <Bar width={250} height={320} options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
