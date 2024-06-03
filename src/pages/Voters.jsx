import VoterList from "../components/VoterList"
import AddVoter from "../components/AddVoter"
import { useState } from "react";

import "./Voter.css"
export default function Voters({ isAdmin }) {


    const initialRows = [
        {
            id: 1,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 2,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 3,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 4,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 5,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 6,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 7,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 8,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 9,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 10,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 11,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 12,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 13,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 14,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 15,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 16,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        {
            id: 17,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: true,
        },
        {
            id: 18,
            Name: "Snow",
            Designation: "Jon",
            College: "College of Technology",
            RNo: 142,
            MembershipCategory: "General",
            VoteStatus: false,
        },
        { id: 19, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 20, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 21, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 22, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 23, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 24, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
        { id: 25, Name: "Snow", Designation: "Jon", College: "College of Technology", RNo: 142, MembershipCategory: "General", VoteStatus: false, },
    ];


    const [showForm, setShowForm] = useState(false);
    function toggleForm() {
        setShowForm(ShowForm => !ShowForm);
    }
    return (
        <>
            <p className="text-center heading">List of all voters</p>
            {isAdmin &&
                <p className="text-center text-muted">
                    (You are an admin. Double click to edit an entry. You can delete any voter or add new voter. )
                </p>
            }
            {isAdmin && showForm && <AddVoter />}
            <div className="btn btn-primary" onClick={toggleForm}>{showForm ? "cancel" : "Add voter"}</div>
            <div className="container list mt-3">
                <VoterList isAdmin={isAdmin} initialRows={initialRows} />
            </div>
        </>
    )
}