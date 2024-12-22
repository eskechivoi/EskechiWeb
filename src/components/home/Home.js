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
        <div>
            <section id="home">
                <Introduction />
                <About />
            </section>
            <section id="skills" style={{marginBottom: '50px'}}>
                <Skills skillsJson={skillsData}/>
            </section>
            <section id="projects">
                <Projects projectsJson={projectData}/>
            </section>
            <section id="articles" style={{marginBottom: '50px'}}>
                <Articles articles={articleData}/>
            </section>
        </div>
    );
};

export default Home;