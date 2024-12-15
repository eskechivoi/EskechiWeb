import React from 'react';
import Skill from './Skill';

const Skills = ({ skillsJson }) => {
    return (
        <>
            {skillsJson.map((card, index) => (
                <div className="row justify-content-center" style={{ marginTop: '50px' }} key={index}>
                    {index % 2 === 0 ? (
                        <>
                        <Skill header={card.header} dots={card.dots} link={card.link} />
                        <div className="col-sm-2 d-flex justify-content-center">
                            {index < 2 && <img src='/images/diagonal-arrow-right.png' className='arrow'/>}
                        </div>
                        <div className="col-lg-4"></div>
                        </>
                    ) : (
                        <>
                        <div className="col-lg-4"></div>
                        <div className="col-sm-2 d-flex justify-content-center">
                            {index < 2 && <img src='/images/diagonal-arrow-left.png' className='arrow'/>}
                        </div>
                        <Skill header={card.header} dots={card.dots} link={card.link} />
                        </>
                    )}
                </div>
            ))}
        </>
    );
};
  

export default Skills;
