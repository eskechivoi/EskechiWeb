import React from 'react'

const Introduction = () => {
    return(
        <div className="row justify-content-center" style={{marginLeft: '20px', marginRight: '20px'}}>
            <div className="col-md-6" style={{padding: '90px 0'}}>
                <h1> Hi! I am Fernando Rodríguez</h1>
                <h2> I am a DevSecOps engineer with a passion for taking on a variety of projects!</h2>
            </div>
            <div className="col-sm-1"></div>
                <div className="col-md-3" style={{textAlign: 'center'}}>
                <img className="responsive-image" src="/eskechivoi.github.io/images/foto_linkedin.jpg" alt="Profile picture" />
            </div>
        </div>
    );
};

export default Introduction;