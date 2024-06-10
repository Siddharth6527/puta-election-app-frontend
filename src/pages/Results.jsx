import React, { useEffect, useState } from "react";
import ResultTable from "../components/ResultTable";
import { fetchCandidatesFromServer } from "../utils/serverFunctions";


const Results = () => {
  const [results, setResults] = useState({
    president: [],
    vicepresident: [],
    generalsecretary: [],
    secretary: [],
    treasurer: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCandidatesFromServer();
      setResults(data);
    }
    fetchData();
  }, []);


  console.log(results);
  const myStyle = {
    marginBottom: 60,
  };

  return (
    <div>
      <h2 className="my-5">Voting Results</h2>
      <div style={myStyle}>
        <ResultTable title="President" results={results.president} />
      </div>
      <div style={myStyle}>
        <ResultTable title="Vice President" results={results.vicepresident} />
      </div>
      <div style={myStyle}>
        <ResultTable
          title="General Secretary"
          results={results.generalsecretary}
        />
      </div>
      {/* <ResultTable title="Secretary" results={results.secretary} /> */}
      {/* <ResultTable title="Treasurer" results={results.treasurer} /> */}
    </div>
  );
};

export default Results;
