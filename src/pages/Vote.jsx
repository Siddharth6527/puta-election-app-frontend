import React, { useState, useMemo, useEffect } from 'react';
import { fetchCandidatesFromServer, getVotingVisibility, toggleVotingVisiblity } from '../utils/serverFunctions';
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

    const [isLoading, setIsLoading] = useState(false);
    const [votingStatus, setVotingStatus] = useState();
    useEffect(() => {
        async function fetchValues() {
            setIsLoading(true);
            const visibility = await getVotingVisibility();
            // console.log("voting status changed to: ", visibility);
            setVotingStatus(visibility);
            setIsLoading(false);
        }
        fetchValues();
    }, [votingStatus])

    async function updateVotingStatus(e) {
        setIsLoading(true);
        await toggleVotingVisiblity(e.target.checked);
        const visibility = await getVotingVisibility();
        // console.log("after toggle: ", visibility)
        setVotingStatus(visibility);
        setIsLoading(false);
    }

    return (
        <div>
            {isAdmin() && (
                <div>
                    <div className="d-flex justify-content-center mt-3 mb-5">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input fw-semibold fs-3"
                                type="checkbox"
                                role="switch"
                                id="Switch"
                                onChange={updateVotingStatus}
                                checked={votingStatus}
                            />
                            <label className="form-check-label fw-semibold fs-3" htmlFor="Switch">
                                {votingStatus ? "Stop Voting Phase" : "Start Voting Phase"}
                            </label>
                        </div>
                    </div>
                    <p className='mt-2 mb-5 text-center'>{votingStatus ? "(Voting is currently enabled for users.)" : "(Voting is currently disabled for the users.)"}</p>
                </div>
            )}
            {isAdmin() && isLoading && (<CircularProgress />)}
            {!hasVoted() && !isAdmin() && !candidatesLoaded && <CircularProgress className='m-3' />}
            {!hasVoted() && !isAdmin() && votingStatus && candidatesLoaded && <VotingComponent candidates={candidates} />}
            {isAdmin() && (
                <div className='mt-4'>
                    <h3 className='text-center'>Admin Cannot Vote!</h3>
                </div>
            )}
            {!votingStatus && !isAdmin() && (
                <div className='mt-4'>
                    <h3 className='text-center'>Voting has been disabled by the admin</h3>
                </div>
            )}
            {hasVoted() && !isAdmin() && votingStatus && (
                <div className='mt-4'>
                    <h3 className='text-center'>You have already voted once!</h3>
                </div>
            )}
        </div>
    );
};

export default Vote;
