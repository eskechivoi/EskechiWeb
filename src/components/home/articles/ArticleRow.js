import React from 'react';

const ArticleRow = ({ language, category, text, children }) => {
    return (
        <tr>
            <td><p className="articles-txt" style={{textAlign: 'left'}}>[{language}] [{category}]: {text}</p></td>
            {children}
        </tr>
    );
};

export default ArticleRow;
