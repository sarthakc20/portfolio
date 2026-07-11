import React, { useCallback, useEffect, useLayoutEffect, useState, useRef } from "react";
import "./project.css";
import { NavLink } from "react-router-dom";
import Loader from "../Layout/Loader/Loader.js";
import ClientProjects from "./ClientProjects.js";

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
  const [activeTab, setActiveTab] = useState("personal");
  const [imageLoaded, setImageLoaded] = useState({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0)" });
  const projectRef = useRef([]);
  const tabsRef = useRef(null);
  const personalTabRef = useRef(null);
  const clientTabRef = useRef(null);

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

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const activeButton =
      activeTab === "personal" ? personalTabRef.current : clientTabRef.current;

    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeButton.getBoundingClientRect();

    setIndicatorStyle({
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - containerRect.left}px)`,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    if (activeTab !== "personal") return;

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
  }, [projectData, activeTab]);

  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }));
  };

  return (
    <>
      {loading && activeTab === "personal" && <Loader />}

      <div className="project max-width">
        <div className="exp-title">
          <h1 className="title name">Projects</h1>
        </div>

        <div className="project-tabs-wrapper">
          <div
            className="project-tabs"
            ref={tabsRef}
            role="tablist"
            aria-label="Project categories"
          >
            <span
              className="project-tabs__indicator"
              style={indicatorStyle}
              aria-hidden="true"
            />
            <button
              type="button"
              ref={personalTabRef}
              role="tab"
              aria-selected={activeTab === "personal"}
              aria-controls="project-panel"
              id="personal-projects-tab"
              className={`project-tab ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Projects
            </button>
            <button
              type="button"
              ref={clientTabRef}
              role="tab"
              aria-selected={activeTab === "client"}
              aria-controls="project-panel"
              id="client-projects-tab"
              className={`project-tab ${activeTab === "client" ? "active" : ""}`}
              onClick={() => setActiveTab("client")}
            >
              Client Projects
            </button>
          </div>
        </div>

        <div className="section_project-grid">
          <div
            className="project-list"
            id="project-panel"
            role="tabpanel"
            aria-labelledby={
              activeTab === "personal" ? "personal-projects-tab" : "client-projects-tab"
            }
          >
            {activeTab === "personal" ? (
              <div className="project-panel project-panel--personal" key="personal">
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
                      {!imageLoaded[index] && (
                        <div className="skeleton-loader"></div>
                      )}

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
            ) : (
              <div className="project-panel project-panel--client" key="client">
                <ClientProjects />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
