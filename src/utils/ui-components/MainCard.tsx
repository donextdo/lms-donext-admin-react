import PropTypes from "prop-types";
import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// constant
const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      great,
      user,
      about,
      height,
      ...others
    }: any,
    ref: any
  ) => {
    const theme: any = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderColor: theme.palette.primary[200],
          borderRadius: 1,
          ":hover": {
            boxShadow: boxShadow
              ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
              : "inherit",
          },
          // Add scrollbar styles here
          "&::-webkit-scrollbar": {
            width: "4px", // You can adjust the width of the scrollbar here
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[100], // Color of the scrollbar thumb
            borderRadius: "8px", // Border radius of the scrollbar thumb
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              darkTitle ? (
                <Typography style={{ fontWeight: "bold" }} variant="h2">
                  {title}
                </Typography>
              ) : (
                title
              )
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            <Grid>
              <Grid container item>
                <Typography
                  variant="h1"
                  sx={{ marginRight: "7px", fontWeight: "normal" }}
                >
                  {great}
                </Typography>
                <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                  {user}
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "10px" }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "normal", color: theme.palette.grey[500] }}
                >
                  {about}
                </Typography>
              </Grid>
            </Grid>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default MainCard;
