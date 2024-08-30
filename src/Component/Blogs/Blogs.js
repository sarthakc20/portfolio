import React, { useState, useEffect } from "react";
import "./blogs.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";

const Blogs = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("./blogsDetails.json")
      .then((data) => {
        setBlogsData(data.default);
        setLoading(false); // Hide loader when data is ready
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="blogs">
        <div className="exp-title">
          <h1 className="title name">Blogs</h1>
        </div>
        <div className="blog_section">
        {blogsData.map((blog, index) => (
          <div key={index} className="blog-card exp-text-box">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <small>
                  <FaCalendarAlt className="btn-icon" /> Posted on: {blog.posted_on}
                </small>
                <div>
                {blog.topic.map((topic, idx) => (
                    <h3 key={idx}>
                    {topic}</h3>
                  ))}
                </div>
                  <div>
                    <p>
                      <FaCircleChevronRight className="exp-icon" /> {blog.blog_description}
                    </p>
                  </div>
                  <div className="blog-button">
                  <button className="btn btn-color-1">
                      <a
                        href={blog.blog_link}
                        className="pd-btn-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More <MdArrowForward className="btn-icon" />
                      </a>
                    </button>
                    </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="coming-soon-container">
        <h1 className="coming-soon-text">More blogs coming soon</h1>
        <div className="coming-soon-animation">
          <div className="dot dot1"></div>
          <div className="dot dot2"></div>
          <div className="dot dot3"></div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
