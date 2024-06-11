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


  const myStyle = {
    marginBottom: 60,
  };

  return (
    <div>
      <h2 className="my-5">Voting Results</h2>
      <div style={myStyle}>
        <ResultTable title="President" results={results.president} isEditable={false} />
      </div>
      <div style={myStyle}>
        <ResultTable title="Vice President" results={results.vicepresident} isEditable={false} />
      </div>
      <div style={myStyle}>
        <ResultTable
          title="General Secretary"
          results={results.generalsecretary}
          isEditable={false}
        />
      </div>
      {/* <ResultTable title="Secretary" results={results.secretary} isEditable={false} /> */}
      {/* <ResultTable title="Treasurer" results={results.treasurer} isEditable={false} /> */}
    </div>
  );
};

export default Results;
