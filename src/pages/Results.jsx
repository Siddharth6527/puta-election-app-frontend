import React, { useEffect, useState } from "react";
import { fetchCandidatesFromServer } from "../utils/serverFunctions";
import CandidateList from "../components/CandidateList";
import { CircularProgress } from "@mui/material";

const Results = () => {
  const [results, setResults] = useState({
    president: [],
    vicepresident: [],
    generalsecretary: [],
    secretary: [],
    treasurer: [],
  });

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
  );
};

export default Results;
