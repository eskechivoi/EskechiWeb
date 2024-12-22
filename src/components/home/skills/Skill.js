import React from 'react';

const Skill = ({ header, dots, links }) => {
  return (
    <div className="col-lg-4">
      <div className="about">
        <h3 style={{ textAlign: 'center' }}>{header}</h3>
        <ul>
          {dots.map((dot, index) => {
            const link = links && links.find(link => link.dot === index + 1);
            return (
              <li key={index} style={{textAlign: 'left'}}>
                {dot + " "}
                {link && (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>
                )} 
              </li> 
            ); 
          })}
        </ul>
      </div>
    </div>
  );
};

export default Skill;
