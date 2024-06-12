import Button from 'react-bootstrap/Button';
import "./AddVoter.css";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCandidateForm from './AddCandidateForm';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddCandidate() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleClickOpen}>
                Add candidate
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <h2 className='text-center mt-5'> Add New Candidate </h2>
                <IconButton
                    edge="start"
                    color="blue"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon className='mt-2' />
                </IconButton>
                <AddCandidateForm />
            </Dialog>
        </React.Fragment>
    );
}