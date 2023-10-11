import React, { useState,useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EmptyResult from "../../utils/ui-components/EmptyResult";
import { Box, Button, Grid } from "@mui/material";
import { openConfirmWithCommentDialog } from "../../utils/ui-components/pop-ups/ConfirmWithCommentDialog";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import {useNavigate} from 'react-router-dom';
import UpdateUser from '../../components/Authentication/authentication/updateUser '
import * as api from "../../assets/api";
import {openSuccessDialog} from "../../utils/ui-components/pop-ups/SuccessDialog";
import {openErrorDialog} from "../../utils/ui-components/pop-ups/ErrorDialog";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateClass from './UpdateClass';

ClassTypeWiseList.propTypes = {
    data: PropTypes.array.isRequired
};

function ClassTypeWiseList({ data }: any) {

    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const [cribData, setCribData]: any = useState(data);
    const [rowCountState, setRowCountState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); 
    const [onCloseUpdateClassModal, setOnCloseUpdateClassModal] = useState(false);


    const updateClass = (selectedRow : any) => {
      
        setOnCloseUpdateClassModal(true);
        setSelectedRowData(selectedRow);
    };


    const deleteClass = async (classid: number) => {
        try {
            const response = await api.deleteUser(classid);
            if (response.status === 204) {
                openSuccessDialog(data.status, data.comment);
                navigate("/classes");
            } 
        } catch (error) {
            openErrorDialog('Class deletion failed!', 'Try again');
        }
    };
    

    const columns = [
        // {
        //     field: "id",
        //     filterable: false,
        //     headerName: "ID",
        //     sortable: false,
        //     disableExport: false,
        //   },
          {
            field: "classid",
            filterable: true,
            headerName: "Class ID",
            sortable: true,
            disableExport: true,
            minWidth: 100,
            flex: 4,
          },
          {
            field: "subject",
            filterable: true,
            headerName: "Subject",
            sortable: true,
            disableExport: false,
            minWidth: 100,
            flex: 4,
          },
          {
            field: "grade",
            filterable: true,
            headerName: "Grade",
            sortable: true,
            disableExport: false,
            minWidth: 100,
            flex: 5,
          },
          {
            field: "medium",
            filterable: false,
            headerName: "Medium",
            sortable: false,
            disableExport: false,
            minWidth: 100,
            flex: 5,
          },
          {
            field: "instructor",
            filterable: true,
            headerName: "Instructor Name",
            sortable: true,
            disableExport: false,
            minWidth: 200,
            flex: 5,
          },
          {
            field: "date",
            filterable: true,
            headerName: "Class Date",
            sortable: true,
            disableExport: false,
            minWidth: 100,
            flex: 3,
          },
          {
            field: "time",
            filterable: true,
            headerName: "Class Time",
            sortable: true,
            disableExport: false,
            minWidth: 100,
            flex: 3,
          },
          // {
          //   field: "duration",
          //   filterable: true,
          //   headerName: "Class Duration",
          //   sortable: true,
          //   disableExport: false,
          //   minWidth: 100,
          //   flex: 3,
          // },
          {
            field: "description",
            filterable: false,
            headerName: "Class Description",
            sortable: false,
            disableExport: false,
            minWidth: 250,
            flex: 3,
          },
          {
            field: "startdate",
            filterable: false,
            headerName: "Starting Date",
            sortable: true,
            disableExport: false,
            minWidth: 100,
            flex: 4,
          },
          {
              field: "enddate",
              filterable: false,
              headerName: "Ending Date",
              sortable: false,
              disableExport: false,
              minWidth: 100,
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
                                onClick={() => updateClass(params.row)}
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
                                    deleteClass(params.row.id);
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

            {onCloseUpdateClassModal && (
                <UpdateClass setOnCloseUpdateClassModal={setOnCloseUpdateClassModal} selectedRowData={selectedRowData} />
            )}
           
        </Box>
    );
}

export default ClassTypeWiseList;
