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
    function isAdmin() {
        return (localStorage.getItem('role') == 'voter') ? false : true;
    }
    const [candidatesLoaded, setCandidatesLoaded] = useState(false);
    useMemo(() => {
        const fetchData = async () => {
            const data = await fetchCandidatesFromServer();
            // console.log(data);
            setCandidates(data);
        }
        fetchData();
        setCandidatesLoaded(true);
    }, []);

    return (
        <div>
            {!hasVoted() && !isAdmin() && !candidatesLoaded && <CircularProgress className='m-3' />}
            {!hasVoted() && !isAdmin() && candidatesLoaded && <VotingComponent candidates={candidates} />}
            {isAdmin() && (
                <div className='mt-4'>
                    <h3 className='text-center'>Admin Cannot Vote!</h3>
                </div>
            )}
            {hasVoted() && !isAdmin() && (
                <div className='mt-4'>
                    <h3 className='text-center'>You have already voted once!</h3>
                </div>
            )}
        </div>
    );
};

export default Vote;
