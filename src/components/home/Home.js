import React from "react";
import About from "./About";
import Articles from "./articles/Articles";
import Skills from "./skills/Skills";

import skillsData from '../../data/skills.json'
import articleData from '../../data/articles.json'
import Introduction from "./Introduction";

const Home = () => {
    return (
        <div id="home">
            <Introduction />
            <About />
            <Skills skillsJson={skillsData}/>
            <Articles articles={articleData}/>
        </div>
    );
};

export default Home;