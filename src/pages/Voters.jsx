import VoterList from "../components/VoterList"
import "./Voter.css"
export default function Voters() {
    return (
        <>
            <p className="text-center heading">List of all voters</p>
            <div className="container list mt-3">
                <VoterList />
            </div>
        </>
    )
}