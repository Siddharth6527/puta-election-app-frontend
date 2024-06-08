import React, { useEffect, useState } from 'react';
import ResultTable from '../components/ResultTable';
import './Results.css'

const changeFormat = (arr) => {
    return arr.reduce((acc, current) => {
        const formattedPosition = current.position.toLowerCase().replace(/ /g, "");
        acc[formattedPosition] = current.candidates;
        return acc;
    }, {});
}

const Results = () => {
    const [results, setResults] = useState({
        president: [],
        vicepresident: [],
        generalsecretary: [],
        secretary: [],
        treasurer: []
    });

    useEffect(() => {
        fetch('https://puta-election-app-backend.onrender.com/api/v1/candidates')
            // fetch('http://localhost:3000/api/v1/candidates')
            .then(response => response.json())
            // .then(data => console.log(data.data))
            .then(data => setResults(changeFormat(data.data)))
            .catch(error => {
                console.error('Error fetching voting results:', error);
            });
    }, []);

    console.log(results);

    return (
        <div>
            <h1>Voting Results</h1>
            <ResultTable title="President" results={results.president} margin="100px" />
            <ResultTable title="Vice President" results={results.vicepresident} />
            <ResultTable title="General Secretary" results={results.generalsecretary} />
            {/* <ResultTable title="Secretary" results={results.secretary} /> */}
            {/* <ResultTable title="Treasurer" results={results.treasurer} /> */}
        </div>
    );
};

export default Results;
