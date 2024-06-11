import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCandidatesFromServer } from "../utils/serverFunctions";
import ResultTable from "../components/ResultTable";
import CandidateList from "../components/CandidateList";

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

    const myStyle = {
        marginBottom: 60,
    };
    function show() {
        console.log(results);
    }

    return (
        <>
            <p className="text-center heading">List of all Candidate</p>
            <button onClick={show}>show</button>
            <p className="text-center text-muted">
                (You are an admin. You can add, edit and delete any candidate. )
            </p>

            {results.president.length > 0 && (
                <div>
                    <CandidateList initialRows={results.president} />
                    <CandidateList initialRows={results.vicepresident} />
                    <CandidateList initialRows={results.generalsecretary} />
                </div>
            )}
            {results.president.length == 0 && <CircularProgress className="m-3" />}
        </>
    )
}
