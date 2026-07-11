import React, { useEffect, useRef, useState } from "react";
import "./clientProjects.css";
import WebsiteThumbnail from "./WebsiteThumbnail.js";
import { FaCircleChevronRight } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

const GridViewIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ListViewIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="1.5" y="2.5" width="5.5" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 4.5H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="1.5" y="8" width="5.5" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 10H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="1.5" y="13.5" width="5.5" height="2.5" rx="0.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 14.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ClientProjectCard = ({ project, variant = "featured", layout = "grid", cardRef }) => (
  <article
    className={`client-project-card exp-text-box client-project-card--${variant} ${
      layout === "list" ? "client-project-card--list" : ""
    }`}
    ref={cardRef}
  >
    <div className="client-project-card__hero">
      <WebsiteThumbnail
        url={project.link}
        alt={`${project.title} website preview`}
        wrapperClassName="client-project-card__thumbnail"
      />
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="client-project-card__visit-link"
        aria-label={`Visit ${project.title} website`}
      >
        Visit site <MdArrowOutward />
      </a>
    </div>

    <div className="client-project-card__body">
      <div className="client-project-card__header">
        <div>
          <p className="client-project-card__eyebrow">{project.platform}</p>
          <h2 className="client-project-card__title">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="client-project-card__title-link"
            >
              {project.title}
              <MdArrowOutward className="client-project-card__title-icon" />
            </a>
          </h2>
          <p className="client-project-card__subtitle">{project.subtitle}</p>
        </div>
      </div>

      <p className="client-project-card__tagline">{project.tagline}</p>

      <div className="client-project-card__meta">
        <span className="client-project-chip">{project.scope}</span>
        {project.collaboration && (
          <span className="client-project-chip client-project-chip--muted">
            Cross-functional delivery
          </span>
        )}
      </div>

      <div className="client-project-card__tech">
        {project.technologies.map((tech) => (
          <span className="client-project-tech" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <ul className="client-project-card__highlights">
        {project.highlights.map((highlight, highlightIndex) => (
          <li key={highlightIndex}>
            <FaCircleChevronRight className="exp-icon" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {project.collaboration && (
        <p className="client-project-card__collaboration">
          <FaCircleChevronRight className="exp-icon" />
          <span>{project.collaboration}</span>
        </p>
      )}

      {project.featureLinks?.length > 0 && (
        <div className="client-project-features">
          <h3 className="client-project-features__title">Key implementations</h3>
          <div className="client-project-features__grid">
            {project.featureLinks.map((feature) => (
              <a
                href={feature.url}
                target="_blank"
                rel="noopener noreferrer"
                className="client-project-feature"
                key={feature.url}
              >
                <WebsiteThumbnail
                  url={feature.url}
                  alt={`${feature.title} preview`}
                  wrapperClassName="client-project-feature__thumbnail"
                />
                <span className="client-project-feature__overlay" aria-hidden="true">
                  <MdArrowOutward />
                </span>
                <span className="client-project-feature__label">{feature.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  </article>
);

const buildClientProjectSections = (projects) => {
  if (!projects.length) return [];

  const sections = [{ type: "featured", projects: [projects[0]] }];
  let index = 1;

  while (index < projects.length) {
    const pair = projects.slice(index, index + 2);
    sections.push({ type: "grid", projects: pair });
    index += pair.length;

    if (index >= projects.length) break;

    sections.push({ type: "featured", projects: [projects[index]] });
    index += 1;
  }

  return sections;
};

const ClientProjects = () => {
  const [clientProjects, setClientProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const cardRefs = useRef([]);

  useEffect(() => {
    import("./clientProjectsData.json")
      .then((data) => {
        setClientProjects(data.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading client projects data:", error);
        setLoading(false);
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
      { threshold: 0.12 }
    );

    cardRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      cardRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [clientProjects, viewMode]);

  const renderViewToggle = () => (
    <div className="client-projects__toolbar">
      <div className="client-projects__view-toggle" role="group" aria-label="Change project view">
        <button
          type="button"
          className={`client-projects__view-btn ${
            viewMode === "grid" ? "client-projects__view-btn--active" : ""
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          onClick={() => setViewMode("grid")}
        >
          <GridViewIcon />
        </button>
        <button
          type="button"
          className={`client-projects__view-btn ${
            viewMode === "list" ? "client-projects__view-btn--active" : ""
          }`}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          onClick={() => setViewMode("list")}
        >
          <ListViewIcon />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="client-projects">
        {renderViewToggle()}
        <div className="client-project-card client-project-card--loading client-project-card--featured">
          <div className="client-project-card__hero-skeleton" />
          <div className="client-project-card__body-skeleton">
            <div className="client-project-skeleton-line client-project-skeleton-line--title" />
            <div className="client-project-skeleton-line client-project-skeleton-line--subtitle" />
            <div className="client-project-skeleton-line" />
            <div className="client-project-skeleton-line client-project-skeleton-line--short" />
          </div>
        </div>
        <div className="client-projects__grid">
          {[0, 1].map((index) => (
            <div
              className="client-project-card client-project-card--loading client-project-card--compact"
              key={index}
            >
              <div className="client-project-card__hero-skeleton" />
              <div className="client-project-card__body-skeleton">
                <div className="client-project-skeleton-line client-project-skeleton-line--title" />
                <div className="client-project-skeleton-line client-project-skeleton-line--subtitle" />
                <div className="client-project-skeleton-line client-project-skeleton-line--short" />
              </div>
            </div>
          ))}
        </div>
        <div className="client-project-card client-project-card--loading client-project-card--featured">
          <div className="client-project-card__hero-skeleton" />
          <div className="client-project-card__body-skeleton">
            <div className="client-project-skeleton-line client-project-skeleton-line--title" />
            <div className="client-project-skeleton-line client-project-skeleton-line--subtitle" />
            <div className="client-project-skeleton-line client-project-skeleton-line--short" />
          </div>
        </div>
      </div>
    );
  }

  const sections = buildClientProjectSections(clientProjects);
  let cardIndex = 0;

  return (
    <div className={`client-projects ${viewMode === "list" ? "client-projects--list" : ""}`}>
      {renderViewToggle()}

      {viewMode === "list" ? (
        <div className="client-projects__list">
          {clientProjects.map((project, index) => (
            <ClientProjectCard
              project={project}
              layout="list"
              key={project.id}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      ) : (
        <>
          {sections.map((section, sectionIndex) => {
            if (section.type === "featured") {
              const project = section.projects[0];
              const currentIndex = cardIndex;
              cardIndex += 1;

              return (
                <ClientProjectCard
                  project={project}
                  variant="featured"
                  key={project.id}
                  cardRef={(el) => (cardRefs.current[currentIndex] = el)}
                />
              );
            }

            return (
              <div className="client-projects__grid" key={`grid-${sectionIndex}`}>
                {section.projects.map((project) => {
                  const currentIndex = cardIndex;
                  cardIndex += 1;

                  return (
                    <ClientProjectCard
                      project={project}
                      variant="compact"
                      key={project.id}
                      cardRef={(el) => (cardRefs.current[currentIndex] = el)}
                    />
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ClientProjects;
