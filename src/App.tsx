import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import React from 'react';
import './App.css';
import Routes from './components/Routes';
import themes from "./themes";
import ConfirmDialog from './utils/ui-components/pop-ups/ConfirmDialog';
import ConfirmWithCommentDialog from "./utils/ui-components/pop-ups/ConfirmWithCommentDialog";
import ErrorDialog from './utils/ui-components/pop-ups/ErrorDialog';
import SuccessDialog from './utils/ui-components/pop-ups/SuccessDialog';
import {useSelector} from "react-redux";
import {StyledEngineProvider} from "@mui/material";

function App() {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline/>
                <Routes/>
                <ConfirmDialog/>
                <ConfirmWithCommentDialog/>
                <SuccessDialog/>
                <ErrorDialog/>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
