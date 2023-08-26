import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { CheckError } from "./CheckError";
import ErrorText from "./ErrorText";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function TextFields({ name, control , lable , errors }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <FormControl fullWidth>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                {...CheckError(errors[name])}
                  {...field}
                  label={lable}
                  variant="outlined"
                  margin="normal"
                  sx={{ paddingRight: "12px" }}
                  required
                  
                />
              )}
            />

            {errors[name] ? <ErrorText message = {errors[name].message} /> : null}
          </FormControl>

        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
