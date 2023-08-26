import React from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import ErrorText from "./ErrorText";


export default function CheckBox({name , control , errors}) {
  return (
    <>
    <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel sx={{m : "0px"}}
        control={<Checkbox {...field} size="small" required />}
        label="تمامی قوانین و مقررات سایت را قبول دارم"
      />
    )}
  />
        {errors[name] ? <ErrorText message={errors[name].message} /> : null}

  </>
  )
}
