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
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
import { openSuccessDialog } from "../../../utils/ui-components/pop-ups/SuccessDialog";

function ClassCreation({ ...others }) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({ label: "", color: "" });

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
        subject: "",
        grade: "",
        medium: "",
        teacher: "",
        day: "",
        time: "",
        description: "",
        Sdate: "",
        edate: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        subject: Yup.string().required("Subject is required"),
        // grade: Yup.string().required("Grade is required"),
        medium: Yup.string().required("Medium is required"),
        teacher: Yup.string().required("Instructor name is required"),
        day: Yup.string().required("Class Date is required"),
        time: Yup.string().required("Class Time is required"),
        description: Yup.string().required("Description is required"),
        Sdate: Yup.string().required("Start Date is required"),
        edate: Yup.string().required("End Date is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values) {

            console.log("values", values);
            
            setStatus({ success: true });
            setSubmitting(false);

            const { data } = await api.createClass(values);

            openSuccessDialog(data.status, data.comment);
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject Name"
                name="subject"
                type="text"
                value={values.subject}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.subject && errors.subject)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.subject && errors.subject && errors.subject}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Medium"
                name="medium"
                type="text"
                value={values.medium}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.medium && errors.medium)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.medium && errors.medium && errors.medium}
              />
            </Grid>
          </Grid>

          <Grid>
            <TextField
              fullWidth
              label="Instructor Name"
              name="teacher"
              type="text"
              value={values.teacher}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.teacher && errors.teacher)}
              sx={{ ...theme.typography.customInput }}
              helperText={touched.teacher && errors.teacher && errors.teacher}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Date"
                name="day"
                type="text"
                value={values.day}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.day && errors.day)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.day && errors.day && errors.day}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Time"
                name="time"
                type="text"
                value={values.time}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.time && errors.time)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.time && errors.time && errors.time}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="Sdate"
                type="text"
                value={values.Sdate}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.Sdate && errors.Sdate)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.Sdate && errors.Sdate && errors.Sdate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="edate"
                type="text"
                value={values.edate}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.edate && errors.edate)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.edate && errors.edate && errors.edate}
              />
            </Grid>
          </Grid>
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
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.enrollmentStatus}
              </FormHelperText>
            )}
          </FormControl> */}

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
                Create Class
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ClassCreation;
