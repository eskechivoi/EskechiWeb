import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ graph }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
    }, []);

    return (
        <div className="mermaid"> 
            {console.log(graph)} 
            {graph}
        </div>
    );
};

export default MermaidChart;
