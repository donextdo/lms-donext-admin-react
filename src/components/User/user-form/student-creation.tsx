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

function StudentCreation({ ...others }) {
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
        grade: "",
        gender: "",
        address: "",
        gurdian: "",
        description: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        dob: Yup.string().required("Date of birth is required"),
        age: Yup.string().required("Age is required"),
        grade: Yup.string().required("Grade is required"),
        gender: Yup.string().required("Gender of birth is required"),
        address: Yup.string().required("Please enter address here"),
        gurdian: Yup.string().required("Gurdian is required"),
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
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grade"
                name="grade"
                type="text"
                value={values.grade}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.grade && errors.grade)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.grade && errors.grade && errors.grade}
              />
            </Grid>
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
          </Grid>
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
          <FormControl
            fullWidth
            error={Boolean(touched.gurdian && errors.gurdian)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-gurdian-register">
              Gurdian
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-gurdian-register"
              type="text"
              value={values.gurdian}
              name="gurdian"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.gurdian && errors.gurdian && (
              <FormHelperText
                error
                id="standard-weight-helper-text-gurdian-register"
              >
                {errors.gurdian}
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

export default StudentCreation;
