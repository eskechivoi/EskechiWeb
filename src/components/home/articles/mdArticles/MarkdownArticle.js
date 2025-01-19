import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownArticle.css';

const getArticleName = (articlePath) =>{
    const parts = articlePath.split('/');
    const articleNameWithExtension = parts[parts.length - 1];
    const articleName = articleNameWithExtension.split('.')[0];
    return articleName; 
}

function MarkdownArticle({ articlePath }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${articlePath}`)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [articlePath]);

  return (
    <div className="markdown-content">
      <ReactMarkdown
        children={content}
        urlTransform={(uri) => {
          if (!uri.startsWith('http://localhost/')) { return uri; } 
          const url = new URL(uri); 
          uri = url.pathname; 
          const baseUrl = `${window.location.protocol}//${window.location.host}`;
          const transformedUri = `${baseUrl}/${uri}`;
          console.log(baseUrl)
          console.log(transformedUri)
          return transformedUri;
        }}
      />
    </div>
  );
}

export default MarkdownArticle;
