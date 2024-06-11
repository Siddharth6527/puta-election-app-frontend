import React, { useState, useMemo } from 'react';
import { fetchCandidatesFromServer } from '../utils/serverFunctions';
import CircularProgress from '@mui/material/CircularProgress';
import VotingComponent from "../components/VotingComponent";

const Vote = () => {
    const [candidates, setCandidates] = useState({
        president: [],
        vicepresident: [],
        generalsecretary: [],
        secretary: [],
        treasurer: [],
    });
    const [candidatesLoaded, setCandidatesLoaded] = useState(false);
    useMemo(() => {
        const fetchData = async () => {
            const data = await fetchCandidatesFromServer();
            console.log(data);
            setCandidates(data);
        }
        fetchData();
        setCandidatesLoaded(true);
    }, []);

    return (
        <div>
            {!candidatesLoaded && <CircularProgress className='m-3' />}
            {candidatesLoaded && <VotingComponent candidates={candidates} />}
        </div>
    );
};

export default Vote;
