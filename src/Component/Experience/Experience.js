import React, { useEffect, useState } from "react";
import "./experience.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import TM from "../../assets/tm.webp";
import INEURON from "../../assets/ineuron.jpg";

// Mapping of image filenames to imported images
const imageMap = {
  "tm.webp": TM,
  "ineuron.jpg": INEURON
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    import('./experienceData.json')
      .then((data) => setExperienceData(data.default))
      .catch((error) => console.error("Error loading JSON data:", error));
  }, []);

  return (
    <div className="exp">
      <div className="exp-title">
        <h1 className="title name">Experience</h1>
      </div>

      <div className="timeline">
        {experienceData.map((experience, index) => (
          <div
            key={index}
            className={`container ${index % 2 === 0 ? "left-container" : "right-container"}`}
          >
            <img src={imageMap[experience.image]} alt={experience.alttext} />
            <div className="exp-text-box">
              <h2>{experience.company}</h2>
              <p className="designation">{experience.designation}</p>
              <small>
                <FaCalendarAlt className="btn-icon" /> {experience.duration}
              </small>
              <div>
                {experience.technologies.map((tech, index) => (
                  <h3 key={index}>{tech}</h3>
                ))}
              </div>
              {experience.tasks.map((task, index) => (
                <div key={index}>
                  <p>
                    <FaCircleChevronRight className="exp-icon" /> {task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
