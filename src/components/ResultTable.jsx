// src/components/ResultTable.js
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import './ResultTable.css'

const ResultTable = ({ title, results, isEditable }) => {
    return (
        <div>
            <h2>{title}</h2>
            <table className='table tab'>
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                        {isEditable && <th>Edit</th>}
                        {isEditable && <th>Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.name}</td>
                            <td>{result.voteCount}</td>
                            {isEditable && <td><EditIcon onClick={handleEditClick()} /></td>}
                            {isEditable && <td><DeleteIcon onClick={handleDeleteClick} /></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
