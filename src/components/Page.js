import React from 'react'; 

const Page = ({ children }) => { 
    return (    
        <div className="index-body">
			<div className="container-fluid">
                {children}
            </div>
        </div>
    );
};

export default Page;
