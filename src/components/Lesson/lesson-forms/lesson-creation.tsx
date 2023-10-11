import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
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

const availableCourses = ["Science", "Mathematics", "English"];
const availableClasses = ["Grade 6", "Grade 10", "Grade 12"];
const availableTeachers = ["Lakmali Perera", "Suneth Silva", "Darshana Perera"];

function LessonCreation({ ...others }) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

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
        lname: "",
        description: "",
        course: selectedCourse,
        class: selectedClass,
        teacher: selectedTeacher,
        videoContent: "", 
        videoUpload: undefined,
        lessonMaterial: [], // Initialize lessonMaterial as an array to store multiple files
        // mobile: "",
        // username: "",
        // password: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        lname: Yup.string().required("Lesson Name is required"),
        description: Yup.string().required("Description is required"),
        course: Yup.string().required("Course is required"),
        class: Yup.string().required("Class is required"),
        teacher: Yup.string().required("Teacher is required"),
        videoUpload: Yup.mixed()
        .required("Vedio upload is required")
        .test(
          'fileSize',
          'File size is too large (maximum is 250 MB)',
          (value) => {
            if (value instanceof File && value.size) {
              return value.size <= 1024 * 1024 * 250; // 250 MB
            }
            return true; // Allow undefined values (when no file is selected)
          }
        )
        .test(
          'fileType',
          'Invalid file type. Only MP4, MPEG, and QuickTime formats are allowed.',
          (value) => {
            if (value instanceof File && value.type) {
              return ['video/mp4', 'video/mpeg', 'video/quicktime'].includes(value.type);
            }
            return true; // Allow undefined values (when no file is selected)
          }
        ),
        lessonMaterial: Yup.array().of(
            Yup.mixed()
              .test(
                'fileSize',
                'File size is too large (maximum is 250 MB)',
                (value) => {
                  if (value instanceof File && value.size) {
                    return value.size <= 1024 * 1024 * 250; // 250 MB
                  }
                  return true; // Allow undefined values (when no file is selected)
                }
              )
              .test('fileType', 'Invalid file type.', (value) => {
                if (value) {
                    const supportedFormats = [
                        'image/jpeg',
                        'image/png',
                        'application/pdf',
                        'application/msword', // Word files (.doc)
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word files (.docx)
                        'text/plain', // Text files (.txt)
                        'application/vnd.ms-powerpoint', // PowerPoint files (.ppt)
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation' // PowerPoint files (.pptx)
                      ];
                  return supportedFormats.includes((value as File).type);
                }
                return true; // Allow undefined values (when no file is selected)
              })
          ),
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
              label="Lesson Name"
              name="lname"
              type="text"
              value={values.lname}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.lname && errors.lname)}
              sx={{ ...theme.typography.customInput }}
              helperText={touched.lname && errors.lname && errors.lname}
            />
          </Grid>
          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-description">
              Lesson Description
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

          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={matchDownSM ? 0 : 2}
          >
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.course && errors.course)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-course-select">
                  Course
                </InputLabel>
                <Select
                  id="outlined-adornment-course-select"
                  value={values.course}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value); // Update selectedCourse when the value changes
                    handleChange(e);
                  }}
                  name="course"
                  label="Course"
                >
                  {availableCourses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
                {touched.course && errors.course && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.course}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.class && errors.class)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-class-select">
                  Class
                </InputLabel>
                <Select
                  id="outlined-adornment-class-select"
                  value={values.class}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setSelectedClass(e.target.value); // Update selectedclass when the value changes
                    handleChange(e);
                  }}
                  name="class"
                  label="Class"
                >
                  {availableClasses.map((classes, index) => (
                    <MenuItem key={index} value={classes}>
                      {classes}
                    </MenuItem>
                  ))}
                </Select>
                {touched.class && errors.class && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.class}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl
            fullWidth
            error={Boolean(touched.teacher && errors.teacher)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-teacher-select">
              Teacher
            </InputLabel>
            <Select
              id="outlined-adornment-teacher-select"
              value={values.teacher}
              onBlur={handleBlur}
              onChange={(e) => {
                setSelectedTeacher(e.target.value); // Update selectedteacher when the value changes
                handleChange(e);
              }}
              name="teacher"
              label="teacher"
            >
              {availableTeachers.map((teacher, index) => (
                <MenuItem key={index} value={teacher}>
                  {teacher}
                </MenuItem>
              ))}
            </Select>
            {touched.teacher && errors.teacher && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.teacher}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
              <InputLabel
                htmlFor="outlined-adornment-file-upload"
                shrink={true}
                sx={{ marginTop: 3, fontSize: "1.2rem", fontWeight: 400 }}
              >
                Lesson Materials
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-file-upload"
                type="file"
                name="lessonMaterial"
                onBlur={handleBlur}
                onChange={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                      const filesArray = Array.from(files);
                      handleChange({
                        target: {
                          name: 'lessonMaterial',
                          value: filesArray,
                        },
                      });
                    }
                  }}
                sx={{ pl: 20 }}
                inputProps={{
                    multiple: true, // Allow multiple file selection
                }}
              />
              {touched.lessonMaterial && errors.lessonMaterial && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.lessonMaterial}
                </FormHelperText>
              )}
            </FormControl>

          <FormControl component="fieldset" fullWidth>
            <InputLabel
              component="legend"
              shrink={true}
              sx={{ marginTop: 3, fontSize: "1.2rem", fontWeight: 400 }}
            >
              Video Content Status
            </InputLabel>
            <RadioGroup
              sx={{ marginLeft: 20, marginTop: 1 }}
              row
              name="videoContent"
              value={values.videoContent}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="Available"
                control={<Radio color="primary" />}
                label="Available"
              />
              <FormControlLabel
                value="Not Available"
                control={<Radio color="primary" />}
                label="Not Available"
              />
            </RadioGroup>
            {touched.videoContent && errors.videoContent && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.videoContent}
              </FormHelperText>
            )}
          </FormControl>

          {values.videoContent === "Available" && ( // Render only when videoContent is "Available"
            <FormControl fullWidth>
              <InputLabel
                htmlFor="outlined-adornment-video-upload"
                shrink={true}
                sx={{ marginTop: 3, fontSize: "1.2rem", fontWeight: 400 }}
              >
                Video Upload
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-video-upload"
                type="file"
                name="videoUpload"
                onBlur={handleBlur}
                onChange={(e) => {
                  // Handle file upload logic here if needed
                  handleChange(e);
                }}
                sx={{ pl: 15 }}
                inputProps={{}}
              />
              {touched.videoUpload && errors.videoUpload && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.videoUpload}
                </FormHelperText>
              )}
            </FormControl>
          )}

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
                Create Lesson
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LessonCreation;
