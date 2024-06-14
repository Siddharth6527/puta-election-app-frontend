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
    function hasVoted() {
        return (localStorage.getItem('hasVoted') == 'true') ? true : false;
    }
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
            {!hasVoted() && !candidatesLoaded && <CircularProgress className='m-3' />}
            {!hasVoted() && candidatesLoaded && <VotingComponent candidates={candidates} />}
            {hasVoted() && (
                <div className='mt-4'>
                    <h3 className='text-center'>You have already voted once!</h3>
                </div>
            )}
        </div>
    );
};

export default Vote;
