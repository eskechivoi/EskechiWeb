import React, { useState, useEffect } from 'react';
import MermaidChart from '../../MermaidChart';

const Project = ({ category, name, description, link, graph }) => {
    const [graphContent, setGraphContent] = useState('');
    
    useEffect(() => {
        if (graph) {
            fetch(`files/${graph}`)
                .then(response => response.text())
                .then(text => setGraphContent(text));
        } 
    }, [graph]);

    return (
        <>
            <div className="col-lg-4">
                <h3 style={{ textAlign: 'center', fontFamily: "'Courier New', Courier, monospace"}}>{category}</h3>
            </div>
            <div className="col-sm-2 d-flex justify-content-center" style={{paddingTop: '20px'}}>
                <div className='horizontal-line' style={{alignSelf: 'flex-start', marginInline: '50px', marginBottom: '10px'}}></div>
            </div>
            <div className="col-lg-4" style={{ textAlign: 'left'}}>
                <h3>{name}</h3>
                <p>{description}</p>
                { graphContent && ( <MermaidChart graph={graphContent} /> )}
                <p></p>
                { link && (
                    <a href={link}>Link to the project</a>
                )}
            </div>
        </>
    );
};

export default Project;