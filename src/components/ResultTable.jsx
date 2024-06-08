// src/components/ResultTable.js
import React from 'react';
import './ResultTable.css'

const ResultTable = ({ title, results }) => {
    return (
        <div>
            <h2>{title}</h2>
            <table className='table tab'>
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.name}</td>
                            <td>{result.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
