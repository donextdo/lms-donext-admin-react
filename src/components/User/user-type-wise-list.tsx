import React, { useState,useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EmptyResult from "../../utils/ui-components/EmptyResult";
import { Box, Button, Grid } from "@mui/material";
import { openConfirmWithCommentDialog } from "../../utils/ui-components/pop-ups/ConfirmWithCommentDialog";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import {useNavigate} from 'react-router-dom';
import * as api from "../../assets/api";
import {openSuccessDialog} from "../../utils/ui-components/pop-ups/SuccessDialog";
import {openErrorDialog} from "../../utils/ui-components/pop-ups/ErrorDialog";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateUser from './UpdateUser';

UserTypeWiseList.propTypes = {
    data: PropTypes.array.isRequired
};

function UserTypeWiseList({ data }: any) {

    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const [cribData, setCribData]: any = useState(data);
    const [rowCountState, setRowCountState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); 
    const [onCloseUpdateUserModal, setOnCloseUpdateUserModal] = useState(false);


    const updateUser = (selectedRow : any) => {
      
        setOnCloseUpdateUserModal(true);
        setSelectedRowData(selectedRow);
    };


    const deleteUser = async (userId: number) => {
        try {
            const response = await api.deleteUser(userId);
            if (response.status === 204) {
                openSuccessDialog(data.status, data.comment);
                navigate("/users");
            } 
        } catch (error) {
            openErrorDialog('User deletion failed!', 'Try again');
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
            field: "name",
            filterable: false,
            headerName: "Name",
            sortable: false,
            disableExport: false,
            minWidth: 200,
            flex: 4,
          },
          {
            field: "role",
            filterable: true,
            headerName: "Role",
            sortable: false,
            disableExport: false,
            minWidth: 150,
            flex: 4,
          },
          {
            field: "username",
            filterable: true,
            headerName: "User Name",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 5,
          },
          {
            field: "email",
            filterable: true,
            headerName: "Email",
            sortable: true,
            disableExport: false,
            minWidth: 250,
            flex: 5,
          },
          {
            field: "mobile",
            filterable: true,
            headerName: "Mobile",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
          },
          {
            field: "nic",
            filterable: true,
            headerName: "NIC",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
          },
          {
            field: "dateTime",
            filterable: false,
            headerName: "Last Login",
            sortable: true,
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
                                onClick={() => updateUser(params.row)}
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
                                `Are you sure you want to delete this user? Please enter 'confirm' to proceed.`,
                                { id: params.formattedValue, action: "delete" },
                                (data, values) => {
                                    if (values.comment === 'Confirm' || values.comment === 'confirm') {
                                    deleteUser(params.row.id);
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
        },
        // {
        //     field: "comment",
        //     filterable: true,
        //     headerName: "Comment",
        //     sortable: true,
        //     disableExport: false,
        //     minWidth: 200,
        //     flex: 4,
        // },
    ];

    return (
        <Box sx={{ minHeight: 400, width: '100%' }}>
            <DataGrid
                autoHeight
                columns={columns}
                columnVisibilityModel={{
                    id: true,
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

            {onCloseUpdateUserModal && (
                <UpdateUser onCloseUpdateUserModal={setOnCloseUpdateUserModal} selectedRowData={selectedRowData} />
            )}
           
        </Box>
    );
}

export default UserTypeWiseList;
