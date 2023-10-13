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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CreateNewStudent from "../CreateNewStudent";
import CreateNewTeacher from "../CreateNewTeacher";
import CreateNewStaff from "../CreateNewStaff";

function UserCreation({ ...others }) {
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
  const [showAddStudent, setShowAddStudent] = useState(true);
  const [showAddTeacher, setShowAddTeacher] = useState(true);
  const [showAddStaff, setShowAddStaff] = useState(true);
  const [selectedRole, setSelectedRole] = useState(""); // State to store the selected role

  const [isRoleSelectionVisible, setRoleSelectionVisible] = useState(true);
  const [isUserCreationVisible, setUserCreationVisible] = useState(false);

  const handleCreateUserClick = () => {
    // Ensure the user has selected a role
    if (selectedRole) {
      // Hide role selection form and show user creation form
      setRoleSelectionVisible(false);
      setUserCreationVisible(true);
    }
  };

  return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          nic: "",
          userRole: "",
          username: "",
          password: "",
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
          userRole: Yup.string().required("UserRole is required"),
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
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
            <Grid>
              <TextField
                fullWidth
                label="Name"
                name="name"
                type="text"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.name && errors.name && errors.name}
              />
            </Grid>
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
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-register"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <Grid
              container
              direction="row"
              justifyContent="center"
              spacing={matchDownSM ? 0 : 2}
            >
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.mobile && errors.mobile)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-mobile-register">
                    Mobile
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-mobile-register"
                    type="number"
                    value={values.mobile}
                    name="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //   startAdornment={
                    //     <InputAdornment position="start">+ 94</InputAdornment>
                    //   }
                  />
                  {touched.mobile && errors.mobile && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-mobile-register"
                    >
                      {errors.mobile}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="NIC Number"
                  name="nic"
                  type="text"
                  value={values.nic}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.nic && errors.nic)}
                  sx={{ ...theme.typography.customInput }}
                  helperText={touched.nic && errors.nic && errors.nic}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-user-role">
                User Role
              </InputLabel>
              <Select
                id="outlined-adornment-user-role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                label="User Role"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.username && errors.username)}
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
                <FormHelperText
                  error
                  id="standard-weight-helper-text-username-register"
                >
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {errors.password}
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
            {isUserCreationVisible && (
              <div>
                {selectedRole === "student" && showAddStudent && (
                  <CreateNewStudent setShowAddStudent={setShowAddStudent} />
                )}
                {selectedRole === "instructor" && showAddTeacher && (
                  <CreateNewTeacher setShowAddTeacher={setShowAddTeacher} />
                )}
                {selectedRole === "staff" && showAddStaff && (
                  <CreateNewStaff setShowAddStaff={setShowAddStaff} />
                )}
              </div>
            )}

            {isRoleSelectionVisible && (
              // Render the "Create User" button
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    onClick={handleCreateUserClick}
                    variant="contained"
                    color="primary"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    Create User
                  </Button>
                </AnimateButton>
              </Box>
            )}
          </form>
        )}
      </Formik>

  );
}

export default UserCreation;
