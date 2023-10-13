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
import * as api from "../../../assets/api/class/index";
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

interface UpdateClassProps {
  selectedRowData: any;
  [key: string]: any;
}

function ClassUpdate({ selectedRowData, ...others }: UpdateClassProps) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Formik
      initialValues={{
        classid: selectedRowData.classid || "",
        subject: selectedRowData.subject || "",
        grade: selectedRowData.grade || "",
        medium: selectedRowData.medium || "",
        instructor: selectedRowData.instructor || "",
        date: selectedRowData.date || "",
        time: selectedRowData.time || "",
        description: selectedRowData.description || "",
        // enrollmentStatus: selectedRowData.isOpen === "open" ? "Open" : "Close",
        startdate: selectedRowData.startdate || "",
        enddate: selectedRowData.enddate || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        date: Yup.string().required("Class date is required"),
        time: Yup.string().required("class time is required"),
        description: Yup.string().required("Description is required"),
        // enrollmentStatus: Yup.string()
        //   .required("Enrollment Status is required")
        //   .oneOf(["Open", "Close"], "Invalid Enrollment Status"), // Valid values are 'Open' or 'Close'
        startdate: Yup.string()
          //   .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
          .required("Start Date is required"),
        enddate: Yup.string()
          //   .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
          .required("End Date is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values) {
            setStatus({ success: true });
            setSubmitting(false);

            const { data } = await api.updateClass(values);

            openSuccessDialog(data.status, data.comment);
            navigate("/classes");
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
                disabled
                fullWidth
                label="Class ID"
                name="classid"
                type="text"
                value={values.classid}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.classid && errors.classid)}
                helperText={
                  touched.classid && errors.classid
                    ? (errors.classid as React.ReactNode)
                    : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Subject"
                name="subject"
                type="text"
                value={values.subject}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.subject && errors.subject)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.subject && errors.subject
                    ? (errors.subject as React.ReactNode)
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Grade"
                name="grade"
                type="text"
                value={values.grade}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.grade && errors.grade)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.grade && errors.grade
                    ? (errors.grade as React.ReactNode)
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Medium"
                name="medium"
                type="text"
                value={values.medium}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.medium && errors.medium)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.medium && errors.medium
                    ? (errors.medium as React.ReactNode)
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                label="Instructor Name"
                name="instructor"
                type="text"
                value={values.instructor}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.instructor && errors.instructor)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.instructor && errors.instructor
                    ? (errors.instructor as React.ReactNode)
                    : ""
                }
              />
            </Grid>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Date"
                name="date"
                type="text"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.date && errors.date)}
                helperText={
                  touched.date && errors.date
                    ? (errors.date as React.ReactNode)
                    : ""
                }
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class atime"
                name="time"
                type="text"
                value={values.time}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.time && errors.time)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.time && errors.time
                    ? (errors.time as React.ReactNode)
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
              Class Description
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

          {/* <FormControl component="fieldset" fullWidth>
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
          </FormControl> */}

          <FormControl
            fullWidth
            error={Boolean(touched.startdate && errors.startdate)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-startdate-register">
              Start Date
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-startdate-register"
              type="text"
              value={values.startdate}
              name="startdate"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.startdate && errors.startdate && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {String(errors.startdate)}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.enddate && errors.enddate)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-enddate-register">
              End Date
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-enddate-register"
              type="text"
              value={values.enddate}
              name="enddate"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.enddate && errors.enddate && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {String(errors.enddate)}
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
                Update Class
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ClassUpdate;
