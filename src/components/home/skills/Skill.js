import React from 'react';

const Skill = ({ header, dots, link }) => {
  return (
    <div className="col-lg-4">
      <div className="about">
        <h3 style={{ textAlign: 'center' }}>{header}</h3>
        <ul>
          {dots.map((dot, index) => (
            <li key={index} style={{textAlign: 'left'}}>
              {dot + " "} 
              {link && link.dot === index+1 && (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skill;
