import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SnackBarComponent from './SnackBarComponent';
import './AddVoterForm.css'
import { addCandidateToServer } from '../utils/serverFunctions';

export default function AddCandidateForm() {

    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    const handleSubmit = async (evt) => {
        const form = evt.target;
        if (!evt.target.checkValidity()) {
            evt.preventDefault();
            form.classList.add('was-validated');
            return;
        }
        evt.preventDefault();
        const response = await addCandidateToServer(form);
        if (response.ok) {
            console.log("Successfully added data")
            setSnackBarMessage('Succesfully added voter!');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } else {
            setSnackBarMessage('Failed to submit form.');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            console.log("error in adding data to server");
        }
        setTimeout(() => navigate(0), 1000);
    };

    const collegeInitials = {
        'College of Technology': 'COT',
        "College of Agriculture": 'COA',
        "College of Basic Sciences and Humanities": 'CBSH',
        "College of Agribusiness management": "CABM",
        "College of Veternary and Animal Sciences": "CVAS",
        "College of Fisheries": "COF",
        "College of Community Sciences": "CCS"
    }

    const [collegeInitial, setCollegeInital] = useState('O');
    function handleChange(collegeName) {
        setCollegeInital(collegeInitials[collegeName]);
    }

    return (
        <>
            <form
                id='addVoter'
                noValidate
                onSubmit={handleSubmit}
                method="POST"
                className="needs-validation"
            >
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" name="name" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <select className="form-select" name="college" onChange={(e) => handleChange(e.target.value)} required>
                        <option value="">Select College</option>
                        <option value="College of Technology">College of Technology</option>
                        <option value="College of Agriculture">College of Agriculture</option>
                        <option value="College of Basic Sciences and Humanities">College of Basic Sciences and Humanities</option>
                        <option value="College of Veternary and Animal Sciences">College of Veternary and Animal Sciences</option>
                        <option value="College of Agribusiness management">College of Agribusiness management</option>
                        <option value="College of Fisheries">College of Fisheries</option>
                        <option value="College of Community Sciences">College of Community Sciences</option>
                    </select>
                    <div className="invalid-feedback">
                        Select one college
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="SNo" className="form-label">College Initials</label>
                    <input type="text" className="form-control" id="SNo" name="collegeInitials" value={collegeInitial} readOnly />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="position" required>
                        <option value="">Select Position</option>
                        <option value="President">President</option>
                        <option value="Vice President">Vice President</option>
                        <option value="General Secretary">General Secretary</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Treasurer">Treasurer</option>
                    </select>
                    <div className="invalid-feedback">
                        Select one Position
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="RNo" className="form-label" min='0'>Vote Count</label>
                    <input type="number" className="form-control" id="RNo" name="voteCount" placeholder='0' min={0} required />
                    <div className="invalid-feedback">
                        should not be negative
                    </div>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
            <SnackBarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                severity={snackBarSeverity}
                onClose={handleSnackBarClose}
            />
        </>
    );
}