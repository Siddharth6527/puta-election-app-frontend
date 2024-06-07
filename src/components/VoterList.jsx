import "./VoterList.css";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
    GridRowModes,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function VoterList({ isAdmin, initialRows }) {

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

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

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

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
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
                            pageSize: 15,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                pageSizeOptions={[15]}
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
        </Box>
    );
}
