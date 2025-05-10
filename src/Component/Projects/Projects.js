import React, { useEffect, useState, useRef } from "react";
import "./project.css";
import { NavLink } from "react-router-dom";
import Loader from "../Layout/Loader/Loader.js";

// Image imports
import Devbook_img from "../../assets/devbook-cover.png";
import Emarket from "../../assets/emarket.png";
import Netflix from "../../assets/netflix.png";
import Doc from "../../assets/doc.png";
import Todo from "../../assets/todo.png";
import { MdArrowForward } from "react-icons/md";

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
  const [imageLoaded, setImageLoaded] = useState({}); // Track loaded images
  const projectRef = useRef([]);

  const importIcon = (filename) => {
    try {
      return require(`../../assets/${filename}`);
    } catch (e) {
      console.warn(`Missing icon: ${filename}`);
      return null;
    }
  };

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

    projectRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      projectRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [projectData]);

  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }));
  };

  return (
    <>
      {loading && <Loader />}

      <div className="project max-width">
        <div className="exp-title">
          <h1 className="title name">Projects</h1>
        </div>
        <div className="section_project-grid">
          <div className="project-list">
            <div className="project_grid">
              {projectData.map((project, index) => (
                <div
                  className="project-item"
                  key={index}
                  ref={(el) => (projectRef.current[index] = el)}
                >
                  <NavLink
                    to={`/projects/${project.title
                      .toLowerCase()
                      .replace(/ /g, "-")}/${project.id}`}
                    className="project_card_image"
                  >
                    {/* Skeleton Loader */}
                    {!imageLoaded[index] && (
                      <div className="skeleton-loader"></div>
                    )}

                    {/* Actual Image */}
                    <img
                      src={imageMap[project.image]}
                      alt={project.alttext}
                      className={`project_card-cover ${
                        imageLoaded[index] ? "loaded" : ""
                      }`}
                      onLoad={() => handleImageLoad(index)}
                    />

                    {imageLoaded[index] && (
                      <div className="project_card-content">
                        <div>
                          <div className="text-size-medium">
                            {project.title}
                          </div>
                          <div className="text-size-small">
                            {project.description}{" "}
                            <span>
                              Know more <MdArrowForward className="btn-icon" />
                            </span>
                          </div>
                          {project.techStackIcons && (
                            <div className="tech-stack-icons">
                              {project.techStackIcons.map((icon, i) => {
                                const iconSrc = importIcon(icon);
                                return (
                                  iconSrc && (
                                    <img
                                      key={i}
                                      src={iconSrc}
                                      alt={icon.replace(".png", "")}
                                      className="tech-icon"
                                      style={{
                                        zIndex:
                                          project.techStackIcons.length - i,
                                        marginLeft: i === 0 ? 0 : "-10px",
                                      }}
                                    />
                                  )
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
