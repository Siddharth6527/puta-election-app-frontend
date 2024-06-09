import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const candidates = {
    president: ['Candidate A', 'Candidate B', 'Candidate C'],
    vicePresident: ['Candidate D', 'Candidate E', 'Candidate F'],
    generalSecretary: ['Candidate G', 'Candidate H', 'Candidate I'],
};

const Vote = () => {
    const [votes, setVotes] = useState({
        president: '',
        vicePresident: '',
        generalSecretary: ''
    });

    const [open, setOpen] = useState(null);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleClickOpen = (position) => {
        setOpen(position);
    };

    const handleClose = () => {
        setOpen(null);
        handlePreviewEnable();
    };

    const handleCloseWithoutSubmit = (position) => {
        setOpen(null);
        setVotes({ ...votes, [position]: null })
        handlePreviewEnable();
    };

    const handlePreviewClose = () => {
        setOpen(null);
    }

    const handleVoteChange = (position, value) => {
        setVotes({ ...votes, [position]: value });
        setOpen(null);
    };

    const handlePreviewEnable = () => {
        const allFilled = Object.values(votes).every(vote => vote !== '');
        setPreviewEnabled(allFilled);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        // Submit the form data to your backend or API
        console.log('Submitted votes:', votes);
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
            <Button variant="contained" onClick={() => handleClickOpen('preview')} disabled={!previewEnabled}>Preview</Button>
            {/* <Button variant="contained" onClick={handlePreviewEnable} disabled={!previewEnabled}>Preview</Button> */}
            <Button variant="contained" onClick={handleSubmit} disabled={!previewEnabled}>Submit</Button>

            <Dialog open={open === 'president'} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Vote for President</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>President</InputLabel>
                        <Select
                            value={votes.president}
                            onChange={(e) => handleVoteChange('president', e.target.value)}
                        >
                            {candidates.president.map(candidate => (
                                <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('president')}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
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
                            {candidates.vicePresident.map(candidate => (
                                <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('vicePresident')}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
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
                            {candidates.generalSecretary.map(candidate => (
                                <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseWithoutSubmit('generalSecretary')}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 'preview'} onClose={handleClose} fullWidth={true}>
                <DialogContent>
                    <div className="preview" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Preview your choices:</Typography>
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
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePreviewClose}>Done</Button>
                </DialogActions>
            </Dialog>

            {submitted && (
                <div className="submitted" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Typography variant="h6">Your vote has been submitted!</Typography>
                </div>
            )}
        </div>
    );
};

export default Vote;
