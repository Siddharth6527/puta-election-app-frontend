import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addVoteInServer } from '../utils/serverFunctions';
import SnackBarComponent from './SnackBarComponent';
import { useNavigate } from 'react-router-dom';

const VotingComponent = ({ candidates }) => {
    const [votes, setVotes] = useState({
        president: '',
        vicePresident: '',
        generalSecretary: '',
        secretary: '',
        treasurer: '',
        // executiveMembers: []
    });
    const [voteID, setVotesID] = useState({
        president: '',
        vicePresident: '',
        generalSecretary: '',
        secretary: '',
        treasurer: '',
        // executiveMembers: []
    });

    const [open, setOpen] = useState(null);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    // const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handlePreviewEnable();
    }, [votes]);

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    // const navigate = useNavigate();

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    const handleClickOpen = (position) => {
        setOpen(position);
    };

    const handleClose = () => {
        setOpen(null);
        handlePreviewEnable();
    };

    const handleCloseWithoutSubmit = (position) => {
        setOpen(null);
        setVotes({ ...votes, [position]: '' });
        setVotesID({ ...votes, [position]: '' });
        handlePreviewEnable();
    };

    const handlePreviewClose = () => {
        setOpen(null);
    }

    const handleVoteChange = (position, value) => {
        const [name, id] = value.split('-');
        setVotes({ ...votes, [position]: name });
        setVotesID({ ...voteID, [position]: id });
    };

    const handlePreviewEnable = () => {
        const allFilled = Object.values(votes).every(vote => (vote !== ''));
        setPreviewEnabled(allFilled);
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const voterId = localStorage.getItem('id');
            for (let key in votes) {
                if (voteID.hasOwnProperty(key)) {
                    await addVoteInServer(key, voteID[key], voterId);
                }
            }

            setSnackBarMessage('Voted Successfully!');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } catch (err) {
            console.log("error", err);
            setSnackBarMessage('Failed to cast vote');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
        }
        setIsLoading(false);
        navigate('/results')
        setTimeout(() => navigate(0), 1000);

    };

    return (
        <div className="vote-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '50px' }}>
            <div className='mb-3'>
                <Button variant="contained" onClick={() => handleClickOpen('president')}>Vote for President</Button>
                {votes.president !== null && votes.president !== '' && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div>
            <div className='mb-3'>
                <Button variant="contained" onClick={() => handleClickOpen('vicePresident')}>Vote for Vice President</Button>
                {votes.vicePresident !== null && votes.vicePresident !== '' && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div>
            <div className='mb-4'>
                <Button variant="contained" onClick={() => handleClickOpen('generalSecretary')}>Vote for General Secretary</Button>
                {votes.generalSecretary !== null && votes.generalSecretary !== '' && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div>
            <div className='mb-4'>
                <Button variant="contained" onClick={() => handleClickOpen('secretary')}>Vote for Secretary</Button>
                {votes.secretary !== null && votes.secretary !== '' && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div>
            <div className='mb-4'>
                <Button variant="contained" onClick={() => handleClickOpen('treasurer')}>Vote for treasurer</Button>
                {votes.treasurer !== null && votes.treasurer !== '' && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div>
            {/* <div className="mb-4">
                <Button variant="contained" onClick={() => handleClickOpen('preview')} disabled={!previewEnabled}>Preview</Button>
                {submitEnabled && <CheckCircleIcon sx={{ color: 'green', marginLeft: '10px' }} />}
            </div> */}
            {/* <Button variant="contained" onClick={handleSubmit} disabled={!submitEnabled}>Submit</Button> */}
            <Button variant="contained" onClick={() => handleClickOpen('preview')} disabled={!previewEnabled}>Preview and Submit</Button>

            <Dialog open={open === 'president'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for President</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>President</InputLabel>
                        <Select
                            value={votes.president}
                            onChange={(e) => handleVoteChange('president', e.target.value)}
                            size='small'
                        >
                            {candidates.president.map(candidate => (
                                <MenuItem
                                    key={candidate._id}
                                    value={`${candidate.name}-${candidate._id}`}
                                >
                                    {candidate.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='fs-4 fw-semibold m-1 text-success p-0'>
                        {votes.president}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('president')}>Cancel</Button>
                    <Button onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'vicePresident'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for Vice President</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Vice President</InputLabel>
                        <Select
                            value={votes.vicePresident}
                            onChange={(e) => handleVoteChange('vicePresident', e.target.value)}
                        >
                            {candidates.vicepresident.map(candidate => (
                                <MenuItem
                                    key={candidate._id}
                                    value={`${candidate.name}-${candidate._id}`}
                                >
                                    {candidate.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='fs-4 fw-semibold m-1 text-success p-0'>
                        {votes.vicePresident}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('vicePresident')}>Cancel</Button>
                    <Button onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'generalSecretary'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for General Secretary</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>General Secretary</InputLabel>
                        <Select
                            value={votes.generalSecretary}
                            onChange={(e) => handleVoteChange('generalSecretary', e.target.value)}
                        >
                            {candidates.generalsecretary.map(candidate => (
                                <MenuItem
                                    key={candidate._id}
                                    value={`${candidate.name}-${candidate._id}`}
                                >
                                    {candidate.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='fs-4 fw-semibold m-1 text-success p-0'>
                        {votes.generalSecretary}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('generalSecretary')}>Cancel</Button>
                    <Button onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'secretary'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for Secretary</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Secretary</InputLabel>
                        <Select
                            value={votes.secretary}
                            onChange={(e) => handleVoteChange('secretary', e.target.value)}
                        >
                            {candidates.secretary.map(candidate => (
                                <MenuItem
                                    key={candidate._id}
                                    value={`${candidate.name}-${candidate._id}`}
                                >
                                    {candidate.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='fs-4 fw-semibold m-1 text-success p-0'>
                        {votes.secretary}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('secretary')}>Cancel</Button>
                    <Button onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'treasurer'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for treasurer</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>treasurer</InputLabel>
                        <Select
                            value={votes.treasurer}
                            onChange={(e) => handleVoteChange('treasurer', e.target.value)}
                        >
                            {candidates.treasurer.map(candidate => (
                                <MenuItem
                                    key={candidate._id}
                                    value={`${candidate.name}-${candidate._id}`}
                                >
                                    {candidate.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='fs-4 fw-semibold m-1 text-success p-0'>
                        {votes.treasurer}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('treasurer')}>Cancel</Button>
                    <Button onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'preview'} onClose={handleClose} fullWidth={true}>
                <DialogContent>
                    <div className="preview mb-4" style={{ marginTop: '20px', textAlign: 'center', background: '#00308F', color: 'white' }}>
                        <Typography variant="h6" className='p-2'>Preview your choices</Typography>
                        <table className='table tab'>
                            <tbody>
                                <tr key={1}>
                                    <td>President</td>
                                    <td>{votes.president}</td>
                                </tr>
                                <tr key={2}>
                                    <td>Vice President</td>
                                    <td>{votes.vicePresident}</td>
                                </tr>
                                <tr key={3}>
                                    <td>General Seceratary</td>
                                    <td>{votes.generalSecretary}</td>
                                </tr>
                                <tr key={3}>
                                    <td>Seceratary</td>
                                    <td>{votes.secretary}</td>
                                </tr>
                                <tr key={3}>
                                    <td>Treasurer</td>
                                    <td>{votes.treasurer}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <div>
                    <div className='text-center' variant="h6">Are you sure you want to submit?</div>
                    <div className='text-center' variant="h6">(This action cannot be undone)</div>
                </div>
                <DialogActions className='d-flex justify-content-center m-2 mb-3'>
                    <div className='btn btn-primary' onClick={handlePreviewClose}>Back</div>
                    <div className='btn btn-success' onClick={handleSubmit}>Submit</div>
                </DialogActions>
            </Dialog>
            {isLoading && <CircularProgress className='m-3' />}
            <SnackBarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                severity={snackBarSeverity}
                onClose={handleSnackBarClose}
            />
        </div >
    );
};

export default VotingComponent;
