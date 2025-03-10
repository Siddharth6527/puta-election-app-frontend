import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SnackBarComponent from './SnackBarComponent';
import './AddVoterForm.css'
import { addDataToServer } from '../utils/serverFunctions';

export default function AddVoterForm({ SNo }) {

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const navigate = useNavigate();

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
        const response = await addDataToServer(form);
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
        setTimeout(() => navigate(0), 1300);
    };

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
                    <label htmlFor="SNo" className="form-label">S.No</label>
                    <input type="text" className="form-control" id="SNo" name="sno" value={SNo} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" name="name" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Designation" className="form-label">Designation</label>
                    <input type="text" className="form-control" id="Designation" name="designation" required />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="college" required>
                        <option value="">Select College</option>
                        <option value="College of Technology">College of Technology</option>
                        <option value="College of Agriculture">College of Agriculture</option>
                        <option value="College of Basic Sciences and Humanities">College of Basic Sciences and Humanities</option>
                        <option value="College of Veternary and Animal Sciences">College of Veternary and Animal Sciences</option>
                        <option value="College of Agribusiness management">College of Agribusiness management</option>
                        <option value="College of Fisheries">College of Fisheries</option>
                        <option value="College of Community Sciences">College of Community Sciences</option>
                        <option value="Physical Education">Physical Education</option>
                        <option value="University Library">University Library</option>
                        <option value="KVK, Dhanauri">KVK, Dhanauri</option>
                        <option value="KVK, Chamoli">KVK, Chamoli</option>
                        <option value="KVK, Dhakrani">KVK, Dhakrani</option>
                        <option value="KVK, Jeolikote">KVK, Jeolikote</option>
                        <option value="KVK, Almora">KVK, Almora</option>
                        <option value="Directorate of Ext. Edu.">Directorate of Ext. Edu.</option>
                    </select>
                    <div className="invalid-feedback">
                        Select one college
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="RNo" className="form-label" min='0'>Recipt No</label>
                    <input type="number" className="form-control" id="RNo" name="receiptNo" min={0} required />
                    <div className="invalid-feedback">
                        should be greater than 0
                    </div>
                </div>
                <div className="mb-3">
                    <select className="form-select" name="memebershipCategory" required>
                        <option value="">Select Membership Category</option>
                        <option value="General">General</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">username</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={8} required />
                    <div className="invalid-feedback">
                        password should have atleast 8 characters.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="password2" name="passwordConfirm" minLength={8} required />
                    <div className="invalid-feedback">
                        password should have atleast 8 characters.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="voted">Has the candidate voted?</label>
                    <select className="form-select" id="voted" name="voted" required>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
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
