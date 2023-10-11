import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import SkeletonIncomeCard from "../../utils/ui-components/cards/skeleton/income-card";
import MainCard from "../../utils/ui-components/MainCard";
import { currencyFormat } from "../../utils/utils";
import { gridSpacing } from "../../store/constants";

const CardWrapper = styled(MainCard)(({ theme, color }: any) => ({
  // backgroundColor: theme.palette[color].dark,
  // color: theme.palette[color].light,
  overflow: "hidden",
  border: "0.5px solid",
  borderColor: theme.palette.grey[500],
  boxShadow: "0px 0px 16px 0px rgba(194, 198, 204, 0.60)",
  borderRadius: "10px",
  // position: 'relative',
  // '&:after': {
  //     content: '""',
  //     position: 'absolute',
  //     width: 210,
  //     height: 210,
  //     background: `linear-gradient(210.04deg, ${theme.palette[color][200]} -50.94%, ${theme.palette[color][800]} 83.49%)`,
  //     borderRadius: '50%',
  //     top: -30,
  //     right: -180
  // },
  // '&:before': {
  //     content: '""',
  //     position: 'absolute',
  //     width: 210,
  //     height: 210,
  //     background: `linear-gradient(140.9deg, ${theme.palette[color][200]} -14.02%, ${theme.palette[color][800]} 77.58%)`,
  //     borderRadius: '50%',
  //     top: -160,
  //     right: -130
  // }
}));

IncomeCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  OptionIcon: PropTypes.node.isRequired,
};

function IncomeCard({
  isLoading,
  icon,
  title,
  value,
  size,
  color,
  OptionIcon,
}: any) {
  const theme: any = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2, height: "190px", width: "451px", display:'flex', alignItems:'center' }}>
            {/* <List sx={{py: 0}}>
                            <ListItem alignItems="center" disableGutters sx={{py: 0}}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette[color][800],
                                            color: '#fff'
                                        }}
                                    >
                                        <Icon fontSize="inherit">{OptionIcon}</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{color: '#fff'}}>
                                            {currencyFormat(count, "", 0)}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{color: 'primary.light', mt: 0.25}}>
                                            {title}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List> */}
            <Grid container>
              <Grid item
                sx={{
                  height: "80px",
                  width: "80px",
                  background: theme.palette.background.headerbg,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {icon}
              </Grid>
              <Grid item sx={{display:'flex',justifyContent:'center' ,alignItems:'center'}} xs={size}>
              {/* <Grid item sx={{display:'flex',justifyContent:'center' ,alignItems:'center'}} xs={size}> */}
                <Grid >
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h1">{value}</Typography>
                </Grid>
              {/* </Grid> */}
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
}

export default IncomeCard;
