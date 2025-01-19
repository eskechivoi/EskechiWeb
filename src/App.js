import './App.css';

import { useEffect } from 'react';

import Navigation from './components/navbar/Navigation';
import Home from './components/home/Home';
import Page from './components/Page';
import Footer from './components/footer/Footer';
import MarkdownArticle from './components/home/articles/mdArticles/MarkdownArticle';

import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';


function App() {

  useEffect(() => { 
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '.navbar');
    document.body.setAttribute('data-bs-offset', '50'); 
  }, []);
  
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Page children={<Home />}/>} />
          <Route path="/articles/:name" element={<Page children={<ArticleWrapper />}/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

function ArticleWrapper() { 
  const { name } = useParams();
  const articlePath = `/articles/${name}.md`
  return <MarkdownArticle articlePath={articlePath} />;
}

export default App;
