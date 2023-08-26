import React, { useState } from "react";
import TextFields from "../Components/Register/TextFields";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import api from "../Components/UserApi";
import AuthContext from "../Contexts/authContext";
import { useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Lodin() {

    const [captach , setCaptcha] = useState(false)


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const authContext = useContext(AuthContext);


  const onSubmit = async (data) => {
  const notify = () => toast.error("اطلاعات ورود اشتباه می باشد");
  const notifyy = () => toast.error("لطفا کد امنیتی را کامل نمایید");

    if (captach) {
    try {
        const response = await api.post("/v1/auth/login", data);
        authContext.login({}, response.data.accessToken);
      } catch (error) {
        console.log("error");
        notify();
      }
    }else{
        notifyy();
    }

  };

  const onChangeHandler = () =>{
    setCaptcha(true)
  }

  return (
    <div className="flex w-full items-center justify-center mt-8">
      <div className="lg:w-[40%] w-[80%] md:w-[60%] bg-gray-100 p-12 shadow-md rounded-sm">
      <h1 className="text-extrabold text-center mb-4 text-[18px]">ثبت نام</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFields
            name="identifier"
            control={control}
            lable="نام کاربری"
            errors={errors}
          />
          <TextFields
            errors={errors}
            name="password"
            control={control}
            lable="پسورد"
          />
          <div className="mt-3"> 
          <ReCAPTCHA  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} />
          </div>
          <Button
            fullWidth
            sx={{ mt: "25px" }}
            type="submit"
            color="success"
            variant="contained">
            ورود
          </Button>
          <ToastContainer rtl />
        </form>
      </div>
    </div>
  );
}
