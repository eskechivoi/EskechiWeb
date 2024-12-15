import React from 'react';
import Skill from './Skill';

const Skills = ({ skillsJson }) => {
    return (
        <div className="index-body">
            {skillsJson.map((card, index) => (
                <div className="row justify-content-center" style={{ marginTop: '50px' }} key={index}>
                    {index % 2 === 0 ? (
                        <>
                        <Skill header={card.header} dots={card.dots} link={card.link} />
                        <div className="col-sm-2 d-flex justify-content-center">
                            <div className="vertical-line"></div>
                        </div>
                        <div className="col-lg-4"></div>
                        </>
                    ) : (
                        <>
                        <div className="col-lg-4"></div>
                        <div className="col-sm-2 d-flex justify-content-center">
                            <div className="vertical-line"></div>
                        </div>
                        <Skill header={card.header} dots={card.dots} link={card.link} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};
  

export default Skills;
