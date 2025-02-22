import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./Component/Layout/Header/Header.js";
import Footer from "./Component/Layout/Footer/Footer.js";
import ScrollToTop from "./Component/Utils/ScrollToTop.js";
import Home from "./Component/Home/Home.js";
import NotFound from "./Component/Layout/Not Found/NotFound.js";
import Experience from "./Component/Experience/Experience.js";
import Projects from "./Component/Projects/Projects.js";
import Blogs from "./Component/Blogs/Blogs.js";
import TestimonialsPage from "./Component/Testimonials Page/TestimonialsPage.js";
import ProjectDescription from "./Component/ProjectDescription/ProjectDescription.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/projects/:title/:projectId"
          element={<ProjectDescription />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
