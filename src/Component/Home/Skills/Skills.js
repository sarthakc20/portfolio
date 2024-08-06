import React, { useEffect, useRef } from "react";
import "./skills.css";
import htmlIcon from "../../../assets/html.png";
import cssIcon from "../../../assets/css.svg";
import jsIcon from "../../../assets/js.png";
import reactIcon from "../../../assets/react.png";
import nodeIcon from "../../../assets/node.webp";
import expressIcon from "../../../assets/express.png";
import reduxIcon from "../../../assets/redux.png";
import mongodbIcon from "../../../assets/mongodb.svg";
import sqlIcon from "../../../assets/sql.png";
import javaIcon from "../../../assets/java.png";
import cppIcon from "../../../assets/cpp.png";
import shopify from "../../../assets/shopify.webp";

const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React.js", icon: reactIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "Express", icon: expressIcon },
  { name: "Redux", icon: reduxIcon },
  { name: "MongoDB", icon: mongodbIcon },
  { name: "SQL", icon: sqlIcon },
  { name: "Java", icon: javaIcon },
  { name: "C++", icon: cppIcon },
  { name: "Shopify", icon: shopify },
];

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSkillsRef = skillsRef.current;
    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    return () => {
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
    };
  }, []);

  return (
    <>
      <div className="exp-title">
        <h1 className="title name skill-title">Skills</h1>
      </div>
      <div className="skills-grid" ref={skillsRef}>
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <img
              src={skill.icon}
              alt={`${skill.name} icon`}
              className="skill-icon"
            />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
