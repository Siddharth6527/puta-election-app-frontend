import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./VoterList.css";

const columns = [
  { field: "id", headerName: "S. No.", flex: 0.4 },
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "Designation",
    headerName: "Designation",
    flex: 1,
  },
  {
    field: "College",
    headerName: "College",
    flex: 1,
  },
  {
    field: "RNo",
    headerName: "Recipt No.",
    type: "Number",
    flex: 0.6,
  },
  {
    field: "MembershipCategory",
    headerName: "Membership Category",
    flex: 0.8,
  },
  {
    field: "VoteStatus",
    headerName: "voted",
    type: "boolean",
    flex: 0.4,
  },
];

const rows = [
  {
    id: 1,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 2,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 3,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 4,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 5,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 6,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 7,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 8,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 9,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 10,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 11,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 12,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 13,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 14,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 15,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 16,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 17,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: true,
  },
  {
    id: 18,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
  {
    id: 19,
    Name: "Snow",
    Designation: "Jon",
    College: "College of Technology",
    RNo: 142,
    MembershipCategory: "General",
    VoteStatus: false,
  },
];

export default function VoterList() {
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
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
        getRowClassName={(param) => {
          return param.row.VoteStatus ? "voted" : "not-voted";
        }}
      />
    </Box>
  );
}
