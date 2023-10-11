import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import AuthCardWrapper from '../Authentication/AuthCardWrapper';
import Loader from '../../utils/ui-components/Loader';
import AuthUpdateUser from '../Authentication/auth-forms/auth-update-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CourseUpdate from './course-forms/course-update';

interface UpdateCourseProps {
    setOnCloseUpdateCourseModal: any; 
    selectedRowData: any; 
}

function UpdateCourse({ setOnCloseUpdateCourseModal, selectedRowData }: UpdateCourseProps) {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOnCloseUpdateCourseModal(false);
    };

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            maxWidth="sm" 
            fullWidth={true}
            PaperProps={{
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '30vh',
                    minHeight: 'auto',
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                        color={theme.palette.primary.main}
                        variant={matchDownSM ? 'h3' : 'h2'}
                    >
                        Update Course
                    </Typography>
                    <Button style={{
                        position: 'absolute',
                        top: '8px', 
                        right: '8px', 
                        border: 'none', 
                        fontSize: '26px',
                        backgroundColor: 'transparent'
                    }} onClick={handleClose} color="primary" variant="outlined">
                        <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <AuthCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <CourseUpdate selectedRowData={selectedRowData} />
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

export default UpdateCourse;
