import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,

} from "react-icons/fi";
import {
  BsKanban,
  BsBarChart,

} from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";

import { GiLouvrePyramid } from "react-icons/gi";




export const links = [


  {
    title: "صفحات",
    links: [
      {
        name: "خانه",
        to: "admin/home",
        icon: <RiContactsLine />,
      },
      {
        name: "دوره ها",
        to: "admin/courses",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "کاربران",
        to: "admin/users",
        icon: <IoMdContacts />,
      },
      {
        name: "دسته بندی ها",
        to: "admin/category",
        icon: <RiContactsLine />,
      },
      {
        name: "کامنت ها",
        to: "admin/comments",
        icon: <RiContactsLine />,
      },
      {
        name: "کد تخفیف",
        to: "admin/off",
        icon: <RiContactsLine />,
      },
      {
        name: "منو",
        to: "admin/menus",
        icon: <RiContactsLine />,
      },
      {
        name: "جلسات",
        to: "admin/sessions",
        icon: <RiContactsLine />,
      },

    ],

  },
  {
    title: "اپلیکیشن‌ها",
    links: [
      {
        name: "تقویم",
        to: "calendar",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "کانبان",
        to: "kanban",
        icon: <BsKanban />,
      },
      {
        name: "ویرایشگر متن",
        to: "editor",
        icon: <FiEdit />,
      },
      {
        name: "انتخابگر رنگ",
        to: "color-picker",
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: "نمودارها",
    links: [
      {
        name: "خطی",
        to: "line",
        icon: <AiOutlineStock />,
      },
      {
        name: "مساحت",
        to: "area",
        icon: <AiOutlineAreaChart />,
      },

      {
        name: "میله‌ای",
        to: "bar",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "دایره‌ای",
        to: "pie",
        icon: <FiPieChart />,
      },
      {
        name: "مالی",
        to: "financial",
        icon: <RiStockLine />,
      },
      {
        name: "ستونی",
        to: "color-mapping",
        icon: <BsBarChart />,
      },
      {
        name: "هرمی",
        to: "pyramid",
        icon: <GiLouvrePyramid />,
      },
      {
        name: "انباشته",
        to: "stacked",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];

