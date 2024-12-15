import React from "react";
import About from "./About";
import Articles from "./articles/Articles";
import Skills from "./skills/Skills";
import Introduction from "./Introduction";

import skillsData from '../../data/skills.json'
import articleData from '../../data/articles.json'
import projectData from '../../data/projects.json'
import Projects from "./projects/Projects";

const Home = () => {
    return (
        <div id="home">
            <Introduction />
            <About />
            <Skills skillsJson={skillsData}/>
            <div style={{marginBottom: '50px'}}></div>
            <Projects projectsJson={projectData}/>
            <Articles articles={articleData}/>
            <div style={{marginBottom: '50px'}}></div>
        </div>
    );
};

export default Home;