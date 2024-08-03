import React, { useEffect, useState } from "react";
import "./project.css";
import Devbook_img from "../../assets/devbook-cover.png";
import Emarket from "../../assets/emarket.png";
import Netflix from "../../assets/netflix.png";
import Doc from "../../assets/doc.png";
import Todo from "../../assets/todo.png";
import Loader from "../Layout/Loader/Loader.js";
import { NavLink } from "react-router-dom";

// Mapping of image filenames to imported images
const imageMap = {
  "devbook-cover.png": Devbook_img,
  "emarket.png": Emarket,
  "netflix.png": Netflix,
  "doc.png": Doc,
  "todo.png": Todo,
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("./projectsData.json")
      .then((data) => {
        setProjectData(data.default);
        setLoading(false); // Hide loader when data is ready
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="project">
        <div className="exp-title">
          <h1 className="title name">Projects</h1>
        </div>
        <div className="section_project-grid">
          <div className="project-list">
            <div className="project_grid">
              {projectData.map((project, index) => (
                <div className="project-item" key={index}>
                  <NavLink to="/" className="project_card_image">
                    <div className="project_card-content">
                      <div>
                        <div className="text-size-medium">{project.title}</div>
                        <div className="text-size-small">
                          {project.description}
                        </div>
                      </div>
                    </div>
                    <img
                      src={imageMap[project.image]}
                      alt={project.alttext}
                      className="project_card-cover"
                    />
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
