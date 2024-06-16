import React, { useEffect, useState } from "react";
import { fetchCandidatesFromServer } from "../utils/serverFunctions";
import CandidateList from "../components/CandidateList";
import { CircularProgress } from "@mui/material";
import { getResultVisibility, toggleResultsVisiblity } from "../utils/serverFunctions";

const Results = () => {
  const [results, setResults] = useState({
    president: [],
    vicepresident: [],
    generalsecretary: [],
    secretary: [],
    treasurer: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState();
  useEffect(() => {
    setIsLoading(true);
    const fetchValues = async () => {
      const visibility = await getResultVisibility();
      setShowResult(visibility);
      // console.log('showREsult= ', showResult)
    }
    fetchValues();
    setIsLoading(false)
  }, [showResult])

  const updateShowResult = async (e) => {
    setIsLoading(true);
    await toggleResultsVisiblity(e.target.checked);
    const visibility = await getResultVisibility();
    // console.log("after toggle: ", visibility)
    setShowResult(visibility);
    setIsLoading(false);
  }

  function isAdmin() {
    return localStorage.getItem('role') == 'voter' ? false : true;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCandidatesFromServer();
      const convertedData = convertData(data);
      setResults(convertedData);
    }
    fetchData();
  }, [])

  const convertData = (data) => {
    let newData = data;
    for (let key in data) {
      newData = {
        ...newData,
        [key]: data[key].map((candidate, i) => {
          return {
            id: i + 1,
            Name: candidate.name,
            College: candidate.college,
            VoteCount: candidate.voteCount,
            _id: candidate._id
          }
        })
      }
    }
    return newData;
  }
  const myStyle = {
    marginBottom: 40,
  };

  return (
    <>
      {isAdmin() && (
        <div className="d-flex justify-content-center mt-3 mb-5">
          <div className="form-check form-switch">
            <input
              className="form-check-input fw-semibold fs-3"
              type="checkbox"
              role="switch"
              id="Switch"
              onChange={updateShowResult}
              checked={showResult}
            />
            <label className="form-check-label fw-semibold fs-3" htmlFor="Switch">Show Results to Voters</label>
          </div>
        </div>
      )}
      {isAdmin() && isLoading && (<CircularProgress />)}
      {!showResult && !isAdmin() && (
        <div className='mt-4'>
          <h3 className='text-center'>Results will be available soon!</h3>
        </div>
      )}
      {(showResult || isAdmin()) && (
        <div>
          <h2 className="my-2 mb-5">Voting Results</h2>
          <div>
            {results.president.length == 0 && <CircularProgress className="m-3" />}
          </div>
          {results.president.length > 0 && (
            <>
              <div style={myStyle}>
                <h3 style={{ margin: 20 }}>President</h3>
                {results.president.length > 0 &&
                  <CandidateList
                    initialRows={results.president}
                    position={"president"}
                    isAdmin={false}
                    isSlNoVisible={false}
                  />}
              </div>
              <div style={myStyle}>
                <h3 style={{ margin: 20 }}>Vice President</h3>
                {results.vicepresident.length > 0 &&
                  <CandidateList
                    initialRows={results.vicepresident}
                    position={"vicePresident"}
                    isAdmin={false}
                    isSlNoVisible={false}
                  />}
              </div>
              <div style={myStyle}>
                <h3 style={{ margin: 20 }}>General Secretary</h3>
                {results.vicepresident.length > 0 &&
                  <CandidateList
                    initialRows={results.generalsecretary}
                    position={"generalSecretary"}
                    isAdmin={false}
                    isSlNoVisible={false}
                  />}
              </div>
            </>)}
        </div>
      )}
    </>
  );
};

export default Results;
