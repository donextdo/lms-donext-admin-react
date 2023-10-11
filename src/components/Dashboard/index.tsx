import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { gridDoubleSpacing, gridSpacing } from "../../store/constants";
import { Box, Button, Grid, Typography } from "@mui/material";
import VerificationCard from "./verification-card";
import IncomeCard from "./income-card";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CustomerEngagementChart from "./customer-engagement-chart";
import DatePicker from "../../utils/ui-components/FormsUI/DatePicker";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import MainCard from "../../utils/ui-components/MainCard";

const INITIAL_FORM_STATE = {
  fromDate: dayjs().subtract(10, "day"),
  toDate: dayjs(),
};

const FORM_VALIDATION = Yup.object().shape({
  fromDate: Yup.date()
    .nullable()
    .required("Please Select a Date")
    .typeError("please enter a valid date"),
  toDate: Yup.date()
    .nullable()
    .required("Please Select a Date")
    .typeError("please enter a valid date"),
});

function Dashboard() {
  const theme: any = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <MainCard
      title="Dashboard"
      great="Good Morning, "
      user="Jhon Seamen"
      about="Summery Details"
      height="100vh"
    >
      <Grid
        container
        spacing={gridDoubleSpacing}
        paddingTop={5}
        paddingBottom={5}
      >
        <Grid container item>
          <Typography variant="h2">Upcoming Classes Today</Typography>
        </Grid>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Grid container spacing={gridSpacing}>
            {VerificationCardData.map((data, index) => (
              <Grid item xs={12} key={index}>
                <VerificationCard
                  grade={data.grade}
                  subject={data.subject}
                  location={data.location}
                  time={data.time}
                  session={data.session}
                  title={data.title}
                  isLoading={isLoading}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Grid container spacing={gridSpacing}>
            {IncomeCardData.map((income, index) => (
              <Grid item sm={6} xs={12} md={6} lg={12} key={index}>
                <IncomeCard
                isLoading={isLoading}
                icon={income.icon}
                title={income.title}
                value={income.value}
                  size={income.size}
                  color={"info"}
                  OptionIcon={<PermIdentityIcon />}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default Dashboard;

const VerificationCardData = [
  {
    grade: "Grade 7",
    subject: "Music",
    time: "1:00 PM",
    session: "Session 12",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Canada",
  },
  {
    grade: "Grade 7",
    subject: "Music",
    time: "1:00 PM",
    session: "Session 12",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Canada",
  },
  {
    grade: "Grade 7",
    subject: "Music",
    time: "1:00 PM",
    session: "Session 12",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Canada",
  },
  {
    grade: "Grade 7",
    subject: "Music",
    time: "1:00 PM",
    session: "Session 12",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Canada",
  },
];

const IncomeCardData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M32.8125 31.25C32.3981 31.25 32.0007 31.4146 31.7076 31.7076C31.4146 32.0007 31.25 32.3981 31.25 32.8125C31.25 33.2269 31.4146 33.6243 31.7076 33.9174C32.0007 34.2104 32.3981 34.375 32.8125 34.375H39.0625C39.4769 34.375 39.8743 34.2104 40.1674 33.9174C40.4604 33.6243 40.625 33.2269 40.625 32.8125C40.625 32.3981 40.4604 32.0007 40.1674 31.7076C39.8743 31.4146 39.4769 31.25 39.0625 31.25H32.8125ZM3.125 17.1875C3.125 15.1155 3.9481 13.1284 5.41323 11.6632C6.87836 10.1981 8.8655 9.375 10.9375 9.375H39.0625C41.1345 9.375 43.1216 10.1981 44.5868 11.6632C46.0519 13.1284 46.875 15.1155 46.875 17.1875V32.8125C46.875 34.8845 46.0519 36.8716 44.5868 38.3368C43.1216 39.8019 41.1345 40.625 39.0625 40.625H10.9375C8.8655 40.625 6.87836 39.8019 5.41323 38.3368C3.9481 36.8716 3.125 34.8845 3.125 32.8125V17.1875ZM43.75 18.75V17.1875C43.75 15.9443 43.2561 14.752 42.3771 13.8729C41.498 12.9939 40.3057 12.5 39.0625 12.5H10.9375C9.6943 12.5 8.50201 12.9939 7.62294 13.8729C6.74386 14.752 6.25 15.9443 6.25 17.1875V18.75H43.75ZM6.25 21.875V32.8125C6.25 34.0557 6.74386 35.248 7.62294 36.1271C8.50201 37.0061 9.6943 37.5 10.9375 37.5H39.0625C40.3057 37.5 41.498 37.0061 42.3771 36.1271C43.2561 35.248 43.75 34.0557 43.75 32.8125V21.875H6.25Z"
          fill="rgb(255, 136, 51, 0.8)"
        />
      </svg>
    ),
    title: "Total Payment",
    value: "LKR 85,000",
    size: 7
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M44.1211 11.3868L25.3711 5.13675C25.1298 5.05907 24.8702 5.05907 24.6289 5.13675L5.89844 11.3868H5.85938L5.72266 11.4649H5.70313L5.56641 11.543C5.56641 11.5482 5.56435 11.5532 5.56069 11.5568C5.55702 11.5605 5.55205 11.5625 5.54687 11.5625L5.41016 11.6797L5.3125 11.7969C5.3125 11.8021 5.31044 11.8071 5.30678 11.8107C5.30312 11.8144 5.29815 11.8164 5.29297 11.8164L5.21484 11.9532C5.21484 11.9727 5.19531 11.9727 5.19531 11.9922L5.13672 12.1289C5.11242 12.1775 5.09908 12.2309 5.09766 12.2852C5.08165 12.3423 5.07505 12.4017 5.07812 12.461V28.086C5.07812 28.3968 5.20159 28.6948 5.42136 28.9146C5.64113 29.1344 5.9392 29.2579 6.25 29.2579C6.5608 29.2579 6.85887 29.1344 7.07864 28.9146C7.29841 28.6948 7.42188 28.3968 7.42188 28.086V14.1211L14.9805 16.6407C13.6127 18.6429 12.8841 21.0127 12.8906 23.4375C12.892 25.6263 13.4867 27.7738 14.6113 29.6516C15.7359 31.5294 17.3484 33.0672 19.2773 34.1016C15.3021 35.4103 11.8919 38.0351 9.60938 41.543C9.52473 41.6725 9.46643 41.8175 9.4378 41.9695C9.40917 42.1216 9.41077 42.2778 9.44251 42.4292C9.47425 42.5807 9.53551 42.7244 9.62278 42.8521C9.71006 42.9799 9.82165 43.0892 9.95117 43.1739C10.0807 43.2585 10.2256 43.3168 10.3777 43.3454C10.5297 43.3741 10.686 43.3725 10.8374 43.3407C10.9888 43.309 11.1325 43.2477 11.2603 43.1605C11.3881 43.0732 11.4974 42.9616 11.582 42.8321C13.0338 40.5951 15.0219 38.7566 17.3653 37.4838C19.7087 36.2109 22.3332 35.5442 25 35.5442C27.6668 35.5442 30.2913 36.2109 32.6347 37.4838C34.9781 38.7566 36.9662 40.5951 38.418 42.8321C38.53 42.993 38.6788 43.1248 38.8521 43.2165C39.0254 43.3082 39.218 43.3572 39.4141 43.3594C39.6376 43.3609 39.8561 43.2927 40.0391 43.1641C40.1687 43.0808 40.2806 42.9728 40.3685 42.8463C40.4563 42.7197 40.5184 42.577 40.551 42.4265C40.5837 42.2759 40.5863 42.1204 40.5588 41.9688C40.5313 41.8172 40.4741 41.6725 40.3906 41.543C38.1081 38.0351 34.6979 35.4103 30.7227 34.1016C32.6516 33.0672 34.2641 31.5294 35.3887 29.6516C36.5133 27.7738 37.108 25.6263 37.1094 23.4375C37.1159 21.0127 36.3873 18.6429 35.0195 16.6407L44.1211 13.6133C44.3555 13.5363 44.5597 13.3871 44.7044 13.1872C44.8491 12.9873 44.9271 12.7468 44.9271 12.5C44.9271 12.2532 44.8491 12.0127 44.7044 11.8128C44.5597 11.6129 44.3555 11.4638 44.1211 11.3868ZM34.7656 23.4375C34.7651 24.9929 34.3931 26.5257 33.6805 27.9083C32.968 29.2908 31.9355 30.4832 30.669 31.3861C29.4025 32.289 27.9386 32.8764 26.3993 33.0992C24.8599 33.3221 23.2896 33.174 21.819 32.6674C20.3485 32.1608 19.0202 31.3102 17.9448 30.1865C16.8693 29.0628 16.0779 27.6985 15.6363 26.2071C15.1946 24.7157 15.1157 23.1404 15.4059 21.6123C15.6961 20.0842 16.3471 18.6476 17.3047 17.4219L24.6289 19.8633C24.8702 19.941 25.1298 19.941 25.3711 19.8633L32.6953 17.4219C34.0322 19.1427 34.7604 21.2585 34.7656 23.4375ZM32.6758 14.961L25 17.5196L17.3242 14.961L9.96094 12.5L25 7.4805L40.0391 12.5L32.6758 14.961Z"
          fill="rgb(255, 136, 51, 0.8)"
        />
      </svg>
    ),
    title: "No. of Registered Students",
    value: "100",
    size: 8
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.25 6.25H38.5417V11.4583H36.4583V8.33333H8.33333V32.2917H30.6115V34.375H6.25V6.25ZM37.5 19.7917C38.3288 19.7917 39.1237 19.4624 39.7097 18.8764C40.2958 18.2903 40.625 17.4955 40.625 16.6667C40.625 15.8379 40.2958 15.043 39.7097 14.457C39.1237 13.8709 38.3288 13.5417 37.5 13.5417C36.6712 13.5417 35.8763 13.8709 35.2903 14.457C34.7042 15.043 34.375 15.8379 34.375 16.6667C34.375 17.4955 34.7042 18.2903 35.2903 18.8764C35.8763 19.4624 36.6712 19.7917 37.5 19.7917ZM39.6156 21.8854C40.9688 21.8854 42.0396 22.4938 42.7406 23.4333C43.3958 24.3135 43.6729 25.4021 43.7354 26.4073C43.7966 27.4384 43.6562 28.4716 43.3219 29.449C43.0094 30.3552 42.4813 31.2927 41.6667 31.9354V42.1875C41.6674 42.5801 41.5204 42.9586 41.2548 43.2476C40.9892 43.5367 40.6245 43.7152 40.2332 43.7477C39.842 43.7801 39.4529 43.6641 39.1433 43.4226C38.8337 43.1812 38.6264 42.8321 38.5625 42.4448L37.2188 34.375H36.9083L35.3896 42.475C35.3175 42.8573 35.1053 43.1989 34.7947 43.4331C34.484 43.6673 34.0972 43.7771 33.7098 43.7412C33.3224 43.7052 32.9624 43.5261 32.7001 43.2387C32.4378 42.9514 32.2922 42.5765 32.2917 42.1875V27.326C32.0834 27.6434 31.8778 27.9625 31.675 28.2833L31.5938 28.4115L31.5729 28.4448L31.5677 28.4542C31.4273 28.6796 31.2318 28.8655 30.9996 28.9944C30.7674 29.1232 30.5062 29.1908 30.2406 29.1906H25.0323C24.6179 29.1906 24.2205 29.026 23.9274 28.733C23.6344 28.44 23.4698 28.0425 23.4698 27.6281C23.4698 27.2137 23.6344 26.8163 23.9274 26.5233C24.2205 26.2302 24.6179 26.0656 25.0323 26.0656H29.3833C29.6365 25.674 29.9698 25.1656 30.3198 24.6552C30.6844 24.1229 31.0865 23.5594 31.4448 23.1177C31.6188 22.9021 31.8135 22.6771 32.0094 22.4927C32.1052 22.4021 32.2385 22.2844 32.401 22.1802C32.6878 21.992 33.0226 21.89 33.3656 21.8865H39.6156V21.8854Z"
          fill="rgb(255, 136, 51, 0.8)"
        />
      </svg>
    ),
    title: "No. of Classes",
    value: "12",
    size: 5
  },
];
