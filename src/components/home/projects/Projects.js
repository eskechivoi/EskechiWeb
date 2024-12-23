import React from 'react';
import Project from './Project';

const Projects = ({ projectsJson }) => {
    return (
        <div style={{backgroundColor: '#aedfee', paddingTop: '10px', paddingBottom: '30px', paddingInline: '20px'}}>
            <h1 style={{marginTop: '50px', textAlign: 'center'}}>My projects</h1>
            <hr className="hr-socials"/>
            {projectsJson.map((project, index) => (
                <div className="row justify-content-center" style={{ marginTop: '50px' }} key={index}>
                    <Project 
                        category={project.category}
                        name={project.name}
                        description={project.description}
                        link={project.link}
                        graph={project.graph}
                    />
                </div>
            ))}
        </div>
    );
};
  

export default Projects;
