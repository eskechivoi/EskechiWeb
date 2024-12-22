import React, { useEffect } from 'react';

const Navigation = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.navigation li a');

    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    navLi.forEach((a) => {
      a.addEventListener('click', handleScroll);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const navLink = document.querySelector(`.navigation li a[href="#${id}"]`);
          if (entry.isIntersecting) {
            if (navLink) {
              navLi.forEach((a) => a.classList.remove('active'));
              navLink.classList.add('active');
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      navLi.forEach((a) => {
        a.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <div className="center">
      <ul className="navigation">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#articles">Articles</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default Navigation;
