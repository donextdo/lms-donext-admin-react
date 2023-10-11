import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import * as api from "../../../assets/api/index";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { strengthColor, strengthIndicator } from "../../../utils/utils";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
import { openSuccessDialog } from "../../../utils/ui-components/pop-ups/SuccessDialog";

interface UpdateUserProps {
  selectedRowData: any;
  [key: string]: any;
}

function UpdateUser({ selectedRowData, ...others }: UpdateUserProps) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({ label: "", color: "" });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);
  return (
    <Formik
      initialValues={{
        id: selectedRowData.id || "",
        name: selectedRowData.name || "",
        role: selectedRowData.role || "",
        nic: selectedRowData.nic || "",
        email: selectedRowData.email || "",
        mobile: selectedRowData.mobile || "",
        dateTime: selectedRowData.dateTime || "",
        username: selectedRowData.username || "",
        password: selectedRowData.password || "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        nic: Yup.string().required("NIC is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        mobile: Yup.string()
          .required("Please enter mobile number")
          .matches(
            /(?:(0|94|)(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|(0|94|)7(0|1|2|4|5|6|7|8)\d)\d{6}/g,
            "Invalid mobile number pattern"
          ),
        username: Yup.string().max(255).required("Username is required"),
        checked: Yup.boolean()
          .required("You must agree with terms & conditions")
          .oneOf([true], "You must agree with terms & conditions"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values) {
            setStatus({ success: true });
            setSubmitting(false);

            // const { data } = await api.updateUser(values);

            // openSuccessDialog(data.status, data.comment);
            navigate("/users");
          }
        } catch (err: any) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={4}>
              <TextField
                disabled
                fullWidth
                label="User ID"
                name="id"
                type="text"
                value={values.id}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.id && errors.id)}
                helperText={
                  touched.id && errors.id ? (errors.id as React.ReactNode) : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                disabled
                fullWidth
                label="Name"
                name="name"
                type="text"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={
                  touched.name && errors.name
                    ? (errors.name as React.ReactNode)
                    : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={4}>
              <TextField
                disabled
                fullWidth
                label="Role"
                name="role"
                type="text"
                value={values.role}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.role && errors.role)}
                helperText={
                  touched.role && errors.role
                    ? (errors.role as React.ReactNode)
                    : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Email Address
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                  // aria-describedby should not be added here
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{String(errors.email)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={matchDownSM ? 0 : 2}
          >
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-mobile-register">
                  Mobile
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mobile-register"
                  type="tel"
                  value={values.mobile}
                  name="mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  //   startAdornment={
                  //     // <InputAdornment position="start">+ 94</InputAdornment>
                  //   }
                />
                {touched.mobile && errors.mobile && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {/* {errors.mobile} */}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="NIC number"
                name="nic"
                type="text"
                value={values.nic}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.nic && errors.nic)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.nic && errors.nic
                    ? (errors.nic as React.ReactNode)
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid>
            <TextField
              disabled
              fullWidth
              label="Last Login"
              name="dateTime"
              type="text"
              value={values.dateTime}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.dateTime && errors.dateTime)}
              sx={{ ...theme.typography.customInput }}
              helperText={
                touched.dateTime && errors.dateTime
                  ? (errors.dateTime as React.ReactNode)
                  : ""
              }
            />
          </Grid>
          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-username-register">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username-register"
              type="text"
              value={values.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.username && errors.username && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {String(errors.username)}
              </FormHelperText>
            )}
          </FormControl>

          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{ width: 85, height: 8, borderRadius: "7px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1">
                    Agree with &nbsp;
                    <Typography variant="body1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
              {touched.checked && errors.checked && (
                <FormHelperText error>{errors.checked}</FormHelperText>
              )}
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Update User
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default UpdateUser;
