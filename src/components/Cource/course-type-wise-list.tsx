import React, { useState,useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EmptyResult from "../../utils/ui-components/EmptyResult";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { openConfirmWithCommentDialog } from "../../utils/ui-components/pop-ups/ConfirmWithCommentDialog";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import {useNavigate} from 'react-router-dom';
import UpdateUser from '../../components/Authentication/authentication/updateUser '
import * as api from "../../assets/api";
import {openSuccessDialog} from "../../utils/ui-components/pop-ups/SuccessDialog";
import {openErrorDialog} from "../../utils/ui-components/pop-ups/ErrorDialog";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateCourse from './updateCourse';

CourseTypeWiseList.propTypes = {
    data: PropTypes.array.isRequired
};

function CourseTypeWiseList({ data }: any) {

    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const [cribData, setCribData]: any = useState(data);
    const [rowCountState, setRowCountState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); 
    const [onCloseUpdateCourseModal, setOnCloseUpdateCourseModal] = useState(false);


    const updateCourse = (selectedRow : any) => {
        alert('Row data : ' + JSON.stringify(selectedRow))
        setOnCloseUpdateCourseModal(true);
        setSelectedRowData(selectedRow);
    };


    const deleteCourse = async (userId: number) => {
        try {
            const response = await api.deleteUser(userId);
            if (response.status === 204) {
                openSuccessDialog(data.status, data.comment);
                navigate("/courses");
            } 
        } catch (error) {
            openErrorDialog('Course deletion failed!', 'Try again');
        }
    };
    

    const columns = [
        {
            field: "id",
            filterable: false,
            headerName: "ID",
            sortable: false,
            disableExport: false,
        },
        {
            field: "cname",
            filterable: true,
            headerName: "Course Name",
            sortable: true,
            disableExport: false,
            minWidth: 200,
            flex: 4,
        },
        {
            field: "description",
            filterable: false,
            headerName: "Description",
            sortable: true,
            disableExport: false,
            minWidth: 200,
            flex: 5,
        },
        {
            field: "totclasses",
            filterable: true,
            headerName: "Total Classes",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "isOpen",
            filterable: true,
            headerName: "IsOpen",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
            // valueGetter: (params: { row: { isOpen: any; }; }) => (params.row.isOpen ? "Open" : "Close"),
        },
        {
            field: "CreatedDate",
            filterable: true,
            headerName: "Created Date",
            sortable: false,
            disableExport: false,
            minWidth: 200,
            flex: 4,
        },
        
        {
            field: "actions",
            filterable: false,
            headerName: "Actions",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <Grid container spacing={1}>
                        <Grid item>
                        <IconButton
                                aria-label="edit"
                                size="large"
                                color="info"
                                onClick={() => updateCourse(params.row)}
                                >
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() =>
                                openConfirmWithCommentDialog(
                                "Delete Confirmation",
                                `Are you sure you want to delete this course? Please enter 'confirm' to proceed.`,
                                { id: params.formattedValue, action: "delete" },
                                (data, values) => {
                                    if (values.comment === 'Confirm' || values.comment === 'confirm') {
                                    deleteCourse(params.row.id);
                                    }
                                }
                                )
                            }
                            >
                            <DeleteIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                );
            },
            disableExport: true,
            minWidth: 200,
        }
    ];

    return (
        <Box sx={{ minHeight: 400, width: '100%' }}>
            <DataGrid
                autoHeight
                columns={columns}
                columnVisibilityModel={{
                    id: false,
                }}
                loading={isLoading}
                rows={cribData}
                slots={{
                    toolbar: GridToolbar,
                    noRowsOverlay: EmptyResult,
                    loadingOverlay: LinearProgress,
                }}
                slotProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                        showQuickFilter: false,
                        quickFilterProps: { debounceMs: 250 },
                    },
                }}
                pagination
                paginationMode="server"
                rowCount={rowCountState}
                pageSizeOptions={[5, 10, 25, 100]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />

            {onCloseUpdateCourseModal && (
                <UpdateCourse setOnCloseUpdateCourseModal={setOnCloseUpdateCourseModal} selectedRowData={selectedRowData} />
            )}
           
        </Box>
    );
}

export default CourseTypeWiseList;
