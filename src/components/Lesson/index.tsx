import React, { useState } from "react";
import MainCard from "../../utils/ui-components/MainCard";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../../utils/cssStyles";
import UserTypeWiseList from "../Classes/class-type-wise-list";
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
import CreateNewClass from "../Classes/CreateNewClass";
import LessonTypeWiseList from "./lesson-type-wise-list";
function LessonCreation() {
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
      title="Lesson Details"
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
                  New Lesson +
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
          All Lessons
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
            <LessonTypeWiseList data={data} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <LessonTypeWiseList data={[]} />
          </TabPanel>
        </SwipeableViews>
      </div>

      {showAddClass && <CreateNewClass setshowAddClass={setshowAddClass} />}
    </MainCard>
  );
}

export default LessonCreation;

const data = [
    {
      id: 1,
      lname: "Science",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
      course: "Science",
        class: "6",
      teacher:"Lakmali Perera",
        videoContent: "available",
    },
    {
      id: 2,
      lname: "Mathematics",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
      course: "Science",
        class: "6",
      teacher:"Suneth Silva",
        videoContent: "available",
    },
    {
      id: 3,
      lname: "ICT",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
      course: "Science",
        class: "8",
      teacher:"Lakmali Perera",
        videoContent: "not available",
    },
    {
      id: 4,
      lname: "Physics",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
      course: "Science",
        class: "2",
      teacher:"Darshana Perera",
        videoContent: "available",
    },
    {
      id: 5,
      lname: "Chemistry",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
      course: "Science",
        class: "2",
      teacher:"Lakmali Perera",
        videoContent: "available",
    },
  ];
  
