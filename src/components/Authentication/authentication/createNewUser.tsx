import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import AuthCardWrapper from '../AuthCardWrapper';
import Loader from '../../../utils/ui-components/Loader';
import AuthUserCreation from '../auth-forms/auth-user-creation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function CreateNewUser({ setShowAddUser }: any) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShowAddUser(false);
    };

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            maxWidth="sm"  // Adjust the maxWidth as needed
            fullWidth={true}
            PaperProps={{
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '30vh',
                    minHeight: '80vh',
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                        color={theme.palette.primary.main}
                        variant={matchDownSM ? 'h3' : 'h2'}
                    >
                        Create A New User
                    </Typography>
                    <Button style={{
                        position: 'absolute',
                        top: '8px', 
                        right: '8px',  
                        border: 'none', 
                        fontSize: '26px',
                        backgroundColor: 'transparent',
                    }} onClick={handleClose} color="primary" variant="outlined">
                        <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <AuthCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <AuthUserCreation />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </AuthCardWrapper>
            </DialogContent>
            {loading && <Loader />}
        </Dialog>
    );
}

export default CreateNewUser;
