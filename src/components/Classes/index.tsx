import React, { useState } from "react";
import MainCard from "../../utils/ui-components/MainCard";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../../utils/cssStyles";
import UserTypeWiseList from "./class-type-wise-list";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { formatMobile, getSalaryRange } from "../../utils/utils";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import CreateUser from "../../components/Authentication/authentication/createNewUser";
import CreateNewClass from "./CreateNewClass";
function ClassCreation() {
  const options = ["Download PDF", "Download Excel"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAddClass, setshowAddClass] = useState(false);

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };

  const handleAddlass = (id: any) => {
    setshowAddClass(true);
  };

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainCard
      title="Classes"
      darkTitle={true}
      secondary={
        <Grid container justifyContent="flex-end">
          <Grid item >
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Grid item>
                <Button
                  className="mr-1"
                  variant="contained"
                  onClick={handleAddlass}
                  style={{
                    backgroundColor: "#8b0000",
                    color: "white",
                  }}
                >
                  New Class +
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    >
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "-20px", justifyContent:'space-between' }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            marginLeft: "2rem",
          }}
        >
          All Classes
        </Typography>

        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <div style={{ marginTop: "-25px" }}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <UserTypeWiseList data={data} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UserTypeWiseList data={[]} />
          </TabPanel>
        </SwipeableViews>
      </div>

      {showAddClass && <CreateNewClass setshowAddClass={setshowAddClass} />}
    </MainCard>
  );
}

export default ClassCreation;

const data = [
  {
    id: 1,
    classid: "Sc0601",
    subject: "Science",
    grade: "Grade 06",
    medium: "Sinhala",
    instructor: "Saman Perera",
    date: "Wednesday",
    time: "03.30 pm",
    description: "We cover all the subjects matiriel on time",
    startdate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
    enddate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
  },
  {
    id: 2,
    classid: "Mt1001",
    subject: "Maths",
    grade: "Grade 10",
    medium: "English",
    instructor: "Kamal Gunasekara",
    date: "Monday",
    time: "02.30 pm",
    description: "We cover all the subjects matiriel on time",
    startdate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
    enddate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
  },
  {
    id: 3,
    classid: "Si0901",
    subject: "Sinhala",
    grade: "Grade 09",
    medium: "Sinhala",
    instructor: "Anura Silva",
    date: "Saturday",
    time: "08.30 am",
    description: "We cover all the subjects matiriel on time",
    startdate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
    enddate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
  },
  {
    id: 4,
    classid: "En0701",
    subject: "English",
    grade: "Grade 07",
    medium: "English",
    instructor: "Kasun Chamara",
    date: "Friday",
    time: "05.30 pm",
    description: "We cover all the subjects matiriel on time",
    startdate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
    enddate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
  },
  {
    id: 5,
    classid: "Hs1101",
    subject: "History",
    grade: "Grade 11",
    medium: "Sinhala",
    instructor: "Saliya Wickramasinghe",
    date: "Sunday",
    time: "09.00 am",
    description: "We cover all the subjects matiriel on time",
    startdate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
    enddate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD"),
  },
];
