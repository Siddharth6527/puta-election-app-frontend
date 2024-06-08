import React, { useEffect, useState } from 'react';
import ResultTable from '../components/ResultTable';

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
        const fetchData = async () => {
            //const respones = fetch('https://puta-election-app-backend.onrender.com/api/v1/candidates');
            const response = await fetch('http://localhost:3000/api/v1/candidates');
            const fetchedData = await response.json();
            const data = changeFormat(fetchedData.data);
            setResults(data);
        }
        fetchData();
    }, []);

    console.log(results);
    const myStyle = {
        marginBottom: 60
    }

    return (
        <div>
            <h2 className='my-5'>Voting Results</h2>
            <div style={myStyle}>
                <ResultTable title="President" results={results.president} />
            </div>
            <div style={myStyle}>
                <ResultTable title="Vice President" results={results.vicepresident} />
            </div>
            <div style={myStyle}>
                <ResultTable title="General Secretary" results={results.generalsecretary} />
            </div>
            {/* <ResultTable title="Secretary" results={results.secretary} /> */}
            {/* <ResultTable title="Treasurer" results={results.treasurer} /> */}
        </div>
    );
};

export default Results;
