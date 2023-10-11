import React from "react";
import PropTypes from "prop-types";
import SkeletonVerificationCard from "../../utils/ui-components/cards/skeleton/verification-card";
import MainCard from "../../utils/ui-components/MainCard";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { currencyFormat } from "../../utils/utils";
import { gridSpacing } from "../../store/constants";

const CardWrapper = styled(MainCard)(({ theme, color }: any) => ({
  backgroundColor: theme.palette.background.backgroundDefault,
  border: '2px solid ',
  borderColor: theme.palette.orange[800],
  borderLeftWidth: '3px',
  borderRightWidth: '3px', 
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  // '&:after': {
  //     content: '""',
  //     position: 'absolute',
  //     width: 210,
  //     height: 210,
  //     background: theme.palette.background.headerbg,
  //     borderRadius: '50%',
  //     top: -85,
  //     right: -95,
  //     [theme.breakpoints.down('sm')]: {
  //         top: -105,
  //         right: -140
  //     }
  // },
  // '&:before': {
  //     content: '""',
  //     position: 'absolute',
  //     width: 210,
  //     height: 210,
  //     background: "transparent",
  //     borderRadius: '50%',
  //     top: -125,
  //     right: -15,
  //     opacity: 0.5,
  //     [theme.breakpoints.down('sm')]: {
  //         top: -155,
  //         right: -70
  //     }
  // }
}));

VerificationCard.propTypes = {
  grade: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  // color: PropTypes.string.isRequired
};

function VerificationCard({
  grade,
  subject,
  location,
  time,
  session,
  isLoading,
  title,
}: any) {
  const theme: any = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonVerificationCard />
      ) : (
        <CardWrapper border={false}>
          <Grid container spacing={gridSpacing}>
            <Grid container item>
              <Grid item xs={10}>
                <Typography variant="h2">
                  {grade} {subject} - {location}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={1} sx={{ alignItems: "center" }}>
                  <Grid item>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                    >
                      <path
                        d="M10.7498 3.72876C6.46504 3.72876 2.97913 7.21479 2.97913 11.4995C2.97913 15.7842 6.46515 19.2702 10.7498 19.2702C15.0345 19.2702 18.5206 15.7842 18.5206 11.4995C18.5206 7.21479 15.0345 3.72876 10.7498 3.72876ZM10.7498 17.7468C7.30515 17.7468 4.50247 14.9444 4.50247 11.4995C4.50247 8.05459 7.30495 5.25211 10.7498 5.25211C14.1947 5.25211 16.9972 8.05459 16.9972 11.4995C16.9972 14.9444 14.1947 17.7468 10.7498 17.7468Z"
                        fill="#FE3F49"
                      />
                      <path
                        d="M14.0262 11.3686H11.5119V8.18399C11.5119 7.76327 11.1709 7.42212 10.75 7.42212C10.3293 7.42212 9.98816 7.76311 9.98816 8.18399V12.1303C9.98816 12.551 10.3292 12.8921 10.75 12.8921H14.0262C14.4469 12.8921 14.7881 12.5511 14.7881 12.1303C14.7881 11.7095 14.4471 11.3686 14.0262 11.3686V11.3686Z"
                        fill="#FE3F49"
                      />
                    </svg>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {time}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Typography variant="h3" sx={{ fontWeight: "normal" }}>
                {session} - {title}
              </Typography>
            </Grid>
          </Grid>
        </CardWrapper>
      )}
    </>
  );
}

export default VerificationCard;
