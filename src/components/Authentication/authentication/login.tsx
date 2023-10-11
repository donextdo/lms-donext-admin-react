import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {useTheme} from '@mui/material/styles';
import {Divider, Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import AuthCardWrapper from "../AuthCardWrapper";
import Loader from "../../../utils/ui-components/Loader";
import AuthLogin from "../auth-forms/auth-login";
import {Link} from "react-router-dom";
import {getSate, loginRequest} from "../../../redux/actions/actions";

function Login(props: any) {

    const {
        loginRequest, // remember, Redux Form injects this into our props
        login,
        rememberMe
    } = props;

    const theme = useTheme();
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        // dispatch({type: LOGOUT_REQUIRED});
    }, []);

    return (
        <Grid className="container">
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <AuthCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item container spacing={2} sx={{mb: 3}} alignItems="center" justifyContent="center">
                            <Grid item>
                                <img
                                    height="120"
                                    width="250"
                                    src={require("../../../assets/images/bacola-logo.jpeg")}
                                    alt="logo"/>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                alignItems="center"
                                justifyContent="center">
                                <Grid item>
                                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                                        <Typography
                                            fontWeight="bold"
                                            color={theme.palette.primary.main}
                                            gutterBottom
                                            variant={matchDownSM ? 'h3' : 'h2'}
                                        >
                                            Hi, Welcome Back
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            fontSize="16px"
                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                        >
                                            Enter your credentials to continue
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <AuthLogin rememberMe={getSate(rememberMe)} loginRequest={loginRequest} dispatch={dispatch} theme={theme}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                                <Typography
                                    component={Link}
                                    to="/signup"
                                    variant="subtitle1"
                                    sx={{textDecoration: 'none'}}
                                >
                                    Don't have an account?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </AuthCardWrapper>
            </Grid>
            {login?.requesting && <Loader/>}
        </Grid>
    );
}

const mapStateToProps = (state: any) => ({
    login: state.auth,
    rememberMe: state.rememberMe?.rememberMeData
})

export default connect(mapStateToProps, {loginRequest})(Login)
