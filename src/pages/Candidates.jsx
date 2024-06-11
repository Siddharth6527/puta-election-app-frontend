import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCandidatesFromServer } from "../utils/serverFunctions";
import CandidateList from "../components/CandidateList";
import AddCandidate from "../components/AddCandidate";
import './Candidate.css'

export default function Candidates() {

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
            {results.president.length > 0 && (
                <div className="lists">
                    <div className="list">
                        <h2 className="heading">President</h2>
                        <CandidateList initialRows={results.president} position={"president"} />
                    </div>
                    <div className="list">
                        <h2 className="heading">Vice President</h2>
                        <CandidateList initialRows={results.vicepresident} position={"vicePresident"} />
                    </div>
                    <div className="list">
                        <h2 className="heading">General Secretary</h2>
                        <CandidateList initialRows={results.generalsecretary} position={"generalSecretary"} />
                    </div>
                </div>
            )}
            <div>
                {results.president.length == 0 && <CircularProgress className="m-3" />}
            </div>
        </>
    )
}
