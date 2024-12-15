import React from 'react';

const Skill = ({ header, dots, link }) => {
  return (
    <div className="col-lg-4">
      <div className="about">
        <h3 style={{ textAlign: 'center' }}>{header}</h3>
        <ul>
          {dots.map((dot, index) => (
            <li key={index} style={{textAlign: 'left'}}>{dot}</li>
          ))}
        </ul>
        {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
            Visit HackTheBox Profile
            </a>
        )}
      </div>
    </div>
  );
};

export default Skill;
