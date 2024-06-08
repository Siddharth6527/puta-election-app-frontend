import "./VoterList.css";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
    GridRowModes,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import SnackBarComponent from './SnackBarComponent';
import { convertToServerObject, deleteDataFromServer, updateDataInServer } from "../utils/serverFunctions";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function VoterList({ isAdmin, initialRows }) {

    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    React.useEffect(() => {
        setRows(initialRows);
    })

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [id, setId] = useState();

    const handleDeleteClick = (id) => async () => {
        setDialogOpen(true);
        setId(id);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };

    const onConfirm = async () => {
        const row = rows.find(row => row.id == id);
        const objectId = row ? row._id : undefined;
        const response = await deleteDataFromServer(objectId);

        if (response.ok) {
            console.log("Successfully deleted data")
            setSnackBarMessage('Succesfully deleted record!');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } else {
            setSnackBarMessage(`Failed to delete record`);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            console.log("error in deleting data");
        }
        setTimeout(() => navigate(0), 500);
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        const data = convertToServerObject(updatedRow);
        const response = await updateDataInServer(data);
        if (response.ok) {
            console.log("Successfully updated data")
            setSnackBarMessage('Succesfully updated data!');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } else {
            setSnackBarMessage(`Failed to update data`);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            console.log("error in adding data to server");
        }
        setTimeout(() => navigate(0), 1000);
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: "id",
            headerName: "S.No.",
            width: 80,
            flex: 1,
        },
        {
            field: "Name",
            headerName: "Name",
            editable: isAdmin,
            minWidth: 180,
            flex: 1,
        },
        {
            field: "Designation",
            headerName: "Designation",
            editable: isAdmin,
            minWidth: 180,
            flex: 1,
        },
        {
            field: "College",
            headerName: "College",
            editable: isAdmin,
            minWidth: 220,
            flex: 1,
        },
        {
            field: "RNo",
            headerName: "Recipt No.",
            type: "Number",
            editable: isAdmin,
            minWidth: 120,
            flex: 1,
        },
        {
            field: "MembershipCategory",
            headerName: "Membership Category",
            editable: isAdmin,
            minWidth: 120,
            flex: 1,
        },
        {
            field: "VoteStatus",
            headerName: "voted",
            type: "boolean",
            editable: isAdmin,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const columnVisibilityModel = {
        actions: isAdmin ? true : false
    }
    const pageSize = Math.min(15, initialRows.length);
    return (
        <Box
            margin='0 auto'
            sx={{
                textAlign: 'center',
                width: "100%",
                overflowX: 'auto',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },

            }}>
            <DataGrid
                sx={{ width: '100%', minHeight: 'max-content' }}
                className="px-3"
                rowHeight={40}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                pageSizeOptions={[pageSize]}
                disableRowSelectionOnClick
                getRowClassName={(param) => {
                    return param.row.VoteStatus ? "voted" : "not-voted";
                }}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                disableColumnMenu
            />
            <DeleteConfirmationDialog
                open={dialogOpen}
                onClose={handleClose}
                onConfirm={onConfirm}
            />
            <SnackBarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                severity={snackBarSeverity}
                onClose={handleSnackBarClose}
            />
        </Box>
    );
}
