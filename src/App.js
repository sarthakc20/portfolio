import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./Component/Layout/Header/Header.js";
import Home from "./Component/Layout/Home/Home.js";
import NotFound from "./Component/Layout/Not Found/NotFound.js";
import Experience from "./Component/Experience/Experience.js";


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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
