import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {AppBar, Box, CssBaseline, Stack, Toolbar, useMediaQuery} from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from "./SideBar";
import {drawerWidth} from '../../store/constants';
import {SET_MENU} from "../../redux/actions/actions";
import AuthFooter from "../Footer/AuthFooter";

// styles
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }
        ),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
    })
}));

const Layout = styled(Box)(({theme, open}) => ({
    ...theme.typography.mainLayoutContent,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: 10,
        },
    }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({type: SET_MENU, opened: !leftDrawerOpened});
    };

    useEffect(() => {
        dispatch({type: SET_MENU, opened: !matchDownMd});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <>
            <Box sx={{display: 'flex'}}>
            <CssBaseline/>
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: '#F6F8FA',
                        transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                        marginLeft:'1rem'
                    }}
                    style={{height : "4rem"}}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle}/>

                {/* main content */}
                <Main theme={theme} open={leftDrawerOpened}>
                    <Layout theme={theme} open={leftDrawerOpened}>
                        <Outlet/>
                    </Layout>
                    <AuthFooter/>
                </Main>
            </Box>
        </>
    );
};

export default MainLayout;
