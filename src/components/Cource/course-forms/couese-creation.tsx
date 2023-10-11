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
  Radio,
  RadioGroup,
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

function CourseCreation({ ...others }) {
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
        cname: "",
        description: "",
        enrollmentStatus: "", // Initialize enrollmentStatus to "Open"
        // mobile: "",
        // username: "",
        // password: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        cname: Yup.string().required("Course Name is required"),
        description: Yup.string().required("Description is required"),
        enrollmentStatus: Yup.string()
          .required("Enrollment Status is required")
          .oneOf(["Open", "Close"], "Invalid Enrollment Status"), // Valid values are 'Open' or 'Close'
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values) {
            setStatus({ success: true });
            setSubmitting(false);

            // const { data } = await api.signUp(values);

            // openSuccessDialog(data.status, data.comment);
            navigate("/login");
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
          <Grid>
            <TextField
              fullWidth
              label="Course Name"
              name="cname"
              type="text"
              value={values.cname}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.cname && errors.cname)}
              sx={{ ...theme.typography.customInput }}
              helperText={touched.cname && errors.cname && errors.cname}
            />
          </Grid>
          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-description">
              Course Description
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-description"
              type="text"
              multiline
              rows={3}
              value={values.description}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.description && errors.description && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.description}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl component="fieldset" fullWidth>
            <InputLabel
              component="legend"
              shrink={true}
              sx={{ marginTop: 3, fontSize: "1.2rem", fontWeight: 400 }}
            >
              Enrollment Status
            </InputLabel>
            <RadioGroup
              sx={{ marginLeft: 20, marginTop: 1 }}
              row
              name="enrollmentStatus"
              value={values.enrollmentStatus}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="Open"
                control={<Radio color="primary" />}
                label="Open"
              />
              <FormControlLabel
                value="Close"
                control={<Radio color="primary" />}
                label="Close"
              />
            </RadioGroup>
            {touched.enrollmentStatus && errors.enrollmentStatus && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.enrollmentStatus}
              </FormHelperText>
            )}
          </FormControl>

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
                Create Course
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default CourseCreation;
