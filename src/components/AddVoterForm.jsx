import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SnackBarComponent from './SnackBarComponent';

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
        try {
            const formData = new FormData(form);
            // const response = await fetch('http://localhost:3000/api/v1/voters/signup', {
            const response = await fetch('https://puta-election-app-backend.onrender.com/api/v1/voters/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData)
            });
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
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <>
            <form
                id='addVoter'
                // action="http://localhost:3000/api/v1/voters/signup"
                // action="https://puta-election-app-backend.onrender.com/api/v1/voters/signup"
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
                    <label htmlFor="email" className="form-label">email</label>
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