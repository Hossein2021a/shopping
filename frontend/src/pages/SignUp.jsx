import React , {useContext} from "react";
import TextFields from "../Components/Register/TextFields";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckBox from "../Components/Register/CheckBox";
import { passwordRejex } from "../Components/Register/Regex";
import api from "../Components/UserApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import AuthContext from "../Contexts/authContext";

const schema = yup.object({
  name: yup.string().required("لطفا نام و نام خانوادگی خود را وارد نمایید"),
  username: yup.string().required("لطفا نام کاربری خود را وارد نمایید"),
  email: yup
    .string()
    .required("لطفا ایمیل خود را وارد نمایید")
    .email("فرمت ایمیل صحیح نیست"),
  password: yup
    .string()
    .required("لطفا پسورد خود را وارد نمایید")
    .matches(passwordRejex, "پسورد باید شامل حرف بزرگ ، کوچک و یک نماد باشد"),
  confirmPassword: yup
    .string()
    .required("وارد کردن این گزینه الزامی است")
    .oneOf([yup.ref("password"), null], "تکرار پسورد صحیح نیست"),
  phone: yup.string().required("لطفا تلفن همراه خود را وارد نمایید"),

  // check: yup.bool().oneOf([true], 'زدن این گزینه الزامی است'),
});

export default function SignUp() {

  const navigaet = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone :""
      // check: false,
    },
    resolver: yupResolver(schema),
  });

  const authContext = useContext(AuthContext)

  const onSubmit = async (data) => {

    const notify = () => toast.error("شما قبلا در سایت ثبت نام کرده اید");
    const notify1 = () => toast.error("شما در سایت بن شده اید");

    try {
      const response = await api.post("/v1/auth/register", data);
      authContext.login(response.data.user , response.data.accessToken)

      if (response.status === 201) {
        
        navigaet("/")

      }
      console.log(response)
      
    } catch (error) {

      if(error.response.status === 403){
        notify1()
      }else{
        notify()
      }
    }
  };

  return ( 
    <div className=" flex w-full items-center justify-center mt-8  ">
      <div className="lg:w-[40%] w-[80%] md:w-[60%] bg-gray-100 p-12 shadow-md rounded-sm">
        <h1 className="text-extrabold text-center mb-4 text-[18px]">ثبت نام</h1>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col">
          <TextFields
            name="name"
            control={control}
            lable="نام و نام خانوادگی"
            errors={errors}
          />
          <TextFields
            errors={errors}
            name="username"
            control={control}
            lable="نام کاربری"
          />
          <TextFields
            errors={errors}
            name="email"
            control={control}
            lable="ایمیل"
          />
          <TextFields
            errors={errors}
            name="password"
            control={control}
            lable="پسورد"
          />
          <TextFields
            errors={errors}
            name="confirmPassword"
            control={control}
            lable="تکرار پسورد"
          />
          <TextFields
            errors={errors}
            name="phone"
            control={control}
            lable="تلفن"
          />
          {/* <CheckBox name="check" control={control} errors={errors} /> */}

          <Button
            sx={{ mt: "25px" }}
            type="submit"
            color="success"
            variant="contained">
            ثبت نام
          </Button>
          <ToastContainer  rtl/>


        </form>
      </div>
    </div>
  );
}
