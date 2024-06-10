import VoterList from "../components/VoterList"
import { useEffect, useState } from "react";
import AddVoter from "../components/AddVoter";
import "./Voter.css"
import CircularProgress from '@mui/material/CircularProgress';
import { fetchVotersFromServer } from "../utils/serverFunctions";

export default function Voters({ isAdmin }) {

    const [initialRows, setInitialRows] = useState([]);

    useEffect(() => {
        async function display() {
            const data = await fetchVotersFromServer();
            setInitialRows(data.map((voter, i) => {
                return {
                    id: i + 1,
                    Name: voter.name,
                    Designation: voter.designation,
                    College: voter.college,
                    RNo: voter.receiptNo,
                    MembershipCategory: voter.memebershipCategory,
                    VoteStatus: voter.voted,
                    email: voter.email,
                    password: voter.password,
                    _id: voter._id
                }
            }))
        }
        display();
    }, [])

    return (
        <>
            <p className="text-center heading">List of all voters</p>
            {isAdmin &&
                <p className="text-center text-muted">
                    (You are an admin. You can add, edit and delete any voter. )
                </p>
            }
            {isAdmin && <AddVoter SNo={initialRows.length + 1} />}

            <div className="container list mt-3">
                {initialRows.length == 0 && <CircularProgress className="m-3" />}
                {initialRows.length > 0 && <VoterList className='voterList' isAdmin={isAdmin} initialRows={initialRows} />}
            </div>
        </>
    )
}
