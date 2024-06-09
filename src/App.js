import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./Component/Layout/Header/Header.js";
import Home from "./Component/Home/Home.js";
import NotFound from "./Component/Layout/Not Found/NotFound.js";
import Experience from "./Component/Experience/Experience.js";
import Projects from "./Component/Projects/Projects.js";
import Blogs from "./Component/Blogs/Blogs.js";


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
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
