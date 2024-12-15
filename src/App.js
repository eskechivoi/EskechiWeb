import './App.css';

import { useEffect } from 'react';

import Navigation from './components/navbar/Navigation';
import Home from './components/home/Home';
import Page from './components/Page';
import Footer from './components/footer/Footer';

function App() {

  useEffect(() => { 
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '.navbar');
    document.body.setAttribute('data-bs-offset', '50'); 
  }, []);
  
  return (
    <div className="App">
      <Navigation />
      <Page children={<Home />}/>
      <Footer />
    </div>
  );
}

export default App;
