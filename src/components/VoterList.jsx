import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import "./VoterList.css";

function DeleteUserActionItem({ deleteUser, ...props }) {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            deleteUser();
                        }}
                        color="warning"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}



export default function VoterList({ isAdmin, initialRows }) {

    const [rows, setRows] = React.useState(initialRows);

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: "id", headerName: "S. No.", flex: 0.4 },
            {
                field: "Name",
                headerName: "Name",
                flex: 1,
                editable: isAdmin
            },
            {
                field: "Designation",
                headerName: "Designation",
                flex: 1,
                editable: isAdmin
            },
            {
                field: "College",
                headerName: "College",
                flex: 1,
                editable: isAdmin
            },
            {
                field: "RNo",
                headerName: "Recipt No.",
                type: "Number",
                flex: 0.6,
                editable: isAdmin
            },
            {
                field: "MembershipCategory",
                headerName: "Membership Category",
                flex: 0.8,
                editable: isAdmin
            },
            {
                field: "VoteStatus",
                headerName: "voted",
                type: "boolean",
                flex: 0.4,
                editable: isAdmin
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <DeleteUserActionItem
                        label="Delete"
                        showInMenu
                        // icon={<DeleteIcon />}
                        deleteUser={deleteUser(params.id)}
                        closeMenuOnClick={false}
                    />,
                ],
                flex: 0.3
            },
        ],
        [deleteUser],
    );

    const columnVisibilityModel = {
        actions: isAdmin ? true : false
    }

    return (
        <Box sx={{ width: "100%" }}>
            <DataGrid
                className="px-3"
                rowHeight={40}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
                getRowClassName={(param) => {
                    return param.row.VoteStatus ? "voted" : "not-voted";
                }}
            />
        </Box>
    );
}
