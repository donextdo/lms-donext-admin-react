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
import { Link, useNavigate } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
import { openSuccessDialog } from "../../../utils/ui-components/pop-ups/SuccessDialog";

interface UpdateCourseProps {
  selectedRowData: any;
  [key: string]: any;
}

function CourseUpdate({ selectedRowData, ...others }: UpdateCourseProps) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Formik
      initialValues={{
        cname: selectedRowData.cname || "",
        totclasses: selectedRowData.totclasses || "",
        description: selectedRowData.description || "",
        enrollmentStatus: selectedRowData.isOpen === "open" ? "Open" : "Close",
        CreatedDate: selectedRowData.CreatedDate || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        cname: Yup.string().required("Course Name is required"),
        totclasses: Yup.string().required("Total Classes is required"),
        description: Yup.string().required("Description is required"),
        enrollmentStatus: Yup.string()
          .required("Enrollment Status is required")
          .oneOf(["Open", "Close"], "Invalid Enrollment Status"), // Valid values are 'Open' or 'Close'
        CreatedDate: Yup.string()
        //   .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
          .required("Created Date is required"),
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course Name"
                name="cname"
                type="text"
                value={values.cname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.cname && errors.cname)}
                helperText={
                  touched.cname && errors.cname
                    ? (errors.cname as React.ReactNode)
                    : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Total Classes"
                name="totclasses"
                type="text"
                value={values.totclasses}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.totclasses && errors.totclasses)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.totclasses && errors.totclasses
                    ? (errors.totclasses as React.ReactNode)
                    : ""
                }
              />
            </Grid>
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
              sx={{ marginTop: 1 }}
              id="outlined-adornment-description"
              type="text"
              value={values.description}
              multiline
              rows={3}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
              // aria-describedby should not be added here
            />
            {touched.description && errors.description && (
              <FormHelperText error>
                {String(errors.description)}
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
              <FormHelperText error>
                {String(errors.enrollmentStatus)}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.CreatedDate && errors.CreatedDate)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-CreatedDate-register">
              Created Date
            </InputLabel>
            <OutlinedInput
              disabled
              id="outlined-adornment-CreatedDate-register"
              type="text"
              value={values.CreatedDate}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.CreatedDate && errors.CreatedDate && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {String(errors.CreatedDate)}
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
                Update Course
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default CourseUpdate;
