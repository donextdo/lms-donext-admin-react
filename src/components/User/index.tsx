import React, { useState } from "react";
import MainCard from "../../utils/ui-components/MainCard";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../../utils/cssStyles";
import UserTypeWiseList from "./user-type-wise-list";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { formatMobile, getSalaryRange } from "../../utils/utils";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import CreateNewUser from "./CreateNewUser";
import CreateNewTeacher from "./CreateNewTeacher";
import CreateNewStudent from "./CreateNewStudent";
import CreateNewStaff from "./CreateNewStaff";
function UserCreation() {
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
  const [showAddUser, setShowAddUser] = useState(false);

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };

  const handleAdduser = (id: any) => {
    setShowAddUser(true);
  };

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainCard
      title="Users"
      darkTitle={true}
      secondary={
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Grid item>
                <Button
                  className="mr-1"
                  variant="contained"
                  onClick={handleAdduser}
                  style={{
                    backgroundColor: "#8b0000",
                    color: "white",
                  }}
                >
                  New User +
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    >
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "-20px" }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            marginRight: "68.7rem",
            marginLeft: "2rem",
          }}
        >
          All Users
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

      {showAddUser && <CreateNewUser setShowAddUser={setShowAddUser} />}

      {/* {showAddUser && (
                <CreateNewTeacher setShowAddUser={setShowAddUser} />
            )} */}
    </MainCard>
  );
}

export default UserCreation;

const data = [
  {
    id: 1,
    dateTime: moment
      .utc(new Date("2023-01-22T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
    mobile: formatMobile("0790000000"),
    nic: "98245671457V",
    name: "Ada Lovelace",
    role: "Student",
    username: "AdaLove",
    email: "adalove@gmail.com",
  },
  {
    id: 2,
    dateTime: moment
      .utc(new Date("2023-01-23T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
    mobile: formatMobile("0790000001"),
    nic: "91786257399V",
    name: "Grace Hopper",
    role: "Teacher",
    username: "HopperGrace",
    email: "gracehopper@gmail.com",
  },
  {
    id: 3,
    dateTime: moment
      .utc(new Date("2023-01-24T06:00:30.384Z"))
      .format("YYYY-MM-DD HH:mm:ss a"),
    mobile: formatMobile("0790000002"),
    nic: "20007182527991",
    name: "Margaret Hamilton",
    role: "Administrator",
    username: "Hamilton",
    email: "margarethamilton@gmail.com",
  },
  {
    id: 4,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0790000003"),
    nic: "84567897425V",
    name: "Joan Clarke",
    role: "Manager",
    username: "JoabClarke",
    email: "joanclarke@gmail.com",
  },
  {
    id: 5,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0790000003"),
    nic: "7656765432V",
    name: "Zack Watson",
    role: "Student",
    username: "Zackyy",
    email: "zackwatson@gmail.com",
  },
  {
    id: 6,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0710835286"),
    nic: "9876343714V",
    name: "Kamal Perera",
    role: "Student",
    username: "Kamal123",
    email: "kamal@gmail.com",
  },
  {
    id: 7,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0729387615"),
    nic: "0927241638V",
    name: "Janaka Abeywardene",
    role: "Teacher",
    username: "Jana202",
    email: "jana123@gmail.com",
  },
  {
    id: 8,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0719362437"),
    nic: "7656765432V",
    name: "Nisal Costa",
    role: "Student",
    username: "Nisal",
    email: "nisal@gmail.com",
  },
  {
    id: 9,
    dateTime: moment
      .utc(new Date("2023-01-25T16:00:30.384Z"))
      .format("YYYY-MM-DD hh:mm:ss a"),
    mobile: formatMobile("0713785392"),
    nic: "7162534162V",
    name: "Yasith Silva",
    role: "Stuff",
    username: "Yasith",
    email: "yasith@gmail.com",
  },
];
