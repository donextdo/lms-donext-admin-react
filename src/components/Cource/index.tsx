import React, { useState } from "react";
import MainCard from "../../utils/ui-components/MainCard";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../../utils/cssStyles";
import CourseTypeWiseList from "./course-type-wise-list";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { formatMobile, getSalaryRange } from "../../utils/utils";
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import CreateUser from "../../components/Authentication/authentication/createNewUser";
import CreateNewCourse from "./createNewCourse";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function CourceCreation() {
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
  const [showAddCourse, setShowAddCourse] = useState(false);

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };

  const handleAddCourse = (id: any) => {
    setShowAddCourse(true);
  };

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainCard
      title="Course Details"
      darkTitle={true}
      secondary={
        <Grid container justifyContent="flex-end" >
          <Grid item >
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Grid item>
                <Button
                  className="mr-1"
                  variant="contained"
                  onClick={handleAddCourse}
                  style={{
                    backgroundColor: "#8b0000",
                    color: "white",
                  }}
                >
                  New Cource +
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
          All Courses
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

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CourseTypeWiseList data={data} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* <UserTypeWiseList data={[]}/> */}
        </TabPanel>
      </SwipeableViews>

      {showAddCourse && <CreateNewCourse setShowAddCourse={setShowAddCourse} />}
    </MainCard>
  );
}

export default CourceCreation;

const data = [
  {
    id: 1,
    cname: "Science",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
    totclasses: "6",
    isOpen: "open",
    CreatedDate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
  },
  {
    id: 2,
    cname: "Mathematics",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
    totclasses: "6",
    isOpen: "open",
    CreatedDate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
  },
  {
    id: 3,
    cname: "ICT",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
    totclasses: "8",
    isOpen: "close",
    CreatedDate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
  },
  {
    id: 4,
    cname: "Physics",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
    totclasses: "2",
    isOpen: "open",
    CreatedDate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
  },
  {
    id: 5,
    cname: "Chemistry",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minus perferendis nesciunt! Eveniet eligendi omnis architecto iure, temporibus corrupti, a exercitationem debitis sunt aspernatur aperiam esse corporis, quam mollitia commodi!",
    totclasses: "2",
    isOpen: "open",
    CreatedDate: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
  },
];
