import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";

function StaffCreation({ ...others }) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({ label: "", color: "" });

  return (
    <Formik
      initialValues={{
        dob: "",
        age: "",
        gender: "",
        address: "",
        position: "",
        department: "",
        qualifications: "",
        experience: "",
        description: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        dob: Yup.string().required("Date of birth is required"),
        age: Yup.string().required("Age is required"),
        gender: Yup.string().required("Gender is required"),
        address: Yup.string().required("Please enter address here"),
        position: Yup.string().required("Position is required"),
        department: Yup.string().required("Department is required"),
        qualifications: Yup.string().required("Qualifications are required"),
        experience: Yup.string().required("Experience is required"),
        description: Yup.string().required("Description is required"),
        checked: Yup.boolean()
          .required("You must agree with terms & conditions")
          .oneOf([true], "You must agree with terms & conditions"),
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
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dob"
                type="text"
                value={values.dob}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.dob && errors.dob)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.dob && errors.dob && errors.dob}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={values.age}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.age && errors.age)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.age && errors.age && errors.age}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={matchDownSM ? 0 : 2}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                type="text"
                value={values.gender}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.gender && errors.gender)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.gender && errors.gender && errors.gender}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-address-register">
                  Address
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address-register"
                  type="text"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.address && errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-address-register"
                  >
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title/Position"
                name="position"
                type="text"
                value={values.position}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.position && errors.position)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.position && errors.position && errors.position
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                type="text"
                value={values.department}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.department && errors.department)}
                sx={{ ...theme.typography.customInput }}
                helperText={
                  touched.department && errors.department && errors.department
                }
              />
            </Grid>
          </Grid>
          <FormControl
            fullWidth
            error={Boolean(touched.qualifications && errors.qualifications)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-qualifications-register">
              Qualifications
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-qualifications-register"
              type="text"
              value={values.qualifications}
              name="qualifications"
              multiline
              rows={3}
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.qualifications && errors.qualifications && (
              <FormHelperText
                error
                id="standard-weight-helper-text-qualifications-register"
              >
                {errors.qualifications}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(touched.experience && errors.experience)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-experience-register">
              Experience
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-experience-register"
              type="text"
              value={values.experience}
              name="experience"
              multiline
              rows={3}
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.experience && errors.experience && (
              <FormHelperText
                error
                id="standard-weight-helper-text-experience-register"
              >
                {errors.experience}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-description-register">
              Description
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-description-register"
              type="text"
              value={values.description}
              name="description"
              multiline
              rows={3}
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.description && errors.description && (
              <FormHelperText
                error
                id="standard-weight-helper-text-description-register"
              >
                {errors.description}
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
                Create Account
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default StaffCreation;
