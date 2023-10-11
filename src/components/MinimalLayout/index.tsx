import React from "react";
import {Outlet, useLocation} from 'react-router-dom';
import AuthFooter from "../Footer/AuthFooter";
import {styled, useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";

// ==============================|| MINIMAL LAYOUT ||============================== //

const Layout = styled(Box)(({theme}: any) => ({
    ...theme.typography.minimalLayoutContent,
}));
const MinimalLayout = () => {
    const theme = useTheme();
    return (
        <Box>
            <Layout theme={theme}>
                <Outlet/>
            </Layout>
            <AuthFooter/>
        </Box>
    );
};

export default MinimalLayout;
