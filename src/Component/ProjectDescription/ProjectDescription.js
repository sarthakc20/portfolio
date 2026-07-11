import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./projectDescription.css";
import ImageWithSkeleton from "./ImageWithSkeleton.js";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const SLIDE_GAP = 16;
const PEEK_RATIO = 0.25;

const ProjectDescription = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(0);
  const carouselRef = useRef(null);

  const slides = project?.screenshots_slide ?? [];
  const loopSlides =
    slides.length > 1
      ? [slides[slides.length - 1], ...slides, slides[0]]
      : slides;

  useEffect(() => {
    import("../Projects/projectsData.json")
      .then((data) => {
        const allProjects = data.default;
        const selectedProject = allProjects.find(
          (proj) => proj.id === parseInt(projectId)
        );
        setProject(selectedProject);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false);
      });
  }, [projectId]);

  useEffect(() => {
    setSlideIndex(slides.length > 1 ? 1 : 0);
    setEnableTransition(true);
  }, [projectId, slides.length]);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const updateWidth = () => {
      const style = window.getComputedStyle(node);
      const paddingX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      setViewportWidth(node.clientWidth - paddingX);
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [project]);

  useEffect(() => {
    if (enableTransition) return;

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true));
    });

    return () => cancelAnimationFrame(frameId);
  }, [enableTransition, slideIndex]);

  if (loading) {
    return null;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const innerWidth = Math.max(viewportWidth, 0);
  const slideWidth =
    slides.length > 1 ? (innerWidth - SLIDE_GAP) / (1 + PEEK_RATIO) : innerWidth;
  const slideStride = slides.length > 1 ? slideWidth + SLIDE_GAP : innerWidth;

  const handleNext = () => {
    if (slides.length <= 1) return;
    setEnableTransition(true);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (slides.length <= 1) return;
    setEnableTransition(true);
    setSlideIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "transform" || slides.length <= 1) return;

    if (slideIndex === loopSlides.length - 1) {
      setEnableTransition(false);
      setSlideIndex(1);
    } else if (slideIndex === 0) {
      setEnableTransition(false);
      setSlideIndex(slides.length);
    }
  };

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
    <>
      <div className="project-description-block1">
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
                  <ImageWithSkeleton
                    src={project.screenshots[index] || project.screenshots[0]}
                    alt={`${section.title} of ${project.title}`}
                    className="pd-fifty-fifty-text-image__image"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="project-description-block2">
        <div className="challenges__container max-width">
          <h3 className="pd-headline pd-fifty-fifty-text-image__heading">
            Challenges
          </h3>
          <ul className="pd-fifty-fifty-text-image__list">
            {project.challenges &&
              project.challenges.map((item, i) => {
                const [firstLine, ...rest] = item.split(".");
                return (
                  <li
                    className="pd-copy pd-fifty-fifty-text-image__list-item"
                    key={i}
                  >
                    <FaCircleChevronRight className="exp-icon" />{" "}
                    <span>{firstLine}.</span> {rest.join(".")}
                  </li>
                );
              })}
          </ul>
        </div>

        {project.screenshots_grid && project.screenshots_grid.length > 0 ? (
          <div className="grid-gallery max-width">
            {/* Check if the first item is a video by its file extension */}
            {project.screenshots_grid[0].endsWith(".mp4") ? (
              <div className="grid-gallery__full-imag">
                <video autoPlay muted loop controls>
                  <source src={project.screenshots_grid[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <>
                {/* Full-size image */}
                <div className="grid-gallery__full-image">
                  <ImageWithSkeleton
                    src={project.screenshots_grid[0]}
                    alt={`${project.title} Screenshot 1`}
                    wrapperClassName="pd-image-skeleton-wrapper--gallery-full"
                  />
                </div>
                {/* Two half-size images */}
                {project.screenshots_grid.length === 3 && (
                  <div className="grid-gallery__half-images">
                    <ImageWithSkeleton
                      src={project.screenshots_grid[1]}
                      alt={`${project.title} Screenshot 2`}
                      className="half-image"
                      wrapperClassName="pd-image-skeleton-wrapper--gallery-half"
                    />
                    <ImageWithSkeleton
                      src={project.screenshots_grid[2]}
                      alt={`${project.title} Screenshot 3`}
                      className="half-image"
                      wrapperClassName="pd-image-skeleton-wrapper--gallery-half"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="challenges__container max-width">
          <h3 className="pd-headline pd-fifty-fifty-text-image__heading">
            Solution
          </h3>
          <p>
            <FaCircleChevronRight className="exp-icon" /> {project.solution}
          </p>
        </div>

        <div className="custom-swiper-container max-width">
          {slides.length > 0 && (
            <div className="custom-swiper">
              <div
                className="carousel-container"
                ref={carouselRef}
                style={{
                  "--carousel-slide-width": `${slideWidth}px`,
                  "--carousel-slide-gap": `${SLIDE_GAP}px`,
                }}
              >
                <div
                  className="swiper-wrapper"
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    transform: `translateX(-${slideIndex * slideStride}px)`,
                    transition: enableTransition
                      ? "transform 0.5s ease-in-out"
                      : "none",
                  }}
                >
                  {loopSlides.map((image, index) => (
                    <div className="swiper-slide" key={`carousel-slide-${index}`}>
                      <ImageWithSkeleton
                        src={image}
                        alt={`Screenshot ${index + 1}`}
                        className="carousel-image"
                        wrapperClassName="pd-image-skeleton-wrapper--carousel"
                      />
                    </div>
                  ))}
                </div>

                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="swiper-button-prev"
                      onClick={handlePrev}
                      aria-label="Previous screenshot"
                    >
                      &#10094;
                    </button>
                    <button
                      type="button"
                      className="swiper-button-next"
                      onClick={handleNext}
                      aria-label="Next screenshot"
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="challenges__container max-width">
          <h3 className="pd-headline pd-fifty-fifty-text-image__heading">
            Result
          </h3>
          <p>
            <FaCircleChevronRight className="exp-icon" /> {project.result}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectDescription;
