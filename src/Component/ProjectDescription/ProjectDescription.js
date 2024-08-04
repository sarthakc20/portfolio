import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./projectDescription.css";
import Loader from "../Layout/Loader/Loader.js";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const ProjectDescription = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../Projects/projectsData.json")
      .then((data) => {
        const allProjects = data.default;
        const selectedProject = allProjects.find(
          (proj) => proj.id === parseInt(projectId)
        );
        setProject(selectedProject);
        setLoading(false); // Hide loader when data is ready
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, [projectId]);

  if (loading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const sections = [
    {
      title: "About",
      description: project.about,
      list: project.points,
    },
    {
      title: "Tech Stack",
      description: project.techstackIntro,
      list: project.techstack,
    },
    {
      title: "Details",
      description: `Here are the detailed aspects of ${project.title}:`,
      list: project.details,
    },
  ];

  return (
    <div className="project-description">
      <div className="description-title">
        <h1 className="title name">{project.title}</h1>
      </div>

      {sections.map((section, index) => (
        <div
          className={`pd-fifty-fifty-text-image ${
            index % 2 === 1 ? "pd-fifty-fifty-text-image--reversed" : ""
          }`}
          key={index}
        >
          <div className="pd-grid-default-parent">
            <div className="pd-grid-default">
              <div className="pd-fifty-fifty-text-image__text-wrapper">
                <div>
                  <h2 className="pd-eyebrow pd-fifty-fifty-text-image__eyebrow">
                    {section.title}
                  </h2>
                  <h3 className="pd-headline pd-fifty-fifty-text-image__heading">
                    {section.title === "About"
                      ? `What is ${project.title}?`
                      : `${section.title} of ${project.title}`}
                  </h3>
                  <p className="pd-copy pd-fifty-fifty-text-image__description">
                    {section.description}
                  </p>
                  <ul className="pd-fifty-fifty-text-image__list">
                    {section.list &&
                      section.list.map((item, i) => (
                        <li
                          className="pd-copy pd-fifty-fifty-text-image__list-item"
                          key={i}
                        >
                          <FaCircleChevronRight className="exp-icon" /> {item}
                        </li>
                      ))}
                  </ul>
                </div>
                {section.title === "About" && (
                  <div className="btn-container pd-btn-container">
                    <button
                      className={`btn btn-color-2 ${
                        !project.link ? "btn-disabled" : ""
                      }`}
                      disabled={!project.link}
                      title={
                        !project.link
                          ? `${project.title} has no hosted link`
                          : ""
                      }
                    >
                      <a
                        href={project.link || "#"}
                        className={`pd-btn-link ${
                          !project.link ? "btn-link-disabled" : ""
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit site <MdArrowOutward className="btn-icon" />
                      </a>
                    </button>

                    <button className="btn btn-color-1">
                      <a
                        href={project.githublink}
                        className="pd-btn-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Link <FaGithub className="btn-icon" />
                      </a>
                    </button>
                  </div>
                )}
              </div>
              <div className="pd-fifty-fifty-text-image__image-wrapper">
                <img
                  className="pd-fifty-fifty-text-image__image"
                  src={project.screenshots[index] || project.screenshots[0]}
                  alt={`${section.title} of ${project.title}`}
                  loading="lazy" // Lazy load the image
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectDescription;
