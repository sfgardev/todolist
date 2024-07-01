import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { login, selectIsLoggedIn } from "./authSlice";
import { Navigate } from "react-router-dom";

const renderErrorMessage = <T,>(
  errors: FormikErrors<T>,
  touched: FormikTouched<T>,
  field: keyof T
) => {
  if (!errors[field] || !touched[field]) return null;
  // if (errors[field] && touched[field]) return <div style={{ color: "tomato" }}>{errors[field] as JSX.Element}</div>;

  return <div style={{ color: "tomato" }}>{errors[field] as JSX.Element}</div>;
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof typeof values, string>> = {};

      const pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

      if (!values.email) {
        errors.email = "Required";
      } else if (!pattern.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Should be more 3 characters";
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...getFieldProps("email")}
              />
              {renderErrorMessage(errors, touched, "email")}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...getFieldProps("password")}
              />
              {renderErrorMessage(errors, touched, "password")}
              <FormControlLabel
                label={"Remember me"}
                /* https://formik.org/docs/migrating-v2#getfieldpropsnameorprops */
                control={<Checkbox {...getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
