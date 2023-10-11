import { Link } from 'react-router-dom';

// material-ui
import {Box, ButtonBase} from '@mui/material';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to="/">
        <Box component="img" alt="" src={require("../../../assets/images/bacola-logo.jpeg")} sx={{height: 40, width: 100}}/>
    </ButtonBase>
);

export default LogoSection;
