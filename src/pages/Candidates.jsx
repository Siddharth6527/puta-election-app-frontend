import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCandidatesFromServer, resetVotes } from "../utils/serverFunctions";
import CandidateList from "../components/CandidateList";
import AddCandidate from "../components/AddCandidate";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import SnackBarComponent from '../components/SnackBarComponent';
import { useNavigate } from "react-router-dom";
import './Candidate.css'

export default function Candidates() {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleReset = () => {
        setDialogOpen(true);
    }
    const navigate = useNavigate();
    const onConfirm = async () => {
        const response = await resetVotes();
        const responseData = await response.json();
        if (response.ok) {
            console.log("Successfully reset all votes")
            setSnackBarMessage('Succesfully reset all votes!');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } else {
            setSnackBarMessage(responseData.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            console.log("error in reset votes");
        }
        setDialogOpen(false);
        setTimeout(() => navigate(0), 600);
    }

    const [results, setResults] = useState({
        president: [],
        vicepresident: [],
        generalsecretary: [],
        secretary: [],
        treasurer: [],
    });

    useEffect(() => {
        async function fetchData() {
            const data = await fetchCandidatesFromServer();
            const convertedData = convertData(data);
            setResults(convertedData);
        }
        fetchData();
    }, [])

    const convertData = (data) => {
        let newData = data;
        for (let key in data) {
            newData = {
                ...newData,
                [key]: data[key].map((candidate, i) => {
                    return {
                        id: i + 1,
                        Name: candidate.name,
                        College: candidate.college,
                        VoteCount: candidate.voteCount,
                        _id: candidate._id
                    }
                })
            }
        }
        return newData;
    }

    return (
        <>
            <p className="text-center heading">List of all Candidate</p>
            <p className="text-center text-muted">
                (You are an admin. You can add, edit and delete any candidate. )
            </p>
            <AddCandidate />
            <DeleteConfirmationDialog
                open={dialogOpen}
                onClose={handleClose}
                onConfirm={onConfirm}
            />
            <button className="btn btn-danger m-1" onClick={handleReset}>Reset all votes</button>
            {results.president.length > 0 && (
                <div className="lists">
                    <div className="list">
                        <h2 className="heading">President</h2>
                        <CandidateList initialRows={results.president} position={"president"} />
                    </div>
{/*                     <div className="list">
                        <h2 className="heading">Vice President</h2>
                        <CandidateList initialRows={results.vicepresident} position={"vicePresident"} />
                    </div>
                    <div className="list">
                        <h2 className="heading">General Secretary</h2>
                        <CandidateList initialRows={results.generalsecretary} position={"generalSecretary"} />
                    </div>
                    <div className="list">
                        <h2 className="heading">Secretary</h2>
                        <CandidateList initialRows={results.secretary} position={"secretary"} />
                    </div> */}
{/*                     <div className="list">
                        <h2 className="heading">Treasurer</h2>
                        <CandidateList initialRows={results.treasurer} position={"treasurer"} />
                    </div> */}
                </div>
            )}
            <div>
                {results.president.length == 0 && <CircularProgress className="m-3" />}
            </div>
            <SnackBarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                severity={snackBarSeverity}
                onClose={handleSnackBarClose}
            />
        </>
    )
}
